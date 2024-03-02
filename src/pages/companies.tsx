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
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const [createMode, setCreateMode] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const companies = useSelector((state: RootState) => state.company.companies);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const onAddCompany = (data: IAddCompanyBody) => {
    dispatch(addCompany(data))
      .unwrap()
      .then(() => {
        //dispatch(getAllCompanies())
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
    if (isLoggedIn) {
      dispatch(getAllCompanies());
    }
  }, [dispatch, isLoggedIn]);

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
