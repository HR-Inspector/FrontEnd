import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IEmployee, IUpdateEmployee } from "../types/employee";

interface IEmployeeListProps {
  employees: IEmployee[];
  onEmployeeSelect: (employee: IEmployee) => void;
  onEmployeeUpdate: (id: string, updatedEmployee: IUpdateEmployee) => void;
}

const EmployeeList = (props: IEmployeeListProps) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "createdAt",
      headerName: "Created At",
      description: "Employee created date",
      width: 150,
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "PhoneNumber",
      description: "Phone number",
      width: 90,
      editable: true,
    },
    { field: "firstName", headerName: "First Name", width: 90, editable: true },
    { field: "lastName", headerName: "Last Name", width: 90, editable: true },
    { field: "username", headerName: "Username", width: 90, editable: true },
    {
      field: "hourlySalary",
      headerName: "Hourly Salary",
      width: 50,
      editable: true,
    },
    {
      field: "monthlySalary",
      headerName: "Monthly Salary",
      width: 50,
      editable: true,
    },
    { field: "branchId", headerName: "Branch Id", width: 90, editable: true },
    { field: "companyId", headerName: "Company Id", width: 90 },
    {
      field: "actions",
      headerName: "Actions",
      description: "This column is for action buttons.",
      width: 500,
      sortable: false,
      renderCell: (params) => {
        const onInfo = (e: React.MouseEvent) => {
          e.stopPropagation(); // don't select this row after clicking
          const currentRow = params.row;
          return alert(JSON.stringify(currentRow, null, 4));
        };

        const onSave = (e: React.MouseEvent) => {
          e.stopPropagation(); // don't select this row after clicking
          const currentRow = params.row;
          const updatedFields = {
            phoneNumber: currentRow.phoneNumber,
            firstName: currentRow.firstName,
            lastName: currentRow.lastName,
            username: currentRow.username,
            hourlySalary: currentRow.hourlySalary,
            monthlySalary: currentRow.monthlySalary,
            branchId: currentRow.branchId,
          }
          props.onEmployeeUpdate(currentRow.id, updatedFields)
        };

        return (
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="warning"
              size="small"
              onClick={() => props.onEmployeeSelect(params.row)}
            >
              Select
            </Button>
            <Button
              variant="outlined"
              color="warning"
              size="small"
              onClick={onSave}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="warning"
              size="small"
              onClick={onInfo}
            >
              Info
            </Button>
          </Stack>
        );
      },
    },
  ];

  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={props.employees}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
};

export default EmployeeList;
