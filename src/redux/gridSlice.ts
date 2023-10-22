import { GridRowSelectionModel } from "@mui/x-data-grid";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GridState, Person } from "../types";

const initialState: GridState = {
	rowSelectionModel: [],
	items: [],
	rowCount: 0,
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
		setItems: (state, action: PayloadAction<Person[]>) => {
			state.items = action.payload;
		},
		setRowCount: (state, action: PayloadAction<number>) => {
			state.rowCount = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
	},
});

export const { setRowSelectionModel, setItems, setRowCount, setLoading } =
	gridSlice.actions;

export default gridSlice.reducer;
