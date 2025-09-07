// Utility to generate consistent keys for events
export function formatDateKey(date: string | Date): string {
    const d = typeof date === "string" ? new Date(date) : date
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
  }
  