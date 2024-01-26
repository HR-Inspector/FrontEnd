import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store";
import { login, logout } from "../store/slices/auth";
import { clearMessage, setMessage } from "../store/slices/message";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { jwtDecode } from "jwt-decode";
import { IJwtDecoded } from "../types/jwt";
import { EMPLOYEE_ROLE } from "../types/employee";

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  background: "#34495e",
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  width: "100%",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: 480,
  height: 480,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
  margin: "auto !important",
}));

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const token = useSelector((state: RootState) => state.auth.token);
  const { message } = useSelector((state: RootState) => state.message);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && token) {
      const decoded = jwtDecode(token) as IJwtDecoded;
      if (decoded.role === EMPLOYEE_ROLE.SUPER_ADMIN) {
        navigate("/companies");
      } else if (decoded.role === EMPLOYEE_ROLE.EDITOR || decoded.role === EMPLOYEE_ROLE.ADMIN) {
        navigate(`/companies/${decoded.companyId}/branches/`);
      } else {
        dispatch(logout());
        navigate('/login')
      }
    }
  }, [isLoggedIn, token, navigate, dispatch]);

  const handleLogin = () => {
    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        navigate("/");
      });
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

  return (
    <StyledBox sx={{ display: "flex" }}>
      <StyledStack direction="row" spacing={2}>
        <StyledPaper variant="elevation">
          <Typography variant="h3" gutterBottom>
            Login page
          </Typography>
          <TextField
            required
            id="username"
            label="Username"
            placeholder="Your Username..."
            sx={{ m: 2 }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            placeholder="Your password..."
            sx={{ m: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Button sx={{ m: 2 }} variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </StyledPaper>
      </StyledStack>
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
    </StyledBox>
  );
};

export default Login;
