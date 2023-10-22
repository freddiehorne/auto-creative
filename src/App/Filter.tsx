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
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export function Filter() {
	const [searchParams, setSearchParams] = useSearchParams();

	const search = searchParams.get("search") ?? "";
	const role = (searchParams.get("role") as PersonRole) ?? "ANY";
	const employeeType =
		(searchParams.get("employeeType") as EmployeeType) ?? "ANY";

	const onReset = () => {
		setSearchParams({});
	};

	useEffect(() => {
		if (role === "STUDENT" || role === "ANY") {
			setSearchParams(
				(prev) => {
					prev.delete("employeeType");
					return prev;
				},
				{ replace: true }
			);
		}
	}, [role, setSearchParams]);

	return (
		<Box my={4}>
			<Typography variant="h5">Search Filter</Typography>
			<Stack direction="row" spacing={2} sx={{ my: 2 }}>
				<TextField
					name="search"
					label="Search"
					variant="outlined"
					onChange={(e) =>
						setSearchParams(
							(prev) => {
								prev.set("search", e.target.value);
								return prev;
							},
							{ replace: true }
						)
					}
					value={search}
				/>

				<FormControl sx={{ minWidth: 120 }}>
					<InputLabel id="role-label">Role</InputLabel>
					<Select<PersonRole>
						labelId="role-label"
						id="role"
						name="role"
						label="Role"
						onChange={(e) =>
							setSearchParams(
								(prev) => {
									prev.set("role", e.target.value as PersonRole);
									return prev;
								},
								{ replace: true }
							)
						}
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
							setSearchParams(
								(prev) => {
									prev.set("employeeType", e.target.value as EmployeeType);
									return prev;
								},
								{ replace: true }
							)
						}
						value={employeeType}
						disabled={role !== "EMPLOYEE"}
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
