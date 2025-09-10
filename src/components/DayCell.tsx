import React from "react";
import { EventItem } from "./Calendar";

type Props = {
  day: number | null;
  dayKey: string;
  events: EventItem[];
  onView: (index: number) => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

const categoryColors: Record<string, string> = {
  Exam: "from-red-500 to-red-700",
  Assignment: "from-blue-500 to-blue-700",
  Lecture: "from-green-500 to-green-700",
  Project: "from-purple-500 to-purple-700",
  General: "from-gray-500 to-gray-700",
};

// ✅ helper: icons for categories
function getCategoryIcon(category: string) {
  switch (category) {
    case "Exam": return "🎓";
    case "Assignment": return "📄";
    case "Lecture": return "📘";
    case "Project": return "🎯";
    default: return "📌";
  }
}

export default function DayCell({ day, dayKey, events, onView }: Props) {
  return (
    <div
      className={`min-h-[100px] bg-white dark:bg-gray-900 p-2 border border-gray-200 dark:border-gray-700 relative 
                  hover:bg-gray-50 dark:hover:bg-gray-800 transition`}
    >
      {/* Day Number */}
      {day && (
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {day}
        </div>
      )}

      {/* Events */}
      <div className="space-y-1">
        {events.map((event, index) => {
          const colorClass = categoryColors[event.category] || categoryColors.General;
          return (
            <div
              key={index}
              className={`flex items-center gap-1 px-2 py-1 rounded-md bg-gradient-to-r ${colorClass} 
                          text-white text-xs font-medium shadow cursor-pointer truncate 
                          hover:scale-[1.02] transform transition`}
              onClick={() => onView(index)}
            >
              <span>{getCategoryIcon(event.category)}</span>
              <span className="truncate">{event.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
