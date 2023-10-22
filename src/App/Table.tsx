import { useCallback } from "react";
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridSortDirection,
	GridSortModel,
} from "@mui/x-data-grid";
import { Person } from "../types";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setRowSelectionModel } from "../redux/gridSlice";
import { useSearchParams } from "react-router-dom";
import { mutateApi } from "../api";

export default function Table() {
	const dispatch = useDispatch();
	const { items, loading, rowCount, rowSelectionModel } = useSelector(
		(state: RootState) => state.grid
	);

	const [searchParams, setSearchParams] = useSearchParams();

	const pageSize = parseInt(searchParams.get("pageSize") ?? "10", 10);

	const sortingOrder: GridSortDirection[] = ["asc", "desc"];

	const handleSortModelChange = useCallback(
		(sortModel: GridSortModel) => {
			setSearchParams(
				(prev) => {
					prev.set("sort", sortModel[0].field);
					prev.set("sortDirection", sortModel[0].sort as string);
					return prev;
				},
				{ replace: true }
			);
		},
		[setSearchParams]
	);

	const isCellEditable = (params: GridCellParams) => {
		return params.field !== "employeeType" || params.row.role === "EMPLOYEE";
	};

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 70 },
		{
			field: "firstName",
			headerName: "First Name",
			width: 150,
			editable: true,
			sortingOrder,
		},
		{
			field: "lastName",
			headerName: "Last Name",
			width: 150,
			editable: true,
			sortingOrder,
		},
		{
			field: "email",
			headerName: "Email",
			width: 250,
			editable: true,
			sortingOrder,
		},
		{
			field: "role",
			headerName: "Role",
			width: 150,
			editable: true,
			type: "singleSelect",
			valueOptions: ["STUDENT", "EMPLOYEE"],
			sortingOrder,
		},
		{
			field: "employeeType",
			headerName: "Employee Type",
			width: 150,
			editable: true,
			type: "singleSelect",
			valueOptions: ["FULL_TIME", "PART_TIME"],
			sortingOrder,
		},
	];

	return (
		<Box mb={10}>
			<DataGrid<Person>
				rows={items}
				columns={columns}
				isCellEditable={(params) => isCellEditable(params)}
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
				processRowUpdate={(updatedRow, originalRow) => {
					if (updatedRow.role === "STUDENT") {
						updatedRow.employeeType = null;
					}

					if (updatedRow.role === "EMPLOYEE") {
						updatedRow.employeeType = updatedRow.employeeType ?? "FULL_TIME";
					}
					return mutateApi(originalRow.id, updatedRow);
				}}
			/>
		</Box>
	);
}
