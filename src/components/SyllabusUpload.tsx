import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { EventItem } from "./Calendar";

// Configure pdf.js worker
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

type Props = {
  onEventsParsed: (events: Record<string, EventItem[]>) => void;
};

// Semester start date (for week-based syllabi)
const SEMESTER_START = new Date("2024-08-26");

// ✅ Toggle this to `true` if you want to bypass strict date validation
const BYPASS_VALIDATION = false;

// Validate YYYY-MM-DD
function isValidDateKey(dateKey: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return false;
  const [year, month, day] = dateKey.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day;
}

// Normalize YYYY-M-D → YYYY-MM-DD
function normalizeDateKey(dateKey: string): string {
  const parts = dateKey.split("-").map((p) => p.padStart(2, "0"));
  return `${parts[0]}-${parts[1]}-${parts[2]}`;
}

// LLM call (unchanged, but logs added)
async function fetchEventsFromLLM(text: string) {
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `
You are a syllabus parser. Extract ALL events (assignments, exams, lectures, projects).
Return ONLY strict JSON (no markdown, no prose).

Format:
[
  { "title": "Midterm Exam", "dateKey": "2024-10-15", "category": "Exam", "details": "Covers Chapters 1–6" },
  { "title": "Lecture", "dateKey": "2024-09-02", "category": "Lecture", "details": "Read pages 1–25, Hawkins v. McGee" }
]

Rules:
- "dateKey" must always be in YYYY-MM-DD format.
- If year is missing, assume 2024 for Fall or 2025 for Spring.
- Allowed categories: ["Exam", "Assignment", "Lecture", "Project", "General"].
- "details" can include readings, chapters, page numbers, or extra notes.
- Skip items with no date.

Special handling:
- If "Week N", map → semesterStart + (N-1)*7 days.
  (semesterStart = ${SEMESTER_START.toISOString().split("T")[0]})
- If a weekday is mentioned, place it inside that week.
- If "Final Exam: December 12", assume year 2024 → "2024-12-12".
- If "Midterm Week", assume "2024-10-15".
- If "Final Week", assume "2024-12-01".

Now extract from this syllabus text:
${text}
        `,
        max_output_tokens: 900,
      }),
    });

    const data = await response.json();

    let rawText = "";
    if (data.output_text) rawText = data.output_text;
    else if (data.output && Array.isArray(data.output) && data.output[0]?.content?.[0]?.text) {
      rawText = data.output[0].content[0].text;
    } else return [];

    let events: any[] = [];
    try {
      events = JSON.parse(rawText.trim());
    } catch {
      const clean = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
      events = JSON.parse(clean);
    }

    console.log("📄 Raw events from LLM:", events);
    return events;
  } catch (err) {
    console.error("❌ LLM fetch failed:", err);
    return [];
  }
}

export default function SyllabusUpload({ onEventsParsed }: Props) {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const typedArray = new Uint8Array(reader.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

        let extractedText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          extractedText += textContent.items.map((s: any) => s.str).join(" ") + "\n";
        }

        console.log("📚 Extracted text length:", extractedText.length);

        const chunkSize = 3500;
        const chunks: string[] = [];
        for (let i = 0; i < extractedText.length; i += chunkSize) {
          chunks.push(extractedText.slice(i, i + chunkSize));
        }

        let allEvents: any[] = [];
        for (let i = 0; i < chunks.length; i++) {
          const events = await fetchEventsFromLLM(chunks[i]);
          allEvents = [...allEvents, ...events];
        }

        console.log("📌 All combined events before filtering:", allEvents);

        const eventsByDate: Record<string, EventItem[]> = {};
        allEvents.forEach((ev: any) => {
          if (!ev.dateKey) {
            console.warn("⚠️ Skipping event (no dateKey):", ev);
            return;
          }

          const normalized = normalizeDateKey(ev.dateKey);

          if (!BYPASS_VALIDATION && !isValidDateKey(normalized)) {
            console.warn("⚠️ Skipping invalid date:", ev.dateKey, ev);
            return;
          }

          if (!eventsByDate[normalized]) eventsByDate[normalized] = [];
          eventsByDate[normalized].push({
            title: ev.title || "Untitled",
            dateKey: normalized,
            category: ev.category || "General",
            details: ev.details || "",
          });
        });

        console.log("✅ Final eventsByDate ready to sync:", eventsByDate);
        onEventsParsed(eventsByDate);

        if (Object.keys(eventsByDate).length === 0) {
          alert("No events found in this syllabus.");
        }
      } finally {
        setLoading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="my-4 transition duration-300 ease-in-out hover:scale-[1.01]">
      <label className="block mb-2 font-medium">Upload Syllabus (PDF)</label>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        disabled={loading}
        className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer
                   bg-gray-50 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600
                   transition duration-200 ease-in-out hover:border-blue-500 hover:shadow-md focus:ring-2 focus:ring-blue-400
                   ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      />

      {loading && (
        <div className="mt-3 flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm">
          <svg
            className="animate-spin h-5 w-5 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span>Parsing syllabus… please wait</span>
        </div>
      )}
    </div>
  );
}
