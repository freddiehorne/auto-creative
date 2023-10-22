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
	items: Person[];
	rowCount: number;
	loading: boolean;
};

export type FilterState = {
	search: string;
	role: PersonRole;
	employeeType: EmployeeType;
};
