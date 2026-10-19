/* =========================================================
   pdf.js — client-side PDF export
   Guarantees NO content is ever cut. If the resume does not
   fit one A4 page, it flows onto additional pages. Uses
   html2canvas + jsPDF. Exposes window.RP
   ========================================================= */
(function (global) {
  "use strict";

  const A4_W_PX = 794;   // 210mm @ 96dpi
  const A4_H_PX = 1123;  // 297mm @ 96dpi

  function clone(d) { return JSON.parse(JSON.stringify(d)); }

  // ---- (kept as a utility; NOT used to cut content during export) ----
  function cutLine(line, maxLen) {
    const s = (line || "").trim();
    if (s.length <= maxLen) return { text: s, cut: false };
    let slice = s.slice(0, maxLen);
    const sp = slice.lastIndexOf(" ");
    if (sp > maxLen * 0.5) slice = slice.slice(0, sp);
    return { text: slice.replace(/[,;:.\-]$/, "") + "…", cut: true };
  }

  const LEVELS = [
    { lineLen: 999, bullets: 99, items: 99, objLines: 99, objLineLen: 9999 },
    { lineLen: 115, bullets: 3,  items: 6,  objLines: 5,  objLineLen: 150 },
    { lineLen: 92,  bullets: 2,  items: 4,  objLines: 4,  objLineLen: 130 },
    { lineLen: 80,  bullets: 2,  items: 3,  objLines: 4,  objLineLen: 120 }
  ];

  function shortenBlock(text, cfg, counter) {
    if (!text) return "";
    let lines = String(text).split(/\n+/).map(function (s) { return s.trim(); }).filter(Boolean);
    if (lines.length > cfg.bullets) { counter.omitted += lines.length - cfg.bullets; lines = lines.slice(0, cfg.bullets); }
    lines = lines.map(function (l) { const r = cutLine(l, cfg.lineLen); if (r.cut) counter.truncated += 1; return r.text; });
    return lines.join("\n");
  }

  function optimizeResume(srcData, level) {
    const lvl = (level === undefined || level === null) ? 1 : level;
    const cfg = LEVELS[Math.min(lvl, 3)];
    const d = clone(srcData);
    const report = { level: lvl, notes: [] };
    if (d.personal && d.personal.objective) {
      const objLines = d.personal.objective.split(/\n+/).map(function (s) { return s.trim(); }).filter(Boolean);
      if (objLines.length) {
        const kept = objLines.slice(0, cfg.objLines);
        const trimmed = kept.map(function (l) { return cutLine(l, cfg.objLineLen).text; });
        const newObj = trimmed.join("\n");
        if (newObj !== d.personal.objective.trim()) {
          d.personal.objective = newObj;
          const notes = [];
          if (objLines.length > cfg.objLines) notes.push("kept your objective to " + cfg.objLines + " lines");
          if (trimmed.some(function (l, i) { return l !== kept[i]; })) notes.push("shortened long objective lines");
          report.notes.push("Career objective adjusted (" + notes.join(" and ") + ").");
        }
      }
    }
    function tune(arr, name) {
      if (!arr || !arr.length) return;
      const counter = { omitted: 0, truncated: 0 };
      const kept = arr.slice(0, cfg.items);
      const omitted = arr.length - kept.length;
      kept.forEach(function (x) { if (x.description) x.description = shortenBlock(x.description, cfg, counter); });
      if (omitted > 0) report.notes.push("Kept the " + kept.length + " most relevant " + name + " (hid " + omitted + ").");
      if (counter.truncated > 0) report.notes.push("Shortened " + counter.truncated + " long " + name + " description line(s).");
      return kept;
    }
    if (d.experience && d.experience.length) d.experience = tune(d.experience, "experience");
    if (d.projects && d.projects.length) d.projects = tune(d.projects, "projects");
    if (d.activities && d.activities.length) d.activities = tune(d.activities, "activities");
    if (d.achievements && d.achievements.length) d.achievements = tune(d.achievements, "achievements");
    return { data: d, report: report };
  }

  // ---------- render into the offscreen export node ----------
  function renderToNode(data, compact) {
    const node = document.getElementById("export-node");
    node.innerHTML = RR.buildResumeHTML(data);
    const page = node.querySelector(".resume-page");
    if (compact) page.classList.add("compact");
    page.style.minHeight = "0px";
    page.style.boxShadow = "none";
    const heightPx = page.scrollHeight;
    return { node: node, page: page, heightPx: heightPx, compact: !!compact };
  }

  function filenameFor(data) {
    const name = (data.personal.fullName || "Resume").trim().replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "") || "Resume";
    return name + "_Resume.pdf";
  }

  // ---------- layout planning: single page (full or compact) or multi-page ----------
  // NEVER cuts content. Chooses the nicest option that needs no cutting:
  //   1 page full-size  >  1 page compact  >  multi-page (full-size, all content)
  function planLayout(data) {
    if (renderToNode(data, false).heightPx <= A4_H_PX) return { mode: "single", compact: false };
    if (renderToNode(data, true).heightPx <= A4_H_PX) return { mode: "single", compact: true };
    return { mode: "multi", compact: false };
  }

  // ---------- block boundaries (header + each section) for clean page breaks ----------
  function getBlockBounds(page) {
    const pageRect = page.getBoundingClientRect();
    const els = [];
    const header = page.querySelector(".rp-header");
    if (header) els.push(header);
    page.querySelectorAll(".rp-section").forEach(function (s) { els.push(s); });
    return els.map(function (el) {
      const r = el.getBoundingClientRect();
      return { top: r.top - pageRect.top, bottom: r.bottom - pageRect.top };
    }).filter(function (b) { return b.bottom > b.top; });
  }

  // Greedy pagination that breaks BETWEEN blocks (never mid-line).
  // Returns [{start, end}] in content px. end = bottom of last content block.
  function paginate(blocks, totalH, pageH) {
    const pages = [];
    let pageStart = 0, lastBottom = 0;
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      if (b.bottom - pageStart <= pageH) { lastBottom = b.bottom; continue; }
      if (b.top - pageStart > pageH * 0.12 && b.top > pageStart) {
        pages.push({ start: pageStart, end: lastBottom });
        pageStart = b.top; lastBottom = b.bottom;
      } else {
        // A single block taller than a page - hard break (only way to keep all data).
        const hard = pageStart + pageH;
        pages.push({ start: pageStart, end: hard });
        pageStart = hard; lastBottom = Math.max(b.bottom, hard);
      }
    }
    pages.push({ start: pageStart, end: Math.max(lastBottom, totalH) });
    return pages;
  }

  // ---------- render the whole resume to one tall canvas, then slice into pages ----------
  const MARGIN_PX = 40;        // ~10.6mm top margin on continuation pages
  const BOTTOM_RESERVE = 50;   // keep a little breathing room at the page bottom

  async function renderMultiPage(data) {
    const r = renderToNode(data, false); // full-size layout for best readability
    const page = r.page;
    const totalH = r.heightPx;
    const blocks = getBlockBounds(page);
    const usableH = A4_H_PX - BOTTOM_RESERVE;
    const pages = paginate(blocks, totalH, usableH);

    const scale = 2;
    const canvas = await html2canvas(page, {
      scale: scale, backgroundColor: "#ffffff", useCORS: true, logging: false, windowWidth: A4_W_PX
    });

    const { jsPDF } = global.jspdf;
    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

    for (let i = 0; i < pages.length; i++) {
      let startC = pages[i].start;
      const endC = pages[i].end;
      // Continuation pages: add a top margin, taken ONLY from the whitespace gap
      // above the first block so no content is ever duplicated.
      if (i > 0) {
        const prevEnd = pages[i - 1].end;
        const gap = Math.max(0, startC - prevEnd);
        const topPad = Math.min(MARGIN_PX, gap);
        startC = Math.max(0, startC - topPad);
      }
      const sliceH = Math.max(1, endC - startC);
      const crop = document.createElement("canvas");
      crop.width = canvas.width;
      crop.height = Math.max(1, Math.round(sliceH * scale));
      const ctx = crop.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, crop.width, crop.height);
      ctx.drawImage(canvas, 0, Math.round(startC * scale), canvas.width, crop.height, 0, 0, canvas.width, crop.height);
      const img = crop.toDataURL("image/jpeg", 0.96);
      if (i > 0) pdf.addPage();
      const imgHmm = crop.height / canvas.width * 210;
      pdf.addImage(img, "JPEG", 0, 0, 210, imgHmm);
    }

    pdf.save(filenameFor(data));
    return pages.length;
  }

  // ---------- main export ----------
  async function exportPDF(data, hooks) {
    hooks = hooks || {};
    const notify = hooks.notify || function () {};
    const setLoader = hooks.setLoader || function () {};

    if (typeof html2canvas === "undefined" || !(global.jspdf && global.jspdf.jsPDF)) {
      notify("PDF library failed to load. Check your connection and retry.", "error");
      return { ok: false, reason: "lib" };
    }

    let plan;
    try {
      setLoader(true, "Preparing your resume…");
      plan = planLayout(data);
    } catch (e) {
      setLoader(false);
      notify("Could not measure the resume: " + e.message, "error");
      return { ok: false, reason: "measure" };
    }

    try {
      if (plan.mode === "single") {
        setLoader(true, "Generating your one-page PDF…");
        const r = renderToNode(data, plan.compact);
        const canvas = await html2canvas(r.page, { scale: 2, backgroundColor: "#ffffff", useCORS: true, logging: false, windowWidth: A4_W_PX });
        const { jsPDF } = global.jspdf;
        const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
        const imgData = canvas.toDataURL("image/jpeg", 0.96);
        const imgHmm = (canvas.height / canvas.width) * 210;
        pdf.addImage(imgData, "JPEG", 0, 0, 210, Math.min(imgHmm, 297));
        if (pdf.getNumberOfPages() !== 1) {
          const pdf2 = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
          pdf2.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");
          pdf2.save(filenameFor(data));
        } else {
          pdf.save(filenameFor(data));
        }
        setLoader(false);
        notify(plan.compact
          ? "PDF downloaded — 1 page (compact layout, all content included)."
          : "PDF downloaded — 1 page. All content included.", "success");
        return { ok: true, pages: 1, compact: plan.compact };
      } else {
        setLoader(true, "Generating your PDF — keeping all content across pages…");
        const pageCount = await renderMultiPage(data);
        setLoader(false);
        notify("PDF downloaded — " + pageCount + " page" + (pageCount === 1 ? "" : "s") + ". All your content is included; nothing was cut.", "success");
        return { ok: true, pages: pageCount };
      }
    } catch (e) {
      setLoader(false);
      notify("PDF generation failed: " + e.message, "error");
      return { ok: false, reason: "render" };
    }
  }

  // ---------- analyze (for the Optimize button) ----------
  function analyzePages(data) {
    let plan;
    try { plan = planLayout(data); } catch (e) { return { ok: false }; }
    if (plan.mode === "single") return { ok: true, pages: 1, compact: plan.compact };
    const r = renderToNode(data, false);
    const pages = paginate(getBlockBounds(r.page), r.heightPx, A4_H_PX - BOTTOM_RESERVE);
    return { ok: true, pages: pages.length, compact: false };
  }

  global.RP = {
    A4_W_PX: A4_W_PX,
    A4_H_PX: A4_H_PX,
    optimizeResume: optimizeResume,
    planLayout: planLayout,
    paginate: paginate,
    getBlockBounds: getBlockBounds,
    renderToNode: renderToNode,
    renderMultiPage: renderMultiPage,
    exportPDF: exportPDF,
    analyzePages: analyzePages,
    filenameFor: filenameFor
  };
})(window);
