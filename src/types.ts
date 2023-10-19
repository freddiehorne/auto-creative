import { GridRowSelectionModel } from "@mui/x-data-grid";

export interface Person {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	role: PersonRole;
	employeeType: EmployeeType | null;
}

export type PersonRole = "STUDENT" | "EMPLOYEE" | "ANY";
export type EmployeeType = "FULL_TIME" | "PART_TIME" | "ANY";

export type GridState = {
	rowSelectionModel: GridRowSelectionModel;
	offset: number;
	pageSize: number;
	items: Person[];
	rowCount: number;
	loading: boolean;
	sort: keyof Person | null;
	sortDirection: "asc" | "desc" | null | undefined;
};

export type FilterState = {
	search: string;
	role: PersonRole;
	employeeType: EmployeeType;
};

export type UiType = {
	showDrawer: boolean;
	errorMessage: string | null;
};
