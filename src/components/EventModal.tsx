import { EventItem } from "./Calendar"

type Props = {
  day: number
  month: number
  year: number
  events: EventItem[]
  onDelete: (idx: number) => void
  onEdit: (idx: number, event: EventItem) => void
  onClose: () => void
}

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
]

export default function EventModal({ day, month, year, events, onDelete, onEdit, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">
          Events on {monthNames[month - 1]} {day}, {year}
        </h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          {events.map((evt, idx) => (
            <li key={idx} className="flex justify-between items-center gap-2">
              <span>
                <strong>[{evt.category}]</strong> {evt.title}
              </span>
              <div className="flex gap-2">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => onEdit(idx, evt)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => onDelete(idx)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
          {events.length === 0 && <li className="text-gray-500">No events</li>}
        </ul>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}
