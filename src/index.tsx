import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./store";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Page from "./pages/page";
import Login from "./pages/login";
import Companies from "./pages/companies";
import Employees from "./pages/employees";
import Branches from "./pages/branches";
import AuthCheck from "./pages/authCheck";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import TimeTracking from "./pages/timetracking";
import "react-big-calendar/lib/css/react-big-calendar.css";

const router = createBrowserRouter([
  {
    path: "/login",
    
    element: <Login />,
  },
  {
    path: "/companies",
    element: (
      <AuthCheck>
        <Page>
          <Companies />
        </Page>
      </AuthCheck>
    ),
  },
  {
    path: "companies/:companyId/branches/",
    element: (
      <AuthCheck>
        <Page>
          <Branches />
        </Page>
      </AuthCheck>
    ),
  },
  {
    path: "companies/:companyId/branches/:branchId/employees",
    element: (
      <AuthCheck>
        <Page>
          <Employees />
        </Page>
      </AuthCheck>
    ),
  },
  {
    path: "companies/:companyId/branches/:branchId/employees/:employeeId/timeTracking",
    element: (
      <AuthCheck>
        <Page>
          <TimeTracking />
        </Page>
      </AuthCheck>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/companies" replace />,
  },
]);

const defaultTheme = createTheme();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
