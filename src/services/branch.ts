import axios from "axios";
import { IBranch, IAddBranchBody } from "../types/branch";
import authHeader from "./auth-header";
import { API_URL } from "../constants/api";

const getAllBranches = (companyId: string): Promise<IBranch[]> => {
  return axios
    .get(API_URL + `companies/${companyId}/branches`, { headers: authHeader() })
    .then((response: { data: { branches: IBranch[] } }) => {
      return response.data.branches;
    });
};

const addBranch = (
  companyId: string,
  data: IAddBranchBody
): Promise<IBranch> => {
  return axios
    .post(API_URL + `companies/${companyId}/branches`, data, {
      headers: authHeader(),
    })
    .then((response: { data: IBranch }) => {
      return response.data;
    });
};

const branchService = {
  addBranch,
  getAllBranches,
};

export default branchService;
