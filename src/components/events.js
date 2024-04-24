import React from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  const todos = useSelector((state) => state.todos.todos);
  const today = new Date().toLocaleDateString();
  const eventsToday = todos.some((todo) => todo.sdate === today);

  return (
    <div
      className={`m-3    p-7 border rounded-full h-20   text-gray-950 flex justify-center items-center  shadow-2xl hover:shadow-inner ${
        eventsToday ? "animate-bounce  bg-red-500" : " animate-pulse bg-white"
      }`}
    >
      <p className="whitespace-no-wrap">
        {eventsToday ? "you have events today" : "No events today!"}
      </p>
    </div>
  );
};

export default Alert;
