import React from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addTodo } from "../features/todoSlice";

const AddTodoForm = ({ selectedDate }) => {
    const dispatch =useDispatch()
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
  return (
    <form className="bg-lime-300 rounded-lg m-2 w-1/2 p-2" onSubmit={submitHandle}>
      <h2 className="rounded-lg border border-blue-700 bg-blue-300">
        Add Todo for : {selectedDate.toLocaleDateString()}
      </h2>
      <input
        required
        name="title"
        type="text"
        placeholder="Title"
        className="block mb-2 rounded-lg m-2"
      />
      <textarea
        required
        name="desc"
        placeholder="Description"
        className="block mb-2 rounded-lg m-2"
      />
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2  rounded-lg mx-8">
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;
