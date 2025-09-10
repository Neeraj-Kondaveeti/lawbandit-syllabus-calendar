import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { EventItem } from "./Calendar";

type Props = {
  dayKey: string;
  index: number;
  event: EventItem;
  onView: (index: number) => void; // ✅ use centralized modal
};

const categoryColors: Record<string, string> = {
  Exam: "from-red-500 to-red-700",
  Assignment: "from-blue-500 to-blue-700",
  Lecture: "from-green-500 to-green-700",
  Project: "from-purple-500 to-purple-700",
  General: "from-gray-500 to-gray-700",
};

export default function DraggableEvent({ dayKey, index, event, onView }: Props) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `${dayKey}-${index}`,
    data: { fromKey: dayKey, eventIndex: index },
  });

  const colorClass = categoryColors[event.category] || categoryColors.General;

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      className={`px-2 py-1 rounded-md bg-gradient-to-r ${colorClass} 
      text-white shadow-md cursor-grab active:cursor-grabbing hover:scale-105 transform transition`}
      onClick={() => onView(index)} // ✅ delegate to Calendar
    >
      <span className="truncate">{event.title}</span>
    </motion.div>
  );
}
