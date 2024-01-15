import axios from "axios";
import { IAddCompanyBody, ICompany } from "../types/company";
import authHeader from "./auth-header";
import { API_URL } from "../constants/api";

const getAllCompanies = (): Promise<ICompany[]> => {
  return axios
    .get(API_URL + "companies", { headers: authHeader() })
    .then((response: { data: { companies: ICompany[] } }) => {
      return response.data.companies;
    });
};

const addCompany = (data: IAddCompanyBody): Promise<ICompany> => {
  return axios
    .post(API_URL + "companies", data, { headers: authHeader() })
    .then((response: { data: ICompany }) => {
      return response.data;
    });
};

const companyService = {
  getAllCompanies,
  addCompany,
};

export default companyService;
