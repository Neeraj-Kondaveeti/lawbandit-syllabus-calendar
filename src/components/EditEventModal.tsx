import React, { useState } from "react";
import { EventItem } from "./Calendar";

type EditEventModalProps = {
  event: EventItem;
  onClose: () => void;
  onSave: (event: EventItem) => void;
};

export default function EditEventModal({ event, onClose, onSave }: EditEventModalProps) {
  const [title, setTitle] = useState(event.title);
  const [category, setCategory] = useState(event.category);
  const [details, setDetails] = useState(event.details || ""); // ✅ safe default

  const handleSave = () => {
    if (title) {
      onSave({ ...event, title, category, details }); // ✅ valid now
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          Edit Event
        </h2>

        {/* Title */}
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
        />

        {/* Category */}
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mb-3 p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
        >
          <option>Exam</option>
          <option>Assignment</option>
          <option>Lecture</option>
          <option>Project</option>
          <option>General</option>
        </select>

        {/* Details */}
        <label className="block text-sm font-medium mb-1">Details</label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full mb-3 p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
          rows={3}
        />

        {/* Actions */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
