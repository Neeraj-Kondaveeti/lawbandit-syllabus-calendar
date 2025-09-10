import React from "react";
import { EventItem } from "./Calendar";

type Props = {
  events: EventItem[];
  date: string;
  onClose: () => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

export default function DayEventsModal({ events, date, onClose, onEdit, onDelete }: Props) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          Events on {date}
        </h2>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {events.map((event, index) => (
            <div
              key={index}
              className="p-2 border rounded-md dark:border-gray-600 flex justify-between items-center"
            >
              <span className="text-gray-800 dark:text-gray-200">{event.title}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(index)}
                  className="px-2 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(index)}
                  className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No events for this date.</p>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
