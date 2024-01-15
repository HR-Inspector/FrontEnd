import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../constants/api";
import { IEmployee, IUpdateEmployee } from "../types/employee";
import { ITimeTracking } from "../types/timetracking";

const getAllEmployees = (
  companyId: string,
  branchId: string
): Promise<IEmployee[]> => {
  return axios
    .get(API_URL + `companies/${companyId}/branches/${branchId}/users`, {
      headers: authHeader(),
    })
    .then((response: { data: { users: IEmployee[] } }) => {
      return response.data.users;
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
