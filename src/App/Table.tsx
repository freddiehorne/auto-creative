import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Person } from "../types";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
	setOffset,
	setPageSize,
	setRowSelectionModel,
} from "../redux/gridSlice";

export default function Table() {
	const { items, loading, pageSize, rowCount, rowSelectionModel } = useSelector(
		(state: RootState) => state.grid
	);
	const dispatch = useDispatch();

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
					dispatch(setPageSize(pageSize));
					dispatch(setOffset(pageSize * page));
				}}
				checkboxSelection={true}
				rowSelectionModel={rowSelectionModel}
				onRowSelectionModelChange={(newRowSelectionModel) => {
					dispatch(setRowSelectionModel(newRowSelectionModel));
				}}
			/>
		</Box>
	);
}
