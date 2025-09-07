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

  const handleSave = () => {
    if (title) {
      onSave({ ...event, title, category }); 
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 animate-fadeIn">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          Edit Event
        </h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />

          {/*Category dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            <option value="Exam">Exam</option>
            <option value="Assignment">Assignment</option>
            <option value="Lecture">Lecture</option>
            <option value="Project">Project</option>
            <option value="General">General</option>
          </select>

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
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
