import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CompanyService from "../../services/company";
import { IAddCompanyBody, ICompany } from "../../types/company";
import { setMessage } from "./message";

export interface CompanyState {
  companies: ICompany[];
  selectedCompany: ICompany | null;
}

const initialState: CompanyState = { companies: [], selectedCompany: null };

export const getAllCompanies = createAsyncThunk(
  "companies/getAllCompanies",
  async (args, thunkAPI) => {
    try {
      const data = await CompanyService.getAllCompanies();
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

export const addCompany = createAsyncThunk(
  "companies/addCompany",
  async (body: IAddCompanyBody, thunkAPI) => {
    try {
      const data = await CompanyService.addCompany(body);
      thunkAPI.dispatch(getAllCompanies());
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

const companySlice = createSlice({
  name: "company",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      getAllCompanies.fulfilled,
      (state: CompanyState, action: { payload: ICompany[] }) => {
        state.companies = action.payload;
      }
    );
    builder.addCase(getAllCompanies.rejected, (state: CompanyState) => {
      state.companies = [];
    });
  },
  reducers: {
    selectCompany: (state, action) => {
      state.selectedCompany = action.payload;
    },
  },
});

export const { selectCompany } = companySlice.actions;

const { reducer } = companySlice;

export default reducer;
