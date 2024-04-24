import React from "react";

const TodayEvents = ({ todos }) => {
  const today = new Date().toLocaleDateString();

  const todayTodos = todos.filter((todo) => {
    return new Date(todo.sdate).toLocaleDateString() === today;
  });

  return (
    <div>
      <h2>Today's Events</h2>
      <ul>
        {todayTodos.map((todo) => (
          <li key={todo.id}>
            <p>Title: {todo.title}</p>
            <p>Description: {todo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodayEvents;
