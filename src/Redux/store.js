import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./Reducers/tasks.reducer";
// ROOT REDUCER

export default configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
