import React from "react"

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function WeekdayHeader() {
  return (
    <div className="grid grid-cols-7 bg-gray-100 font-bold text-center mb-1">
      {weekdays.map((day) => (
        <div key={day} className="p-2 border">
          {day}
        </div>
      ))}
    </div>
  )
}
