import React from "react";
import { EventItem } from "./Calendar";

type Props = {
  event: EventItem;
  date: string;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const categoryColors: Record<string, string> = {
  Exam: "bg-red-500",
  Assignment: "bg-blue-500",
  Lecture: "bg-green-500",
  Project: "bg-purple-500",
  General: "bg-gray-500",
};

export default function EventDetailsModal({ event, date, onClose, onEdit, onDelete }: Props) {
  let formattedDate = date;
  try {
    const parsed = new Date(date);
    if (!isNaN(parsed.getTime())) {
      formattedDate = parsed.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  } catch {}

  const badgeColor = categoryColors[event.category] || categoryColors.General;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 
                      transform transition-all duration-300 scale-95 opacity-0 
                      animate-[fadeInScale_0.3s_ease-out_forwards]">
        
        {/* Event Title */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          {event.title}
        </h2>

        {/* Category Badge */}
        <span className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded ${badgeColor} mb-3`}>
          {event.category}
        </span>

        {/* Details if available */}
        {event.details && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-line">
            <span className="font-medium">Details:</span> {event.details}
          </p>
        )}

        {/* Date */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          <span className="font-medium">Date:</span> {formattedDate}
        </p>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            onClick={onEdit}
          >
            Edit
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
