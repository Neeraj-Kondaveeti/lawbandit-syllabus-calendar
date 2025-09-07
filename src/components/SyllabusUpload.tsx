import React from "react";
import * as pdfjsLib from "pdfjs-dist";
import { EventItem } from "./Calendar";

import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

type Props = {
  onEventsParsed: (events: Record<string, EventItem[]>) => void;
};

//Mock function simulating an API call to an LLM
async function fetchEventsFromLLM(text: string): Promise<EventItem[]> {
  console.log("📤 Sending syllabus text to mock LLM API...");
  console.log("🔎 Text sample:", text.slice(0, 300), "...");

  // Mock response : I will replace this later with LLM API CALL - NEERAJ KONDAVEETI
  return [
    { title: "Read Syllabus & Assignment Schedule", dateKey: "2025-01-24", category: "Assignment" },
    { title: "Midterm Exam", dateKey: "2025-02-14", category: "Exam" },
    { title: "Final Project Presentation", dateKey: "2025-04-20", category: "Project" },
  ];
}

export default function SyllabusUpload({ onEventsParsed }: Props) {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function () {
      const typedArray = new Uint8Array(reader.result as ArrayBuffer);
      const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

      let extractedText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        extractedText += textContent.items.map((s: any) => s.str).join(" ") + "\n";
      }

      console.log("📄 Extracted text:", extractedText.slice(0, 500), "...");

      //Calling the mock LLM API instead of regex parsing
      const mockEvents = await fetchEventsFromLLM(extractedText);

      const events: Record<string, EventItem[]> = {};
      mockEvents.forEach((ev) => {
        if (!events[ev.dateKey]) events[ev.dateKey] = [];
        events[ev.dateKey].push(ev);
      });

      console.log("✅ Parsed events (from mock LLM):", events);
      onEventsParsed(events);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="my-4">
      <label className="block mb-2 font-medium">Upload Syllabus (PDF)</label>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600"
      />
    </div>
  );
}
