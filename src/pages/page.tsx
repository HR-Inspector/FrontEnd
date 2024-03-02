import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import styled from "@emotion/styled";
import { Link as RouterLink, useLocation, useNavigate, useParams } from "react-router-dom";
import type { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/auth";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getAllCompanies, selectCompany } from "../store/slices/company";
import { getAllBranches, selectBranch } from "../store/slices/branch";
import { setMessage } from "../store/slices/message";
import { getAllEmployees, selectEmployee } from "../store/slices/employee";
import { jwtDecode } from 'jwt-decode';
import { IJwtDecoded } from "../types/jwt";
import { EMPLOYEE_ROLE } from "../types/employee";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactNode;
}

const StyledLinkWhite = styled(RouterLink)`
  color: #fff;
  text-decoration: none;
`;

const StyledLinkBlack = styled(RouterLink)`
  color: #000;
  text-decoration: none;
`;

const drawerWidth = 240;

const Page = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
  const location =  useLocation();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const token = useSelector((state: RootState) => state.auth.token);
  const [decodedToken, setDecodedToken] = React.useState<IJwtDecoded | null>(null);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const { companyId, branchId, employeeId } = useParams();
  const branches = useSelector((state: RootState) => state.branch.branches);
  const companies = useSelector((state: RootState) => state.company.companies);
  const employees = useSelector((state: RootState) => state.employee.employees);
  const selectedCompany = useSelector(
    (state: RootState) => state.company.selectedCompany
  );
  const selectedBranch = useSelector(
    (state: RootState) => state.branch.selectedBranch
  );
  const selectedEmployee = useSelector(
    (state: RootState) => state.employee.selectedEmployee
  );
  const { message } = useSelector((state: RootState) => state.message);

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  React.useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token) as IJwtDecoded;  
      setDecodedToken(decoded);
    }
  }, [token]);

  React.useEffect(() => {
    if (decodedToken) {  
      if (decodedToken.role === EMPLOYEE_ROLE.SUPER_ADMIN) {
        return;
      } else if (decodedToken.role === EMPLOYEE_ROLE.EDITOR || decodedToken.role === EMPLOYEE_ROLE.ADMIN) {
        if(location.pathname === '/companies') {
          console.log('here')
          console.log('decoded.companyId')
          console.log(decodedToken.companyId)
          navigate(`/companies/${decodedToken.companyId}/branches/`);
        }
      } else {
        dispatch(logout());
        navigate('/login')
      }
    }
  }, [dispatch, navigate, location.pathname, decodedToken])


  React.useEffect(() => {
    if (companyId && !selectedCompany && decodedToken?.role === EMPLOYEE_ROLE.SUPER_ADMIN) {
      dispatch(getAllCompanies());
    }
    if (companyId && branchId && selectedCompany && !selectedBranch) {
      dispatch(getAllBranches(companyId));
    }
    if (companyId && branchId && employeeId && !selectedEmployee) {
      dispatch(getAllEmployees({ companyId, branchId, limit: 10, offset: 0}));
    }
  }, [dispatch, companyId, branchId, selectedCompany, selectedBranch, employeeId, selectedEmployee, decodedToken]);

  React.useEffect(() => {
    if (companies && companyId && !selectedCompany && decodedToken?.role === EMPLOYEE_ROLE.SUPER_ADMIN) {
      const company = companies.find((company) => company.id === companyId);
      dispatch(selectCompany(company));
    }
    if (branches && selectedCompany && branchId && !selectedBranch) {
      const branch = branches.find((branch) => branch.id === branchId);
      dispatch(selectBranch(branch));
    }
    if (selectedBranch && selectedCompany && employeeId && !selectedEmployee) {
      const employee = employees.find((employee) => employee.id === employeeId);
      dispatch(selectEmployee(employee));
    }
  }, [
    dispatch,
    branchId,
    branches,
    companies,
    companyId,
    selectedBranch,
    selectedCompany,
    employeeId,
    selectedEmployee,
    employees,
    decodedToken,
  ]);

  React.useEffect(() => {
    if (message) {
      setSnackbarOpen(true);
    }
  }, [message]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
    dispatch(setMessage(""));
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <StyledLinkBlack to="/companies">HR Inspector</StyledLinkBlack>
      </Typography>
      <Divider />
      <List>
        <ListItem key="logout" disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText onClick={handleLogout} primary={"Log Out"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
           <StyledLinkWhite to="/companies">HR Inspector</StyledLinkWhite>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button onClick={handleLogout} key="logout" sx={{ color: "#fff" }}>
              Log Out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3, mt: 6 }}>
        <>{props.children}</>
      </Box>
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Page;
