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



