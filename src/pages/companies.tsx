import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Button from "@mui/material/Button";
import { RootState } from "../store";
import {
  addCompany,
  getAllCompanies,
  selectCompany,
} from "../store/slices/company";
import AddCompany from "../components/addCompany";
import CompanyList from "../components/companyList";
import { IAddCompanyBody, ICompany } from "../types/company";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { IJwtDecoded } from "../types/jwt";
import { EMPLOYEE_ROLE } from "../types/employee";
import { logout } from "../store/slices/auth";

const Companies = () => {
  const [createMode, setCreateMode] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const location =  useLocation();
  const companies = useSelector((state: RootState) => state.company.companies);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const token = useSelector((state: RootState) => state.auth.token);
  const [decodedToken, setDecodedToken] = useState<IJwtDecoded | null>(token ? jwtDecode(token) as IJwtDecoded : null);

  const navigate = useNavigate();

  const onAddCompany = (data: IAddCompanyBody) => {
    dispatch(addCompany(data))
      .unwrap()
      .then(() => {
        return true;
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleAddCompanyClick = () => {
    setCreateMode(true);
  };

  const onCompanySelect = (company: ICompany) => {
    dispatch(selectCompany(company));
    navigate(`${company.id}/branches/`);
  };

  useEffect(() => {
    setCreateMode(false);
  }, [companies]);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token) as IJwtDecoded;  
      setDecodedToken(decoded);
    }
  }, [token]);

  useEffect(() => {
    if (decodedToken) {  
      if (decodedToken.role === EMPLOYEE_ROLE.SUPER_ADMIN) {
        return;
      } else if (decodedToken.role === EMPLOYEE_ROLE.EDITOR || decodedToken.role === EMPLOYEE_ROLE.ADMIN) {
        if(location.pathname === '/companies') {
          navigate(`/companies/${decodedToken.companyId}/branches/`);
        }
      } else {
        dispatch(logout());
        navigate('/login')
      }
    }
  }, [dispatch, navigate, location.pathname, decodedToken])

  useEffect(() => {
    if (isLoggedIn && decodedToken?.role === EMPLOYEE_ROLE.SUPER_ADMIN) {
      dispatch(getAllCompanies());
    }
  }, [decodedToken?.role, dispatch, isLoggedIn]);

  return (
    <div>
      <h1>Companies page</h1>
      {createMode ? (
        <AddCompany
          onSubmit={onAddCompany}
          onBack={() => setCreateMode(false)}
        />
      ) : (
        <>
          <Button
            variant="contained"
            onClick={handleAddCompanyClick}
            sx={{ mb: 3 }}
          >
            Add company
          </Button>
          <CompanyList
            companies={companies}
            onCompanySelect={onCompanySelect}
          />
        </>
      )}
    </div>
  );
};

export default Companies;
