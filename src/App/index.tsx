import { useEffect, useState } from "react";
import {
	Box,
	Button,
	Container,
	Drawer,
	Paper,
	Snackbar,
	Typography,
} from "@mui/material";
import { queryApi } from "../api";
import Table from "./Table";
import { Filter } from "./Filter";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
	setItems,
	setLoading,
	setRowCount,
	setRowSelectionModel,
} from "../redux/gridSlice";
import { useSearchParams } from "react-router-dom";
import { paramsSchema } from "../schemas";

function App() {
	const dispatch = useDispatch();
	const [searchParams] = useSearchParams();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [showDrawer, setShowDrawer] = useState(false);

	const { rowSelectionModel, rowCount } = useSelector(
		(state: RootState) => state.grid
	);

	const params = paramsSchema.parse({
		search: searchParams.get("search") ?? "",
		role: searchParams.get("role") ?? "ANY",
		employeeType: searchParams.get("employeeType") ?? "ANY",
		offset: parseInt(searchParams.get("offset") ?? "0", 10),
		pageSize: parseInt(searchParams.get("pageSize") ?? "10", 10),
		sortDirection: searchParams.get("sortDirection"),
		sort: searchParams.get("sort"),
	});
	const { search, role, employeeType, offset, pageSize, sortDirection, sort } =
		params;

	useEffect(() => {
		setShowDrawer(rowSelectionModel.length > 0);
	}, [rowSelectionModel]);

	useEffect(() => {
		dispatch(setLoading(true));
		queryApi(search, role, employeeType, offset, pageSize, sort, sortDirection)
			.then(({ items, rowCount }) => {
				dispatch(setItems(items));
				dispatch(setRowCount(rowCount));
				dispatch(setLoading(false));
			})
			.catch(() =>
				setErrorMessage("There has been an error loading from the API.")
			);
	}, [
		search,
		role,
		employeeType,
		offset,
		pageSize,
		sort,
		sortDirection,
		rowCount,
		dispatch,
	]);

	return (
		<Container>
			<Paper sx={{ p: 2 }}>
				<Snackbar
					anchorOrigin={{ vertical: "top", horizontal: "center" }}
					open={errorMessage !== null}
					autoHideDuration={6000}
					onClose={() => setErrorMessage(null)}
					message={errorMessage}
				/>

				<Box>
					<Typography variant="h4">Person Admin</Typography>
				</Box>

				<Filter />

				<Table />

				<Drawer
					anchor="bottom"
					open={showDrawer}
					onClose={setShowDrawer}
					hideBackdrop={true}
					variant="persistent"
				>
					<Box sx={{ bgcolor: "black", p: 4, color: "white" }}>
						<Button
							color="primary"
							onClick={() => dispatch(setRowSelectionModel([]))}
						>
							Export {rowSelectionModel.length} item(s) ➡️{" "}
						</Button>
					</Box>
				</Drawer>
			</Paper>
		</Container>
	);
}

export default App;
