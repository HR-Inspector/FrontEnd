import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../constants/api";
import {
  IEmployee,
  IEmployeeResponse,
  IUpdateEmployee,
} from "../types/employee";
import { ITimeTracking } from "../types/timetracking";

const getAllEmployees = (
  companyId: string,
  branchId: string,
  limit: number,
  offset: number
): Promise<IEmployeeResponse> => {
  return axios
    .get(API_URL + `companies/${companyId}/branches/${branchId}/users`, {
      headers: authHeader(),
      params: {
        limit: limit || 10,
        offset: offset || 0,
      },
    })
    .then((response: { data: IEmployeeResponse }) => {
      return response.data;
    });
};

const updateEmployee = (
  id: string,
  data: IUpdateEmployee
): Promise<IEmployee> => {
  return axios
    .put(API_URL + `users/${id}`, data, { headers: authHeader() })
    .then((response: { data: IEmployee }) => {
      return response.data;
    });
};

const getTimeTrackingInfo = (
  userId: string,
  year: number,
  month: number
): Promise<ITimeTracking> => {
  return axios
    .get(API_URL + `users/${userId}/activities/${year}/${month}`, {
      headers: authHeader(),
    })
    .then((response: { data: ITimeTracking }) => {
      return response.data;
    });
};

const employeeService = {
  getAllEmployees,
  updateEmployee,
  getTimeTrackingInfo,
};

export default employeeService;
