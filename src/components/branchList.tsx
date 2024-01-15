import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IBranch } from '../types/branch';

interface IBranchListProps {
  branches: IBranch[];
  onBranchSelect: (branch: IBranch) => void;
};

const BranchList = (props: IBranchListProps) => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'createdAt',
          headerName: 'Created At',
          description: 'Branch created date',
          width: 150,
          editable: true,
        },
        {
          field: 'address',
          headerName: 'Address',
          description: 'Branch address',
          width: 150,
          editable: true,
        },
        { field: 'latitude', headerName: 'Latitude', width: 90 },
        { field: 'longitude', headerName: 'Longitude', width: 90 },
        { field: 'radius', headerName: 'Radius', width: 90 },
        {
          field: 'actions',
          headerName: 'Actions',
          description: 'This column is for action buttons.',
          width: 500,
          sortable: false,
          renderCell: (params) => {
              const onClick = (e: React.MouseEvent) => {
                e.stopPropagation(); // don't select this row after clicking
                const currentRow = params.row;
                return alert(JSON.stringify(currentRow, null, 4));
              };
              
              return (
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" color="warning" size="small" onClick={() => props.onBranchSelect(params.row)}>Select</Button>
                    <Button variant="outlined" color="warning" size="small" onClick={onClick}>Info</Button>
                </Stack>
              );
          },
        }
      ];  

    return (
           <>
              <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={props.branches}
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
    
  )};
  
  export default BranchList;
  