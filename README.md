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

### 1. Clone the repository  
```bash
git clone https://github.com/neeraj-kondaveeti/lawbandit-syllabus-calendar.git
cd lawbandit-syllabus-calendar

