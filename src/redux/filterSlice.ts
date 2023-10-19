import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { EmployeeType, PersonRole } from "../types";

export type FilterState = {
	search: string;
	role: PersonRole;
	employeeType: EmployeeType;
};

const initialState: FilterState = {
	search: "",
	role: "ANY",
	employeeType: "ANY",
};

export const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setRole: (state, action: PayloadAction<PersonRole>) => {
			if (action.payload === "ANY" || action.payload === "STUDENT") {
				state.employeeType = "ANY";
			}
			state.role = action.payload;
		},
		setEmployeeType: (state, action: PayloadAction<EmployeeType>) => {
			state.employeeType = action.payload;
		},
	},
});

export const { setSearch, setRole, setEmployeeType } = filterSlice.actions;

export default filterSlice.reducer;
