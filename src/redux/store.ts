import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice";
import gridReducer from "./gridSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
	reducer: {
		filter: filterReducer,
		grid: gridReducer,
		ui: uiReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
