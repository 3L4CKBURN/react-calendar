import React, { useState } from "react";
import TodoList from "./TodoList";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../features/todoSlice";
import { nanoid } from "@reduxjs/toolkit";
const Calendar = () => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const [todos, setTodos] = useState([]);

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

  // const handleAddTodo = () => {
  //   if (!title || !description || !selectedDate) return;
  //   const newTodo = {
  //     id: new Date().getTime(),
  //     title,
  //     description,
  //     date: selectedDate,
  //   };
  //   setTodos([...todos, newTodo]);
  // setTitle("");
  // setDescription("");
  // };

  // const handleDeleteTodo = (id) => {
  //   const updatedTodos = todos.filter((todo) => todo.id !== id);
  //   setTodos(updatedTodos);
  // };

  // const handleEditTodo = (id, updatedTodo) => {
  //   console.log("Editing todo with ID:", id);
  //   const updatedTodos = todos.map((todo) =>
  //     todo.id === id ? { ...todo, ...updatedTodo } : todo
  //   );
  //   setTodos(updatedTodos);
  // };
  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(
      addTodo({
        sdate: selectedDate.toLocaleDateString(),
        id: nanoid(),
        title: e.target.elements.title.value,
        description: e.target.elements.desc.value,
      })
    );
    e.target.elements.title.value = "";
    e.target.elements.desc.value = "";
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
          className={`w-20 h-20 flex items-center justify-center ${
            selectedDate && selectedDate.getDate() === i
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-200"
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
    <div className="flex justify-around">
      <div className="container  w-1/2 border">
        <div className="flex justify-between mb-4">
          <button
            onClick={prevMonth}
            className="bg-gray-200 hover:bg-red-600 text-gray-700 font-bold py-2 px-4 rounded-full"
          >
            &lt;
          </button>
          <h2 className="text-lg">
            {months[currentMonth]} {currentYear}
          </h2>
          <button
            onClick={nextMonth}
            className="bg-gray-200 hover:bg-red-600 text-gray-700 font-bold py-2 px-4 rounded-full"
          >
            &gt;
          </button>
        </div>

        <div className="flex mb-4">
          {weekdays.map((day) => (
            <div
              key={day}
              className="w-20 h-20 flex items-center justify-center font-bold"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1  ">{renderCalendarGrid()}</div>

        {selectedDate && (
          <form onSubmit={submitHandle}>
            <h2 className="bg-blue-400">
              Add Todo for : {selectedDate.toLocaleDateString()}
            </h2>
            <input
              name="title"
              type="text"
              placeholder="Title"
              className="block mb-2"
            />
            <textarea
              name="desc"
              placeholder="Description"
              className="block mb-2"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
              Add Todo
            </button>
          </form>
        )}
      </div>
      <div className="bg-gray-300-4">
        <TodoList
          selectedDate={selectedDate && selectedDate.toLocaleDateString()}
        />
      </div>
    </div>
  );
};

export default Calendar;
