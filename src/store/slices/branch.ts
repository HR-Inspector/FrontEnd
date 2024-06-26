import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BranchService from "../../services/branch";
import { IAddBranchBody, IBranch } from "../../types/branch";
import { setMessage } from "./message";

export interface BranchState {
  branches: IBranch[];
  selectedBranch: IBranch | null;
}

const initialState: BranchState = { branches: [], selectedBranch: null };

export const getAllBranches = createAsyncThunk(
  "branches/getAllBranches",
  async (companyId: string, thunkAPI) => {
    try {
      const data = await BranchService.getAllBranches(companyId);
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

export const addBranch = createAsyncThunk(
  "branches/addBranch",
  async (args: { companyId: string; body: IAddBranchBody }, thunkAPI) => {
    try {
      const data = await BranchService.addBranch(args.companyId, args.body);
      thunkAPI.dispatch(getAllBranches(args.companyId));
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

const branchSlice = createSlice({
  name: "branch",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      getAllBranches.fulfilled,
      (state: BranchState, action: { payload: IBranch[] }) => {
        state.branches = action.payload;
      }
    );
    builder.addCase(getAllBranches.rejected, (state: BranchState) => {
      state.branches = [];
    });
  },
  reducers: {
    selectBranch: (state, action) => {
      state.selectedBranch = action.payload;
    },
    cleanBranch: (state) => {
      state.branches = [];
      state.selectedBranch = null;
    },
  },
});

export const { selectBranch, cleanBranch } = branchSlice.actions;

const { reducer } = branchSlice;
export default reducer;
