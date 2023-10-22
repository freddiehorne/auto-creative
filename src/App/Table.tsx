import React, { useCallback } from "react";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import { Person } from "../types";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setRowSelectionModel } from "../redux/gridSlice";
import { useSearchParams } from "react-router-dom";

export default function Table() {
	const dispatch = useDispatch();
	const { items, loading, rowCount, rowSelectionModel } = useSelector(
		(state: RootState) => state.grid
	);

	const [searchParams, setSearchParams] = useSearchParams();

	const pageSize = parseInt(searchParams.get("pageSize") ?? "10", 10);

	const handleSortModelChange = useCallback(
		(sortModel: GridSortModel) => {
			setSearchParams(
				(prev) => {
					prev.set("sort", sortModel[0].field as string);
					prev.set("sortDirection", sortModel[0].sort as string);
					return prev;
				},
				{ replace: true }
			);
		},
		[setSearchParams]
	);

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 70 },
		{
			field: "firstName",
			headerName: "First Name",
			width: 150,
			editable: true,
		},
		{ field: "lastName", headerName: "Last Name", width: 150, editable: true },
		{
			field: "email",
			headerName: "Email",
			width: 250,
			editable: true,
		},
		{
			field: "role",
			headerName: "Role",
			width: 150,
			editable: true,
			type: "singleSelect",
			valueOptions: ["STUDENT", "EMPLOYEE"],
		},
		{
			field: "employeeType",
			headerName: "Employee Type",
			width: 150,
			editable: true,
			type: "singleSelect",
			valueOptions: ["FULL_TIME", "PART_TIME"],
		},
	];

	return (
		<Box mb={10}>
			<DataGrid<Person>
				rows={items}
				columns={columns}
				isCellEditable={() => false}
				loading={loading}
				disableColumnFilter
				disableRowSelectionOnClick
				paginationMode="server"
				rowCount={rowCount}
				initialState={{
					pagination: { paginationModel: { pageSize } },
				}}
				pageSizeOptions={[10, 20, 50]}
				onPaginationModelChange={({ page, pageSize }) => {
					setSearchParams(
						(prev) => {
							prev.set("pageSize", pageSize.toString());
							return prev;
						},
						{ replace: true }
					);
					setSearchParams(
						(prev) => {
							prev.set("offset", (pageSize * page).toString());
							return prev;
						},
						{ replace: true }
					);
				}}
				checkboxSelection={true}
				rowSelectionModel={rowSelectionModel}
				onRowSelectionModelChange={(newRowSelectionModel) => {
					dispatch(setRowSelectionModel(newRowSelectionModel));
				}}
				sortingMode="server"
				onSortModelChange={handleSortModelChange}
			/>
		</Box>
	);
}
