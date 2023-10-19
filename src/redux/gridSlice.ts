import { GridRowSelectionModel } from "@mui/x-data-grid";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Person } from "../types";

export type GridState = {
	rowSelectionModel: GridRowSelectionModel;
	offset: number;
	pageSize: number;
	items: Person[];
	count: number;
	loading: boolean;
};

const initialState: GridState = {
	rowSelectionModel: [],
	offset: 0,
	pageSize: 10,
	items: [],
	count: 0,
	loading: false,
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
		setCount: (state, action: PayloadAction<number>) => {
			state.count = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
	},
});

export const {
	setRowSelectionModel,
	setOffset,
	setPageSize,
	setItems,
	setCount,
	setLoading,
} = gridSlice.actions;

export default gridSlice.reducer;
