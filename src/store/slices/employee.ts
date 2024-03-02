import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import {
  IEmployee,
  IEmployeeResponse,
  IUpdateEmployee,
} from "../../types/employee";
import employeeService from "../../services/employee";
import { ITimeTracking } from "../../types/timetracking";

export interface EmployeeState {
  employees: IEmployee[];
  totalEmployees: number;
  timeTracking: ITimeTracking | null;
  selectedEmployee: IEmployee | null;
}

const initialState: EmployeeState = {
  employees: [],
  totalEmployees: 0,
  timeTracking: null,
  selectedEmployee: null,
};

export const getAllEmployees = createAsyncThunk(
  "employees/getAllEmployees",
  async (
    args: {
      companyId: string;
      branchId: string;
      limit: number;
      offset: number;
    },
    thunkAPI
  ) => {
    try {
      const data = await employeeService.getAllEmployees(
        args.companyId,
        args.branchId,
        args.limit,
        args.offset
      );
      return data;
    } catch (error) {
      let message = "An error accrued";
      if (error instanceof Error) {
        message = `An error accrued.\n${error.message}`;
      }
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (
    args: {
      id: string;
      companyId: string;
      branchId: string;
      body: IUpdateEmployee;
    },
    thunkAPI
  ) => {
    try {
      const data = await employeeService.updateEmployee(args.id, args.body);
      thunkAPI.dispatch(
        getAllEmployees({
          companyId: args.companyId,
          branchId: args.branchId,
          limit: 10,
          offset: 0,
        })
      );
      return data;
    } catch (error) {
      let message = "An error accrued";
      if (error instanceof Error) {
        message = `An error accrued.\n${error.message}`;
      }
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTimeTrackingInfo = createAsyncThunk(
  "employees/getTimeTrackingInfo",
  async (
    args: {
      id: string;
      year: number;
      month: number;
    },
    thunkAPI
  ) => {
    try {
      const data = await employeeService.getTimeTrackingInfo(
        args.id,
        args.year,
        args.month
      );
      return data;
    } catch (error) {
      let message = "An error accrued";
      if (error instanceof Error) {
        message = `An error accrued.\n${error.message}`;
      }
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      getAllEmployees.fulfilled,
      (state: EmployeeState, action: { payload: IEmployeeResponse }) => {
        state.employees = action.payload.users;
        state.totalEmployees = action.payload.totalCount;
      }
    );
    builder.addCase(getAllEmployees.rejected, (state: EmployeeState) => {
      state.employees = [];
      state.totalEmployees = 0;
    });
    builder.addCase(
      getTimeTrackingInfo.fulfilled,
      (state: EmployeeState, action: { payload: ITimeTracking }) => {
        state.timeTracking = action.payload;
      }
    );
    builder.addCase(getTimeTrackingInfo.rejected, (state: EmployeeState) => {
      state.timeTracking = null;
    });
  },
  reducers: {
    selectEmployee: (state, action) => {
      state.selectedEmployee = action.payload;
    },
    cleanEmployee: (state) => {
      state.employees = [];
      state.selectedEmployee = null;
    },
  },
});

export const { selectEmployee, cleanEmployee } = employeeSlice.actions;

const { reducer } = employeeSlice;

export default reducer;
