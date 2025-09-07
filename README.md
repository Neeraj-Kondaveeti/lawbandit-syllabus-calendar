# Lawbandit Syllabus Calendar  

This project is a **work-in-progress application** that takes a syllabus PDF and parses assignments, exams, and deadlines into a calendar view. The main goal is to make it easier for students to upload their syllabus and automatically see important tasks in a structured calendar.  

At this stage:  
- 📂 You can upload a syllabus (PDF).  
- 🧾 Text is extracted using **pdfjs-dist**.  
- 🤖 A **mock LLM function** is called (currently returns sample events).  
- 📅 Events are displayed in a calendar UI with add/edit/delete support.  

⚠️ **Note**: This is not the final version. The LLM integration is mocked right now — once an API key is provided, the mock will be replaced with a real API call so the syllabus text is parsed dynamically into events.  

---

## 🛠️ How to Run the Application  

### ✅ Prerequisites  
Before running the app, make sure you have installed:  
- [Node.js](https://nodejs.org/) **v20.0.0 or later** (recommended: v20.19.4 or above, since Vite requires Node 20+)  
- [npm](https://www.npmjs.com/) (comes with Node.js, version 9+ recommended)  
- A terminal (Mac: Terminal, Windows: PowerShell, Linux: bash/zsh)  

Check your versions:  
```bash
node -v
npm -v



### 1. Clone the repository  
git clone https://github.com/neeraj-kondaveeti/lawbandit-syllabus-calendar.git
cd lawbandit-syllabus-calendar

### 2. Install Dependencies 
npm install

### 3. Start the Development Server 
npm run dev

### 4. Open the application in your browser 
http://localhost:5173/

### 5. Open the app in your browser
After running the dev server, you should see an output like:
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
Open the Local URL in your browser to use the app.


⚠️ Troubleshooting
Error: Vite requires Node.js 20+
→ Run node -v and upgrade Node.js if needed.
→ Download latest from nodejs.org.
Port already in use (5173)
→ Stop any other dev server running on that port, or run:
npm run dev -- --port=3000
and open http://localhost:3000/.
npm install fails with peer dependency issues
→ Try cleaning and reinstalling:
rm -rf node_modules package-lock.json
npm install


📂 Project Structure
src/
 ├── components/
 │    ├── Calendar.tsx         # Main calendar UI + event state
 │    ├── DayCell.tsx          # Individual calendar cells
 │    ├── SyllabusUpload.tsx   # PDF upload + text extraction + mock LLM call
 │    ├── AddEventModal.tsx    # Modal for adding events
 │    ├── EditEventModal.tsx   # Modal for editing events
 │    └── EventDetailsModal.tsx# Event detail modal


🔮 Next Steps
Replace fetchEventsFromLLM (mock) with a real LLM API call (once API key is available)
Expand parsing logic to handle more syllabus formats (dates, ranges, etc.)
Optional: integrate with Google Calendar for syncing


✅ Proof of Concept Status
This repository demonstrates:
A working pipeline from PDF upload → text extraction → mock event injection into calendar
An event management UI that allows add/edit/delete actions
A ready spot for plugging in a real LLM call to complete the end-to-end flow

---

✅ This is clean, professional, and has **everything in one place** — your reviewer will instantly understand what’s done, what’s pending, and how to run the project.  

Do you also want me to draft the **exact message you’ll send with the GitHub repo link** so it matches the tone of this README?




