import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice";
import gridReducer from "./gridSlice";

export const store = configureStore({
	reducer: {
		filter: filterReducer,
		grid: gridReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
