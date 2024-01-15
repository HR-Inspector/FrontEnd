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
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'name',
          headerName: 'Company name',
          description: 'This column is name of the company.',
          width: 150,
          editable: true,
        },
        {
          field: 'description',
          headerName: 'Description',
          description: 'This column is company description.',
          width: 250,
          editable: true,
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
                    <Button variant="outlined" color="warning" size="small" onClick={() => props.onCompanySelect(params.row)}>Select</Button>
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
                    rows={props.companies}
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
  
  export default CompanyList;
  