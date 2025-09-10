// src/components/GoogleButton.tsx
import React from "react";
import { addEventsToGoogleCalendar } from "../utils/googleCalendar";

type Props = {
  events: Record<string, any[]>; // events grouped by date
};

export default function GoogleButton({ events }: Props) {
  const handleSync = async () => {
    try {
      console.log("🔍 Raw events passed to GoogleButton:", events);

      // ✅ Flatten into a single array
      const allEvents = Object.values(events).flat();
      console.log("📌 Flattened events to sync:", allEvents);

      if (!Array.isArray(allEvents) || allEvents.length === 0) {
        alert("⚠️ No events available to sync.");
        return;
      }

      await addEventsToGoogleCalendar(allEvents);
    } catch (err) {
      console.error("❌ Google Calendar error:", err);
      alert("Failed to sync events. See console for details.");
    }
  };

  return (
    <button
      onClick={handleSync}
      className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition flex items-center gap-2"
    >
      <span role="img" aria-label="calendar">
        📅
      </span>
      Sync with Google Calendar
    </button>
  );
}
