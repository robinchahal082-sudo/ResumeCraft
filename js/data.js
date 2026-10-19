/* =========================================================
   data.js — defaults, stream suggestions, sample resume
   Exposes window.RD (Resume Data helpers)
   ========================================================= */
(function (global) {
  "use strict";

  const COURSES = [
    "B.Sc.- Mathematics",
    "B.Sc.- Physics",
    "B.Sc.- Chemistry",
    "B.Sc.- Medical",
    "B.Sc.- Non-Medical",
    "B.Com (Hons.)",
    "B.Com (Hons.)+CA",
    "BBA (Hons.): Business Analytics",
    "B.A-B.Ed 4 year Integrated",
    "B.Tech. (Hons.) CSE: AI-ML, Data Science, Cyber Security",
    "BCA (Hons.): AI-ML, Data Analytics, Graphic Design & Web Development",
    "Bachelor of Physiotherapy (BPT)",
    "B.A.(Hons.)- Economics",
    "B.A.(Hons.)- Psychology",
    "B.A.(Hons.)- Social Science",
    "B.A.(Hons.)- Punjabi",
    "B.A.(Hons.)- English",
    "B.A.(Hons.)- Liberal Arts (Punjabi Medium)",
    "B.A.(Hons.)- Sri Guru Granth Sahib Studies",
    "M.Sc.(Hons.)- Mathematics",
    "M.Sc.(Hons.)- Physics",
    "M.Sc.(Hons.)- Zoology",
    "M.Sc.(Hons.)- Chemistry",
    "M.Com.(Hons)",
    "M.A.(Hons.)- Economics",
    "M.A.(Hons.)- Psychology",
    "M.A.(Hons.)- History",
    "M.A.(Hons.)- Political Science",
    "M.A.(Hons.)- Punjabi",
    "M.A.(Hons.)- English",
    "Master of Computer Application(MCA)",
    "MBA- Data Analytics",
    "PG Diploma in Guidance and Counselling"
  ];

  const STREAMS = [
    "Computer Science / IT",
    "Electronics / Electrical",
    "Mechanical / Civil Engineering",
    "Commerce / Accounting",
    "Management / Business",
    "Arts / Humanities",
    "Science (PCM/PCB)",
    "Nursing / Healthcare",
    "Education / Teaching",
    "Law",
    "Design / Creative",
    "Other"
  ];

  const CAREER_GOALS = [
    "Software Developer / Engineer",
    "Data Analyst / Data Scientist",
    "UI/UX / Web Developer",
    "Accountant / Finance",
    "Marketing / Sales",
    "HR / Operations",
    "Nurse / Healthcare Professional",
    "Teacher / Educator",
    "Lawyer / Legal Associate",
    "Designer / Creative",
    "Higher Studies / Research",
    "Government / Public Sector",
    "Entrepreneurship",
    "Other"
  ];

  // Per-stream suggestions. Used for objective + skill chips + idea chips.
  const STREAM_DATA = {
    "Computer Science / IT": {
      objective: "Motivated " + COURSES[0] + " student in Computer Science seeking an entry-level software role to apply strong programming, problem-solving and teamwork skills while contributing to real products and continuing to learn modern technologies.",
      skills: ["Java","Python","C++","JavaScript","HTML/CSS","SQL","Data Structures","Git","React","Node.js","Communication","Problem Solving"],
      projects: ["Personal portfolio website","Student result management system","Weather app using a public API","To-do / task manager app"],
      certifications: ["Python for Everybody (Coursera)","Full-Stack Web Development","Google IT Support","AWS Cloud Practitioner"]
    },
    "Electronics / Electrical": {
      objective: "Dedicated Electronics student with hands-on circuit and embedded-systems experience, seeking an opportunity to apply core engineering knowledge and practical skills in a growth-oriented technical team.",
      skills: ["Circuit Design","Embedded C","Arduino","MATLAB","PCB Design","IoT","Problem Solving","Teamwork","Documentation"],
      projects: ["IoT-based home automation","Line-following robot","Arduino weather station","Solar charging system"],
      certifications: ["Embedded Systems","IoT Fundamentals","MATLAB Onramp"]
    },
    "Mechanical / Civil Engineering": {
      objective: "Hardworking engineering student with strong fundamentals and practical workshop exposure, eager to begin a career applying technical design, analysis and problem-solving skills on real projects.",
      skills: ["AutoCAD","SolidWorks","ANSYS","Technical Drawing","MS Excel","Teamwork","Time Management","Site Analysis"],
      projects: ["CAD model of a mechanical assembly","Structural analysis of a small building","Mini fabrication workshop project","Survey and site study"],
      certifications: ["AutoCAD Certification","SolidWorks Associate","Project Management Basics"]
    },
    "Commerce / Accounting": {
      objective: "Detail-oriented Commerce graduate with solid accounting and finance fundamentals, seeking an entry-level role to contribute accurate bookkeeping, analysis and reporting while developing professional expertise.",
      skills: ["Accounting","Tally","MS Excel","GST & Taxation","Financial Analysis","Bookkeeping","Attention to Detail","Communication"],
      projects: ["Financial statement analysis of a company","GST return preparation practice","Budget planning case study","Stock market investment study"],
      certifications: ["Tally ERP","Advanced Excel","GST Practitioner","Financial Modeling"]
    },
    "Management / Business": {
      objective: "Enthusiastic management student with strong communication and organizational skills, seeking an opportunity to support business operations and grow through hands-on learning in a professional environment.",
      skills: ["Communication","Leadership","MS Excel","Presentation","Market Research","MS PowerPoint","Teamwork","Time Management"],
      projects: ["Marketing plan for a product launch","Business model case study","Event management project","Customer survey and analysis"],
      certifications: ["Digital Marketing","Business Communication","Excel for Business"]
    },
    "Arts / Humanities": {
      objective: "Curious and articulate Arts graduate with strong research, writing and communication abilities, seeking a role that values creativity, critical thinking and clear expression.",
      skills: ["Research","Writing","Communication","Critical Thinking","MS Office","Presentation","Editing","Time Management"],
      projects: ["Research paper or dissertation","Content writing portfolio","Community awareness campaign","Translation or editorial work"],
      certifications: ["Content Writing","Digital Marketing","Foreign Language Course"]
    },
    "Science (PCM/PCB)": {
      objective: "Curious Science graduate with strong analytical and laboratory skills, seeking an opportunity to apply scientific knowledge, research methods and attention to detail in a learning-driven role.",
      skills: ["Laboratory Skills","Data Analysis","Research Methods","MS Excel","Report Writing","Attention to Detail","Problem Solving"],
      projects: ["Laboratory research project","Field survey and data study","Statistical analysis report","Science exhibition project"],
      certifications: ["Lab Safety","Data Analysis","Research Methodology"]
    },
    "Nursing / Healthcare": {
      objective: "Compassionate nursing student with strong clinical fundamentals and patient-care training, seeking a role to deliver safe, empathetic care while continuing to develop clinical expertise.",
      skills: ["Patient Care","Clinical Skills","Vitals Monitoring","Infection Control","Communication","Empathy","Teamwork","Record Keeping"],
      projects: ["Clinical rotation case study","Community health awareness drive","Patient care documentation project","Health camp volunteering"],
      certifications: ["Basic Life Support (BLS)","First Aid","Infection Control Training"]
    },
    "Education / Teaching": {
      objective: "Passionate education student with strong subject knowledge and classroom practice, seeking a teaching role to inspire students through clear communication, patience and creative lesson planning.",
      skills: ["Lesson Planning","Classroom Management","Communication","Subject Expertise","Patience","Creativity","MS Office"],
      projects: ["Teaching practice / internship","Micro-teaching session","Educational aid design","Student assessment project"],
      certifications: ["CTET / TET","Educational Technology","Child Psychology"]
    },
    "Law": {
      objective: "Detail-oriented law student with strong research, drafting and analytical skills, seeking a legal internship or associate role to contribute to case research and documentation while building practical expertise.",
      skills: ["Legal Research","Drafting","Case Analysis","Communication","Argumentation","MS Office","Attention to Detail"],
      projects: ["Moot court participation","Legal research paper","Internship case summaries","Legal aid clinic volunteering"],
      certifications: ["Legal Research","Contract Drafting","IP Law Basics"]
    },
    "Design / Creative": {
      objective: "Creative design student with a strong portfolio and eye for detail, seeking a junior design role to craft clean, user-focused visuals while growing with a collaborative creative team.",
      skills: ["Figma","Adobe Photoshop","Illustrator","Typography","UI Design","Creativity","Prototyping","Communication"],
      projects: ["App UI redesign concept","Brand identity for a startup","Poster / campaign series","Portfolio website design"],
      certifications: ["UI/UX Design","Graphic Design","Adobe Certified Professional"]
    },
    "Other": {
      objective: "Motivated and hardworking student seeking an opportunity to apply my academic knowledge, willingness to learn and strong work ethic in a professional, growth-oriented role.",
      skills: ["Communication","Teamwork","MS Office","Time Management","Problem Solving","Adaptability","Willingness to Learn"],
      projects: ["Academic capstone project","Volunteer / community work","Part-time job responsibilities","Personal learning project"],
      certifications: ["Computer Basics","Communication Skills","Any relevant short course"]
    }
  };

  function uid() { return "id" + Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4); }

  function blankResume() {
    return {
      template: "ats",
      accent: "#1e3a8a",
      personal: { fullName: "", phone: "", email: "", location: "", linkedin: "", portfolio: "", course: "", stream: "", careerGoal: "", objective: "" },
      education: [],
      skills: [],
      experience: [],
      projects: [],
      certifications: [],
      achievements: [],
      activities: [],
      languages: [],
      interests: [],
      customSections: [],
      sectionOrder: ["objective","education","skills","experience","projects","certifications","achievements","activities","languages","interests"],
      sectionSettings: {},
      meta: { updatedAt: null }
    };
  }

  // Section registry: key -> { label, inOrder }
  const SECTIONS = [
    { key: "objective",      label: "Career Objective" },
    { key: "education",      label: "Education" },
    { key: "skills",         label: "Skills" },
    { key: "experience",     label: "Experience & Internships" },
    { key: "projects",       label: "Projects & Practical Work" },
    { key: "certifications", label: "Certifications" },
    { key: "achievements",   label: "Achievements" },
    { key: "activities",     label: "Activities & Responsibilities" },
    { key: "languages",      label: "Languages" },
    { key: "interests",      label: "Interests" }
  ];

  // Does a section have any content? (drives auto-hide + checklist)
  function sectionHasContent(data, key) {
    switch (key) {
      case "objective": return !!(data.personal.objective || "").trim();
      case "education": return data.education.length > 0;
      case "skills": return data.skills.length > 0;
      case "experience": return data.experience.length > 0;
      case "projects": return data.projects.length > 0;
      case "certifications": return data.certifications.length > 0;
      case "achievements": return data.achievements.length > 0;
      case "activities": return data.activities.length > 0;
      case "languages": return data.languages.length > 0;
      case "interests": return data.interests.length > 0;
      default:
        if (key.indexOf("custom:") === 0) {
          const id = key.slice(7);
          const c = data.customSections.find(function (x) { return x.id === id; });
          return !!(c && c.title && c.items && c.items.length);
        }
        return false;
    }
  }

  // Personal starter resume populated from Robindeep Kaur's supplied resume PDF.
  // Users can edit any field in the builder; this is only the initial saved-data template.
  function sampleResume() {
    const d = blankResume();
    d.template = "modern";
    d.accent = "#1e3a8a";
    d.personal = {
      fullName: "Robindeep Kaur",
      phone: "+91-7696422653",
      email: "robinchahal082@gmail.com",
      location: "Tarn-Taran, Punjab",
      linkedin: "linkedin.com/in/robindeepkaur",
      portfolio: "github.com/robindeepkaur",
      course: "B.Tech (Hons.) Data Science",
      stream: "Computer Science / IT",
      careerGoal: "Data Analyst / Data Scientist",
      objective: "B.Tech (Hons.) Data Science student with strong foundations in programming, machine learning, data science, web development, and databases. Hands-on experience building machine learning models, data analysis dashboards, and role-based web applications. Seeking entry-level opportunities in Data Science and Web Development.",
    };

    d.education = [
      { id: uid(), degree: "B.Tech (Hons.)", field: "Data Science", institution: "Akal University, Talwandi Sabo", board: "", startYear: "", endYear: "2027", scoreType: "CGPA", score: "9.0 (Current)" },
      { id: uid(), degree: "Class XII", field: "", institution: "Akal Academy Rampur Narotampur", board: "", startYear: "", endYear: "2023", scoreType: "%", score: "90.8" },
      { id: uid(), degree: "Class X", field: "", institution: "Akal Academy Rampur Narotampur", board: "", startYear: "", endYear: "2021", scoreType: "%", score: "89.5" }
    ];

    d.skills = [
      "Python", "Java", "SQL", "MySQL", "DBMS", "HTML", "CSS", "JavaScript", "Bootstrap", "PHP",
      "NumPy", "Pandas", "Matplotlib", "Scikit-learn", "Classification", "Regression", "Model Evaluation",
      "Git", "GitHub", "VS Code", "Jupyter Notebook", "Google Colab", "Canva", "Figma", "Power BI"
    ];

    d.projects = [
      {
        id: uid(),
        title: "Customer Shopping Behavior Analysis",
        techstack: "Python, Pandas, NumPy, SQL, Power BI",
        link: "github.com/robindeepkaur",
        description: "Analyzed customer behavior using Python, Pandas, NumPy, SQL, and Power BI.\nCleaned data, identified key patterns, and developed an interactive Power BI dashboard for insights."
      },
      {
        id: uid(),
        title: "Club Management System — Web Application",
        techstack: "PHP, MySQL, HTML, CSS, JavaScript, Bootstrap",
        link: "github.com/robindeepkaur",
        description: "Developed a role-based web application to manage college clubs, members, and events.\nImplemented club management, event creation/approval, student participation, and role-based access.\nAutomated event approval and participation workflows to improve coordination."
      },
      {
        id: uid(),
        title: "Spam SMS Classification using Machine Learning",
        techstack: "Python, Scikit-learn, NLTK, Pandas",
        link: "github.com/robindeepkaur",
        description: "Built an NLP-based spam SMS classification model using Python, Scikit-learn, NLTK, and Pandas.\nApplied text preprocessing and TF-IDF feature extraction and achieved approximately 95% accuracy using machine learning models."
      }
    ];

    d.experience = [
      {
        id: uid(),
        role: "Tech Lead",
        company: "WebCrafters (Coding Society)",
        type: "Leadership",
        location: "",
        startDate: "2025",
        endDate: "2026",
        current: false,
        description: "Led a team in designing and developing web-based projects; mentored students in frontend development.\nOrganized technical workshops, coding sessions, and structured club projects."
      }
    ];

    d.certifications = [
      { id: uid(), name: "Certification in Python for Data Science and AI Development", issuer: "", date: "", credentialLink: "" },
      { id: uid(), name: "Data Science Internship Program and Data Science Professional", issuer: "A2IT InterEdge", date: "", credentialLink: "" },
      { id: uid(), name: "Full Stack Development Internship Program", issuer: "RCPL, IIT Kanpur", date: "", credentialLink: "" },
      { id: uid(), name: "Python Training Test — 85%", issuer: "IIT Bombay", date: "", credentialLink: "" }
    ];

    d.achievements = [
      { id: uid(), title: "Research Paper Presentation — CISTM-2025", description: "Presented a research paper at the CISTM-2025 International Conference.", date: "2025" },
      { id: uid(), title: "Research Poster Presentation — CI2A-2026", description: "Presented a research poster at the CI2A-2026 International Conference.", date: "2026" },
      { id: uid(), title: "Smart India Hackathon (SIH) 2026", description: "Selected for the Internal Evaluation Round.", date: "2026" }
    ];

    d.activities = [
      { id: uid(), title: "Class Representative", description: "Coordinated communication between students and faculty." },
      { id: uid(), title: "Poster Design", description: "Designed 20+ posters using Canva." }
    ];

    d.languages = [
      { id: uid(), name: "English", level: "" },
      { id: uid(), name: "Hindi", level: "" },
      { id: uid(), name: "Punjabi", level: "" }
    ];

    d.customSections = [
      {
        id: uid(),
        title: "Relevant Coursework",
        items: [
          "Data Structures and Algorithms",
          "Object-Oriented Programming",
          "Java Programming",
          "Database Management Systems",
          "Software Engineering",
          "Data Handling and Visualization",
          "Statistics",
          "Machine Learning",
          "Artificial Intelligence",
          "Deep Learning",
          "Natural Language Processing"
        ]
      },
      {
        id: uid(),
        title: "Additional Information",
        items: [
          "Availability: Immediate",
          "Location Preference: Pan India"
        ]
      }
    ];

    d.sectionOrder = [
      "objective", "education", "skills", "experience", "projects",
      "certifications", "achievements", "activities", "languages",
      "interests", "custom:" + d.customSections[0].id,
      "custom:" + d.customSections[1].id
    ];
    return d;
  }

  global.RD = {
    uid: uid,
    COURSES: COURSES,
    STREAMS: STREAMS,
    CAREER_GOALS: CAREER_GOALS,
    STREAM_DATA: STREAM_DATA,
    SECTIONS: SECTIONS,
    blankResume: blankResume,
    sampleResume: sampleResume,
    sectionHasContent: sectionHasContent
  };
})(window);
