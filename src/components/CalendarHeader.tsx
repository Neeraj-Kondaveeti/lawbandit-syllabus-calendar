import React, { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusCircleIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  currentMonth: number;
  currentYear: number;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
  onAddEventClick: () => void;
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CalendarHeader({
  currentMonth,
  currentYear,
  setCurrentMonth,
  setCurrentYear,
  onAddEventClick,
}: Props) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  return (
    <div
      className="flex items-center justify-between mb-6 px-6 py-3 rounded-xl 
      bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
      dark:from-indigo-600 dark:via-purple-700 dark:to-pink-700 shadow-lg"
    >
      {/* Animated Month + Year */}
      <AnimatePresence mode="wait">
        <motion.h2
          key={`${currentMonth}-${currentYear}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-extrabold text-white drop-shadow-sm"
        >
          {monthNames[currentMonth]} {currentYear}
        </motion.h2>
      </AnimatePresence>

      <div className="flex items-center gap-3">
        {/* Today Button */}
        <button
          onClick={goToToday}
          className="px-3 py-1 bg-white/20 text-white font-medium rounded-lg hover:bg-white/30 transition"
        >
          Today
        </button>

        {/* Prev / Next */}
        <button
          onClick={prevMonth}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
        >
          <ChevronLeftIcon className="h-5 w-5 text-white" />
        </button>
        <button
          onClick={nextMonth}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
        >
          <ChevronRightIcon className="h-5 w-5 text-white" />
        </button>

        {/* Add Event */}
        <button
          onClick={onAddEventClick}
          className="flex items-center gap-1 px-4 py-2 bg-white text-purple-700 font-semibold rounded-lg 
          shadow hover:bg-gray-100 transition"
        >
          <PlusCircleIcon className="h-5 w-5" />
          <span>Add Event</span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
        >
          <SunIcon className="h-5 w-5 hidden dark:block text-yellow-300" />
          <MoonIcon className="h-5 w-5 block dark:hidden text-white" />
        </button>
      </div>
    </div>
  );
}
