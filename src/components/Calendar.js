import React, { useState } from "react";
import TodoList from "./TodoList";
import Alert from "./events";
import AddTodo from "./addTodo";

const Calendar = () => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
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

  const handleDayClick = (day) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
    const clickedDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(clickedDate);
  };

  const renderCalendarGrid = () => {
    const numDays = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-20 h-20"></div>);
    }

    for (let i = 1; i <= numDays; i++) {
      days.push(
        <button
          key={i}
          className={`w-auto h-20 flex items-center border   justify-center ${
            selectedDate && selectedDate.getDate() === i
              ? "bg-red-500 border border-red-500 text-white rounded-full"
              : "hover:bg-gray-200 rounded-full"
          }`}
          onClick={() => handleDayClick(i)}
        >
          {i}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="flex justify-around   bg-gradient-to-r from-slate-900 to-slate-700 min-h-screen">
      <div className="container mt-3 mb-4 rounded-xl w-auto   bg-yellow-50 border-spacing-3 border border-yellow-400">
        <div className="flex justify-between mb-4">
          <button
            onClick={prevMonth}
            className=" mt-1 ml-1 bg-gray-200 hover:bg-red-600 text-gray-700 font-bold py-2 px-4 rounded-full"
          >
            ◀️
          </button>
          <h2 className="text-lg bg-white rounded-full p-2">
            {months[currentMonth]} {currentYear}
          </h2>
          <button
            onClick={nextMonth}
            className=" mt-1 mr-1  bg-gray-200 hover:bg-red-600 text-gray-700 font-bold py-2 px-4 rounded-full"
          >
            ⏩
          </button>
        </div>

        <div className="flex mb-4 ">
          {weekdays.map((day) => (
            <div
              key={day}
              className="w-full h-20 flex items-center justify-center font-bold bg-white border shadow-lg rounded-t-xl"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="w-full grid grid-cols-7 gap-1  border-t-emerald-500 border-l-emerald-500  border-4 rounded-lg border-blue-600 overflow-hidden ">
          {renderCalendarGrid()}
        </div>

        {selectedDate && <AddTodo selectedDate={selectedDate} />}
      </div>
      <div className="bg-gray-300-4">
        <Alert />
        <TodoList
          selectedDate={selectedDate && selectedDate.toLocaleDateString()}
        />
      </div>
    </div>
  );
};

export default Calendar;
