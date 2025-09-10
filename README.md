# 📅 LawBandit Syllabus Calendar  

A web application that parses **syllabus PDFs into structured events** (lectures, assignments, exams, projects, etc.) and displays them in an interactive calendar.  
Optionally, users can **sync parsed events with Google Calendar** for better scheduling.  

Deployed on **Vercel** → [Live Demo](https://lawbandit-syllabus-calendar-eta.vercel.app)  
GitHub Repository → [GitHub Link](https://github.com/neeraj-kondaveeti/lawbandit-syllabus-calendar)  

---

## ✅ Compliance with Requirements
- ✔️ Written in **TypeScript + Node.js**  
- ✔️ Deployed on **Vercel**  
- ✔️ Public GitHub repository  
- ✔️ Clean, well-documented code  
- ✔️ README with setup + explanation of approach  

---

## 🎥 Demo Preview
Here’s a quick look at the app in action:

**[▶️ Watch the Demo]**(./assets/Calendar Application Recording.mp4)

---

## 🚀 Features  
- Upload any **syllabus (PDF)** → automatically parsed using an LLM.  
- Extracted events categorized as: **Lecture, Assignment, Exam, Project, General**.  
- Interactive calendar UI with dark mode and event modals (add/edit/delete).  
- One-click **Google Calendar sync** (OAuth2).  
- Deployed via **Vercel** for instant access.  

---

## 🛠️ Tech Stack  
- **Frontend**: React + TypeScript + Vite  
- **Styling**: TailwindCSS + Framer Motion  
- **PDF Parsing**: pdfjs-dist  
- **LLM Integration**: OpenAI GPT-4.1-mini  
- **Calendar API**: Google Calendar API  

---

## 📂 Project Structure  

```bash
src/
 ├── components/        # Calendar UI components
 │   ├── Calendar.tsx
 │   ├── CalendarHeader.tsx
 │   ├── DayCell.tsx
 │   ├── GoogleButton.tsx
 │   └── SyllabusUpload.tsx
 ├── utils/             # Utility functions
 │   └── googleCalendar.ts
 ├── App.tsx            # Main app container
 └── main.tsx           # Entry point
```

## ⚙️ Setup Instructions 

### ✅ Prerequisites  
Before running the app, make sure you have installed:  
- [Node.js](https://nodejs.org/) **v20.0.0 or later** (recommended: v20.19.4 or above, since Vite requires Node 20+)  
- [npm](https://www.npmjs.com/) (comes with Node.js, version 9+ recommended)  
- A terminal (Mac: Terminal, Windows: PowerShell, Linux: bash/zsh)  

```bash
Check your versions:  


node -v
npm -v

```

### 1. Clone the repository  
```bash
git clone https://github.com/neeraj-kondaveeti/lawbandit-syllabus-calendar.git
cd lawbandit-syllabus-calendar
```

### 2. Install Dependencies 
```bash
npm install
```

### 3. Configure Environment Variables
Create a .env file in the root directory:
```bash
VITE_OPENAI_API_KEY = openai_api_key
VITE_GOOGLE_CLIENT_ID = google_client_id
VITE_GOOGLE_API_KEY = google_api_key
```

### 4. Start the Development Server 
```bash
npm run dev
```

### 5. Open the application in your browser 
```bash
http://localhost:5173/
```

### 6. Open the app in your browser
After running the dev server, you should see an output like:

  ➜  Local:   http://localhost:5173/

Open the Local URL in your browser to use the app.


### ⚠️ Troubleshooting (If Required)
A. Error: Vite requires Node.js 20+
→ Run node -v and upgrade Node.js if needed.
→ Download latest from nodejs.org.


B. Port already in use (5173)
→ Stop any other dev server running on that port, or run:
```bash
npm run dev -- --port=3000
and open http://localhost:3000/.
```

C. npm install fails with peer dependency issues
→ Try cleaning and reinstalling:
```bash
rm -rf node_modules package-lock.json
npm install
```

### 🧪 Test Files
- I have included sample syllabus PDFs in the test_files folder:
- 👉 Upload one of these into the app and confirm that events appear in the calendar.

### 🧪 Testing the App 
This repository demonstrates:
- Upload the provided syllabus PDF (/sample_pdfs/Syllabus-1950.pdf or any syllabus).
- Confirm that events appear in the calendar.
- Test aroung with Add Event button , dark mode button , and the edit or delete button which appear when you click on the event on the calendar.
- Click “Sync with Google Calendar” to test integration.
- Verify events in your Google Calendar.

### 🧩 Approach & Design Choices
- TypeScript + Node.js: Provides type safety and scalability across both frontend and backend.
- Modular Components: Calendar is built with reusable TSX components (CalendarHeader, DayCell, etc.).
- LLM-Powered Parsing: Uses GPT for flexible syllabus parsing, handling varied formats.
- Google Calendar Integration: Sync parsed events directly to users’ calendars for real-world usability.
- User-Centric Design: Focused on simplicity → upload once, color-coded events, dark mode, edit options.

### 🌍 Impact on LawBandit
This project demonstrates how unstructured documents (like syllabi) can be transformed into structured, actionable data.
- The same approach could be applied to resumes, contracts, or legal case documents.
- Aligns with LawBandit’s mission of making legal workflows smarter and more efficient.
- Shows practical synergy of LLMs + structured APIs to improve productivity.

### 📦 Build for Production
  ```bash
  npm run build
  npm run preview
  ```

### 🌐 Deployment
- The project is deployed on Vercel.






