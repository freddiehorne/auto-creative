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
import { filterSchema } from "../schemas";

export function Filter() {
	const [searchParams, setSearchParams] = useSearchParams();

	const params = filterSchema.parse({
		search: searchParams.get("search") ?? "",
		role: searchParams.get("role") ?? "ANY",
		employeeType: searchParams.get("employeeType") ?? "ANY",
	});
	const { search, role, employeeType } = params;

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
		if (role === "ANY") {
			setSearchParams(
				(prev) => {
					prev.delete("role");
					return prev;
				},
				{ replace: true }
			);
		}
	}, [role, setSearchParams]);

	useEffect(() => {
		if (search === "") {
			setSearchParams(
				(prev) => {
					prev.delete("search");
					return prev;
				},
				{ replace: true }
			);
		}
	}, [search, setSearchParams]);

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
									prev.set("role", e.target.value);
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
									prev.set("employeeType", e.target.value);
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
