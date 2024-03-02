import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ICompany } from '../types/company';

interface ICompanyListProps {
  companies: ICompany[];
  onCompanySelect: (company: ICompany) => void;
};

const CompanyList = (props: ICompanyListProps) => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 300 },
        {
          field: 'name',
          headerName: 'Company name',
          description: 'This column is name of the company.',
          width: 150,
        },
        {
          field: 'description',
          headerName: 'Description',
          description: 'This column is company description.',
          width: 500,
        },
        {
          field: 'actions',
          headerName: 'Actions',
          description: 'This column is for action buttons.',
          width: 350,
          sortable: false,
          renderCell: (params) => {              
              return (
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" size="small" onClick={() => props.onCompanySelect(params.row)}>Select</Button>
                </Stack>
              );
          },
        }
      ];  

    return (
           <>
              <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={props.companies}
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
  
  export default CompanyList;
  