import React, { useEffect } from "react";
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
import { setErrorMessage, setShowDrawer } from "../redux/uiSlice";

function App() {
	const dispatch = useDispatch();
	// UI state
	const { errorMessage, showDrawer } = useSelector(
		(state: RootState) => state.ui
	);

	// Grid state
	const { rowSelectionModel, pageSize, offset, rowCount, sort, sortDirection } =
		useSelector((state: RootState) => state.grid);

	// Filter state
	const { search, role, employeeType } = useSelector(
		(state: RootState) => state.filter
	);

	useEffect(() => {
		dispatch(setShowDrawer(rowSelectionModel.length > 0));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rowSelectionModel]);

	useEffect(() => {
		dispatch(setLoading(true));
		queryApi(search, role, employeeType, offset, pageSize, sort, sortDirection)
			.then(({ items, count }) => {
				dispatch(setItems(items));
				dispatch(setRowCount(rowCount));
				dispatch(setLoading(false));
			})
			.catch(() =>
				dispatch(
					setErrorMessage("There has been an error loading from the API.")
				)
			);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		search,
		role,
		employeeType,
		offset,
		pageSize,
		sort,
		sortDirection,
		rowCount,
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
