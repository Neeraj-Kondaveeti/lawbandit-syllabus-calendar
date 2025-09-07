import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import WeekdayHeader from "./WeekdayHeader";
import DayCell from "./DayCell";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import SyllabusUpload from "./SyllabusUpload";


export type EventItem = {
  title: string;
  dateKey: string; 
  category: string;
};

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState<Record<string, EventItem[]>>({});
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<{
    key: string;
    index: number;
    event: EventItem;
  } | null>(null);


  const handleAddEvent = (dateKey: string, title: string, category: string) => {
    setEvents((prev) => {
      const updated = { ...prev };
      if (!updated[dateKey]) updated[dateKey] = [];
      updated[dateKey] = [...updated[dateKey], { title, dateKey, category }];
      console.log("📌 Added new event:", updated[dateKey]);
      return updated;
    });
  };


  const handleDeleteEvent = (key: string, index: number) => {
    setEvents((prev) => {
      const updated = { ...prev };
      updated[key] = updated[key].filter((_, i) => i !== index);
      if (updated[key].length === 0) delete updated[key];
      console.log("🗑️ After delete, events:", updated);
      return updated;
    });
  };

 
  const handleUpdateEvent = (key: string, index: number, updatedEvent: EventItem) => {
    setEvents((prev) => {
      const updated = { ...prev };
      updated[key] = updated[key].map((ev, i) => (i === index ? updatedEvent : ev));
      console.log("✏️ After update, events:", updated);
      return updated;
    });
  };

  
  const handleParsedEvents = (parsed: Record<string, EventItem[]>) => {
    const normalized: Record<string, EventItem[]> = {};
    Object.keys(parsed).forEach((k) => {
      normalized[k] = parsed[k].map((e) => ({
        ...e,
        category: e.category || "General",
      }));
    });

    console.log("📥 Parsed syllabus events:", normalized);

    setEvents((prev) => {
      const merged = { ...prev, ...normalized };
      console.log("✅ Events after merge:", merged);
      return merged;
    });

  
    const firstDateKey = Object.keys(normalized)[0];
    if (firstDateKey) {
      const [year, month] = firstDateKey.split("-");
      setCurrentYear(Number(year));
      setCurrentMonth(Number(month) - 1); // months are 0-based
      console.log("📆 Jumped to:", year, month);
    }
  };

  
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = new Array(firstDay).fill(null);

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) weeks.push([...week, ...new Array(7 - week.length).fill(null)]);

  return (
    <div className="p-4">
      <CalendarHeader
        currentMonth={currentMonth}
        currentYear={currentYear}
        setCurrentMonth={setCurrentMonth}
        setCurrentYear={setCurrentYear}
        onAddEventClick={() => setShowAddEventModal(true)}
      />

      <SyllabusUpload onEventsParsed={handleParsedEvents} />

      <WeekdayHeader />

      <div className="grid grid-cols-7 gap-px bg-gray-300 dark:bg-gray-600">
        {weeks.map((week, wi) =>
          week.map((day, di) => {
            const key =
              day !== null
                ? `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(
                    day
                  ).padStart(2, "0")}`
                : `empty-${wi}-${di}`;

            return (
              <DayCell
                key={key}
                day={day}
                dayKey={key}
                events={day ? events[key] || [] : []}
                onEdit={(index) =>
                  setEditingEvent({ key, index, event: events[key][index] })
                }
                onDelete={(index) => handleDeleteEvent(key, index)}
              />
            );
          })
        )}
      </div>

      {/* Add Event Modal */}
      {showAddEventModal && (
        <AddEventModal
          onClose={() => setShowAddEventModal(false)}
          onSave={(dateKey, title, category) => {
            handleAddEvent(dateKey, title, category);
            setShowAddEventModal(false);
          }}
        />
      )}

      {/* Edit Event Modal */}
      {editingEvent && (
        <EditEventModal
          event={editingEvent.event}
          onClose={() => setEditingEvent(null)}
          onSave={(updated) =>
            handleUpdateEvent(editingEvent.key, editingEvent.index, updated)
          }
        />
      )}
    </div>
  );
}
