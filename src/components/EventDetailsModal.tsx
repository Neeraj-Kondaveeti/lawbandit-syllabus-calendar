import React from "react";
import { EventItem } from "./Calendar";

type Props = {
  event: EventItem;
  date: string; 
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
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
  } catch {

  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 animate-fadeIn">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          {event.title}
        </h2>

        {/* Only show category if available */}
        {event.category && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
            <span className="font-medium">Category:</span> {event.category}
          </p>
        )}

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          <span className="font-medium">Date:</span> {formattedDate}
        </p>

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
