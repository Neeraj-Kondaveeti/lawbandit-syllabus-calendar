import React, { useState } from "react";

type Props = {
  onClose: () => void;
  onSave: (dateKey: string, title: string, category: string, details: string) => void;
};

export default function AddEventModal({ onClose, onSave }: Props) {
  const [dateKey, setDateKey] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [details, setDetails] = useState(""); // ✅ new state for details

  const handleSave = () => {
    if (!dateKey || !title) return;

    const dateObj = new Date(dateKey);
    if (isNaN(dateObj.getTime())) return;

    const normalizedKey = `${dateObj.getFullYear()}-${String(
      dateObj.getMonth() + 1
    ).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;

    onSave(normalizedKey, title, category, details);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 animate-fadeIn">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          Add Event
        </h2>

        <div className="flex flex-col gap-3">
          {/* Date */}
          <input
            type="date"
            value={dateKey}
            onChange={(e) => setDateKey(e.target.value)}
            className="border p-2 rounded dark:bg-gray-700 dark:text-white"
            required
          />

          {/* Title */}
          <input
            type="text"
            placeholder="Event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded dark:bg-gray-700 dark:text-white"
            required
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded dark:bg-gray-700 dark:text-white"
          >
            <option value="Exam">Exam</option>
            <option value="Assignment">Assignment</option>
            <option value="Lecture">Lecture</option>
            <option value="Project">Project</option>
            <option value="General">General</option>
          </select>

          {/* Details (NEW) */}
          <textarea
            placeholder="Details (e.g., chapters, readings, notes)"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="border p-2 rounded dark:bg-gray-700 dark:text-white resize-none"
            rows={3}
          />

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
