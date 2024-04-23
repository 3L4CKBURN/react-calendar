import { useState } from "react";
import { deleteTodo, editTodo } from "../features/todoSlice";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  console.log(todos);

  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editMode, setEditMode] = useState(null);

  const handleSaveChanges = () => {
    if (!editedTitle || !editedDescription) {
      return;
    }
    dispatch(
      editTodo({
        id: editMode,
        updatedTodo: {
          title: editedTitle,
          description: editedDescription,
        },
      })
    );
    setEditedTitle("");
    setEditedDescription("");
    setEditMode(null);
  };

  const handleDelete = (id) => {
    console.log("Deleting todo with nanoid:", id);
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <h2 className="underline border-lime-400">Upcoming Events</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div className="flex mx-2 gap-1">
              {/* <p>{todo.id}</p> */}
              <p className="p-2">{todo.sdate}</p>
              {editMode === todo.id ? (
                <input
                  placeholder="title"
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                <strong className="p-2">{todo.title}</strong>
              )}
              {editMode === todo.id ? (
                <input
                  placeholder="desc"
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              ) : (
                <p className="p-2">{todo.description}</p>
              )}
            </div>
            <div>
              {!editMode && (
                <button
                  className="border rounded-full bg-red-400 px-2 hover:bg-red-600-700"
                  onClick={() => setEditMode(todo.id)}
                >
                  Edit
                </button>
              )}
              <button
                className="border rounded-full bg-red-400 px-2 hover:bg-red-600-700"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
              {editMode === todo.id && (
                <button
                  className="border rounded-full bg-green-400 px-2 hover:bg-green-600-700"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
