import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { useNavigate} from "react-router-dom";

const StyledPaper = styled(Paper)(({ theme }) => ({
    width: '70%',
    height: '60%',
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
    margin: '20px 0 !important',
}));

const Home = () => {
    const navigate = useNavigate();

    return (
    <Box>
      <Typography variant="h3">Home page</Typography>
      <StyledPaper>
      <Accordion expanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Companies</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Create Edit companies you have and edit info.
            <Button sx={{ m: 2 }} variant="contained" onClick={() => navigate('/companies')}>Go to companies</Button>
          </Typography>
        </AccordionDetails>
      </Accordion>
      </StyledPaper>
    </Box>
  )};
  
  export default Home;
  