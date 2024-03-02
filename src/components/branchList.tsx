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
        { field: 'id', headerName: 'ID', width: 350 },
        {
          field: 'createdAt',
          headerName: 'Created At',
          description: 'Branch created date',
          width: 250,
        },
        {
          field: 'address',
          headerName: 'Address',
          description: 'Branch address',
          width: 350,
        },
        { field: 'latitude', headerName: 'Latitude', width: 90 },
        { field: 'longitude', headerName: 'Longitude', width: 90 },
        { field: 'radius', headerName: 'Radius', width: 90 },
        {
          field: 'actions',
          headerName: 'Actions',
          description: 'This column is for action buttons.',
          width: 250,
          sortable: false,
          renderCell: (params) => {
              return (
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" size="small" onClick={() => props.onBranchSelect(params.row)}>Select</Button>
                </Stack>
              );
          },
        }
      ];  

    return (
           <>
              <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={props.branches}
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
                />
              </Box>
            </> 
    
  )};
  
  export default BranchList;
  