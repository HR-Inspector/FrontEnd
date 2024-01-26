import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ICompany } from '../types/company';

interface ICompanyListProps {
  companies: ICompany[];
  onChangeOvertime: (id: string) => void;
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
          field: 'showOverTime',
          headerName: 'OverTime',
          description: 'This column is for showing overtime.',
          type: 'boolean',
          width: 150,
          editable: true,
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
                    <FormControlLabel
                        sx={{
                        display: 'block',
                        }}
                        control={
                        <Switch
                            checked={params.row.showOverTime}
                            onChange={() => props.onChangeOvertime(params.row.id)}
                            name="showOverTime"
                            color="primary"
                        />
                        }
                        label="Show OverTime"
                    />
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
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                />
              </Box>
            </> 
    
  )};
  
  export default CompanyList;
  