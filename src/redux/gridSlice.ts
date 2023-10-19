import { GridRowSelectionModel } from "@mui/x-data-grid";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GridState, Person } from "../types";

const initialState: GridState = {
	rowSelectionModel: [],
	offset: 0,
	pageSize: 10,
	items: [],
	rowCount: 0,
	loading: false,
	sort: null,
	sortDirection: null,
};

export const gridSlice = createSlice({
	name: "grid",
	initialState,
	reducers: {
		setRowSelectionModel: (
			state,
			action: PayloadAction<GridRowSelectionModel>
		) => {
			state.rowSelectionModel = action.payload;
		},
		setOffset: (state, action: PayloadAction<number>) => {
			state.offset = action.payload;
		},
		setPageSize: (state, action: PayloadAction<number>) => {
			state.pageSize = action.payload;
		},
		setItems: (state, action: PayloadAction<Person[]>) => {
			state.items = action.payload;
		},
		setRowCount: (state, action: PayloadAction<number>) => {
			state.rowCount = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setSort: (state, action: PayloadAction<keyof Person | null>) => {
			state.sort = action.payload;
		},
		setSortDirection: (
			state,
			action: PayloadAction<"asc" | "desc" | null | undefined>
		) => {
			state.sortDirection = action.payload;
		},
	},
});

export const {
	setRowSelectionModel,
	setOffset,
	setPageSize,
	setItems,
	setRowCount,
	setLoading,
	setSort,
	setSortDirection,
} = gridSlice.actions;

export default gridSlice.reducer;
