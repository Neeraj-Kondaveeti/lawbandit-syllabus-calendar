import React, { useState } from "react";
import Calendar, { EventItem } from "./components/Calendar";
import GoogleButton from "./components/GoogleButton";

export default function App() {
  // ✅ Shared events state
  const [events, setEvents] = useState<Record<string, EventItem[]>>({});

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-4">
      {/* Calendar now receives events + setEvents */}
      <Calendar events={events} setEvents={setEvents} />

      {/* Google sync button sees the same events */}
      <GoogleButton events={events} />
    </div>
  );
}
