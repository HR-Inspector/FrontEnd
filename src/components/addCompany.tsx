import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { IAddCompanyBody } from '../types/company';

const StyledBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    background: '#34495e',
}));

const StyledStack = styled(Stack)(({ theme }) => ({
    width: '100%',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    width: 480,
    height: 640,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
    margin: 'auto !important',
    borderRadius: 0,
}));

interface IAddCompanyProps {
    onSubmit: (data: IAddCompanyBody) => void;
    onBack: () => void;
 };

const AddCompany = (props: IAddCompanyProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [adminUsername, setAdminUsername] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

    const handleOnSubmit = () => {
        props.onSubmit({
            name,
            description,
            showOverTime: false,
            adminUsername,
            adminPassword,
        });
    };

    return (
            <>
                <StyledBox sx={{ display: 'flex' }}>
                    <StyledStack direction="row" spacing={2}>
                        <StyledPaper variant="elevation">
                            <Typography variant="h5" gutterBottom>
                                Create company
                            </Typography>
                            <TextField
                                required
                                id="name"
                                label="Company Name"
                                placeholder="Your Company Name..."
                                sx={{ m: 2 }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <br />
                            <TextField
                                required
                                id="description"
                                label="Description"
                                placeholder="Your Company Description..."
                                sx={{ m: 2 }}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <br />
                            <TextField
                                required
                                id="adminUsername"
                                label="Admin Username"
                                placeholder="Your admin username..."
                                sx={{ m: 2 }}
                                value={adminUsername}
                                onChange={(e) => setAdminUsername(e.target.value)}
                            />
                            <br />
                            <TextField
                                required
                                id="adminPassword"
                                label="Admin Password"
                                type="password"
                                placeholder="Your admin password..."
                                sx={{ m: 2 }}
                                value={adminPassword}
                                onChange={(e) => setAdminPassword(e.target.value)}
                            />
                            <br />
                            <Button sx={{ m: 2 }} variant="outlined" onClick={props.onBack}>Back</Button>
                            <Button sx={{ m: 2 }} variant="contained" onClick={handleOnSubmit}>Create</Button>
                        </StyledPaper>
                    </StyledStack>
                </StyledBox>
            </> 
  )};
  
  export default AddCompany;
  