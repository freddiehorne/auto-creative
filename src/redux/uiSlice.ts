import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Person } from "../types";

export type UiType = {
	sort: keyof Person | null;
	showDrawer: boolean;
	sortDirection: "asc" | "desc" | null | undefined;
	errorMessage: string | null;
};

const initialState: UiType = {
	sort: null,
	showDrawer: false,
	sortDirection: null,
	errorMessage: null,
};

export const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		setSort: (state, action: PayloadAction<keyof Person | null>) => {
			state.sort = action.payload;
		},
		setSortDirection: (
			state,
			action: PayloadAction<"asc" | "desc" | null | undefined>
		) => {
			state.sortDirection = action.payload;
		},
		setShowDrawer: (state, action: PayloadAction<boolean>) => {
			state.showDrawer = action.payload;
		},
		setErrorMessage: (state, action: PayloadAction<string | null>) => {
			state.errorMessage = action.payload;
		},
	},
});

export const { setSort, setSortDirection, setShowDrawer, setErrorMessage } =
	uiSlice.actions;

export default uiSlice.reducer;
