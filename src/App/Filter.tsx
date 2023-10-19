import React from "react";
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { EmployeeType, PersonRole } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setEmployeeType, setRole, setSearch } from "../redux/filterSlice";

export function Filter() {
	const { search, role, employeeType } = useSelector(
		(state: RootState) => state.filter
	);
	const dispatch = useDispatch();

	const onReset = () => {
		dispatch(setSearch(""));
		dispatch(setRole("ANY"));
		dispatch(setEmployeeType("ANY"));
	};

	return (
		<Box my={4}>
			<Typography variant="h5">Search Filter</Typography>
			<Stack direction="row" spacing={2} sx={{ my: 2 }}>
				<TextField
					name="search"
					label="Search"
					variant="outlined"
					onChange={(e) => dispatch(setSearch(e.target.value))}
					value={search}
				/>

				<FormControl sx={{ minWidth: 120 }}>
					<InputLabel id="role-label">Role</InputLabel>
					<Select<PersonRole>
						labelId="role-label"
						id="role"
						name="role"
						label="Role"
						onChange={(e) => dispatch(setRole(e.target.value as PersonRole))}
						value={role}
					>
						<MenuItem value="ANY">Any</MenuItem>
						<MenuItem value="STUDENT">Student</MenuItem>
						<MenuItem value="EMPLOYEE">Employee</MenuItem>
					</Select>
				</FormControl>

				<FormControl sx={{ minWidth: 120 }}>
					<InputLabel id="employee-label">Employee Type</InputLabel>
					<Select<EmployeeType>
						labelId="employee-label"
						id="employee"
						name="employee"
						label="Employee Type"
						onChange={(e) =>
							dispatch(setEmployeeType(e.target.value as EmployeeType))
						}
						value={employeeType}
						disabled={role === "STUDENT"}
					>
						<MenuItem value="ANY">Any</MenuItem>
						<MenuItem value="FULL_TIME">Full-Time</MenuItem>
						<MenuItem value="PART_TIME">Part-Time</MenuItem>
					</Select>
				</FormControl>

				<Button onClick={onReset}>Reset</Button>
			</Stack>
		</Box>
	);
}
