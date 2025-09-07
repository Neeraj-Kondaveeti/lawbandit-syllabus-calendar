import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDroppable } from "@dnd-kit/core"; 
import { EventItem } from "./Calendar";
import EventDetailsModal from "./EventDetailsModal";

type Props = {
  day: number | null;
  dayKey: string;
  events: EventItem[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

export default function DayCell({ day, dayKey, events, onEdit, onDelete }: Props) {
  const today = new Date();
  const isToday =
    day &&
    day === today.getDate() &&
    today.getMonth() === new Date().getMonth() &&
    today.getFullYear() === new Date().getFullYear();

  const { setNodeRef } = useDroppable({ id: dayKey });
  const [selectedEvent, setSelectedEvent] = useState<{
    event: EventItem;
    index: number;
  } | null>(null);

  return (
    <motion.div
      ref={setNodeRef}
      whileHover={{ scale: 1.02, boxShadow: "0px 4px 12px rgba(0,0,0,0.15)" }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className="h-32 p-2 border border-gray-200 dark:border-gray-700 
      bg-white dark:bg-gray-900 rounded-lg relative"
    >
      {/* Day number */}
      {day && (
        <div
          className={`w-7 h-7 flex items-center justify-center text-sm font-semibold rounded-full 
          ${isToday ? "bg-blue-600 text-white" : "text-gray-800 dark:text-gray-200"}`}
        >
          {day}
        </div>
      )}

      {/* Events */}
      <div className="mt-1 space-y-1">
        <AnimatePresence>
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="px-2 py-1 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 
              text-white shadow-md cursor-pointer truncate overflow-hidden max-h-6"
              onClick={() => setSelectedEvent({ event, index })}
            >
              <span className="block truncate max-w-full">{event.title}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Event details modal */}
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent.event}
          date={new Date(selectedEvent.event.dateKey).toDateString()}
          onClose={() => setSelectedEvent(null)}
          onEdit={() => {
            onEdit(selectedEvent.index);
            setSelectedEvent(null);
          }}
          onDelete={() => {
            onDelete(selectedEvent.index);
            setSelectedEvent(null);
          }}
        />
      )}
    </motion.div>
  );
}
