import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UiType } from "../types";

const initialState: UiType = {
	showDrawer: false,
	errorMessage: null,
};

export const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		setShowDrawer: (state, action: PayloadAction<boolean>) => {
			state.showDrawer = action.payload;
		},
		setErrorMessage: (state, action: PayloadAction<string | null>) => {
			state.errorMessage = action.payload;
		},
	},
});

export const { setShowDrawer, setErrorMessage } = uiSlice.actions;

export default uiSlice.reducer;
