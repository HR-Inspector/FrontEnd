import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IEmployee, IUpdateEmployee } from "../types/employee";
import { useEffect, useState } from "react";

interface IEmployeeListProps {
  employees: IEmployee[];
  totalRowCount?: number
  onEmployeeSelect: (employee: IEmployee) => void;
  onEmployeeUpdate: (id: string, updatedEmployee: IUpdateEmployee) => void;
  onPageChange: (page: number, pageSize: number) => void;
}

const EmployeeList = (props: IEmployeeListProps) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCountState, setRowCountState] = useState(
    props.totalRowCount || props.employees.length || 0,
  );
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "createdAt",
      headerName: "Created At",
      description: "Employee created date",
      width: 100,
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "PhoneNumber",
      description: "Phone number",
      width: 150,
      editable: true,
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 150,
      editable: true,
    },
    { field: "lastName", headerName: "Last Name", width: 150, editable: true },
    { field: "username", headerName: "Username", width: 150, editable: true },
    {
      field: "hourlySalary",
      headerName: "Hourly Salary",
      width: 150,
      editable: true,
    },
    {
      field: "monthlySalary",
      headerName: "Monthly Salary",
      width: 150,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      description: "This column is for action buttons.",
      width: 250,
      sortable: false,
      renderCell: (params) => {
        const onSave = (e: React.MouseEvent) => {
          e.stopPropagation(); // don't select this row after clicking
          const currentRow = params.row;
          const updatedFields = {
            phoneNumber: currentRow.phoneNumber,
            firstName: currentRow.firstName,
            lastName: currentRow.lastName,
            username: currentRow.username,
            hourlySalary: parseFloat(currentRow.hourlySalary),
            monthlySalary: parseFloat(currentRow.monthlySalary),
            branchId: currentRow.branchId,
          };
          props.onEmployeeUpdate(currentRow.id, updatedFields);
        };

        return (
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="small"
              onClick={() => props.onEmployeeSelect(params.row)}
            >
              Select
            </Button>
            <Button variant="contained" size="small" onClick={onSave}>
              Save
            </Button>
          </Stack>
        );
      },
    },
  ];

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      props.totalRowCount !== undefined
        ? props.totalRowCount
        : prevRowCountState,
    );
  }, [props.totalRowCount, setRowCountState]);

  useEffect(() => {
    props.onPageChange(paginationModel.page, paginationModel.pageSize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationModel.page, paginationModel.pageSize]);

  return (
    <>
      <Box sx={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={props.employees}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
          rowCount={rowCountState}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
        />
      </Box>
    </>
  );
};

export default EmployeeList;
