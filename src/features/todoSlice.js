import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },

    deleteTodo: (state, action) => {
      const idToDelete = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== idToDelete);
    },

    editTodo: (state, action) => {
      const { id, updatedTodo } = action.payload;
      state.todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      );
    },
  },
});

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
