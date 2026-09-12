import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasksSlice"; // import default pode colocar qualquer nome.

export const store = configureStore({
  reducer: {
    tasks: tasksReducer
  }
});

console.log("Store initialized:", store.getState());