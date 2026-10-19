# ResumeCraft — Student Resume Builder

A modern, responsive resume builder designed for students and fresh graduates. Create professional resumes using multiple templates, customize sections, preview changes instantly, and export your resume as a PDF.

## ✨ Features

- **9 Professional Resume Templates** — ATS Classic, Modern Professional, Student/Fresher, Corporate Serif, Executive, Elegant Minimal, Bold Accent, Compact ATS, and Two Column Sidebar.
- **Live Resume Preview** — View changes as you edit your information.
- **Custom Sections** — Add your own sections, such as Publications, Workshops, Relevant Coursework, Research, and Volunteer Experience.
- **Section Management** — Rename headings, hide or restore built-in sections, remove custom sections, and reorder sections.
- **Multiple Entries** — Add multiple education, experience, project, certification, and achievement entries.
- **Light and Dark Themes** — Switch between themes with improved interface contrast.
- **Custom Styling** — Personalize the resume accent color.
- **PDF Export** — Generate a printable resume from the preview.
- **JSON Import and Export** — Back up your resume data or import a saved resume.
- **Automatic Saving** — Resume changes are saved locally in your browser.
- **Responsive Interface** — Designed for desktop and smaller screens.

## 🛠️ Tech Stack

- **HTML5** — Application structure
- **CSS3** — Styling, responsive layouts, and themes
- **JavaScript** — Dynamic forms, live preview, and resume management
- **jsPDF** — PDF generation
- **html2canvas** — Resume preview rendering for export
- **LocalStorage** — Browser-based data persistence

## 📂 Project Structure

```text
ResumeCraft/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── data.js
│   ├── render.js
│   └── pdf.js
├── vendor/
│   ├── html2canvas.min.js
│   └── jspdf.umd.min.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser, such as Google Chrome or Microsoft Edge
- Visual Studio Code (recommended)
- Live Server extension for VS Code (recommended)

No database or backend server is required for the current static version.

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
```

**2. Open the project folder**

```bash
cd YOUR-REPOSITORY
```

**3. Open the project in VS Code**

```bash
code .
```

**4. Run the application**

Open `index.html` using the Live Server extension, or open the file directly in your browser.

## 📖 How to Use

1. Open ResumeCraft in your browser.
2. Enter your personal, educational, and professional details.
3. Add projects, skills, certifications, achievements, and other sections.
4. Customize section headings and their order.
5. Select a resume template.
6. Switch between light and dark interface themes.
7. Review your resume in the live preview.
8. Download the resume as a PDF.
9. Export your data as JSON to keep a backup.

## 🔒 Privacy and Data Storage

ResumeCraft stores resume data locally in the browser. The current version does not automatically upload personal information to a cloud server.

- Data is browser-specific and does not automatically sync across devices.
- Clearing browser data may remove saved resume information.
- Use the JSON export feature to create a backup.

**Privacy tip:** Avoid publishing a prefilled resume containing your personal phone number, email address, or other private information in a public GitHub repository.

## 🎯 Project Objective

The goal of ResumeCraft is to simplify resume creation for students and fresh graduates by providing customizable templates, flexible section management, real-time previews, and convenient PDF export without requiring a complicated setup.

## 🔮 Future Enhancements

- User authentication and profile management
- Database integration for saving multiple resumes
- Cloud synchronization
- AI-powered resume writing suggestions
- Job-description-based keyword matching
- Additional templates and customization options

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Submit a pull request.

## 📄 License

This project is available for educational and portfolio purposes. Add a suitable open-source license, such as the MIT License, if you intend to permit reuse and redistribution.

---

**Built with HTML, CSS, and JavaScript.**