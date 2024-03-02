import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/auth";
import { setMessage } from "./message";
import { cleanCompany } from "./company";
import { cleanBranch } from "./branch";
import { cleanEmployee } from "./employee";

export interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
}

const storageData = localStorage.getItem("authToken");
const token = storageData ? JSON.parse(storageData) : null;

const initialState: AuthState = { isLoggedIn: !!token, token: token ?? null };

export const login = createAsyncThunk(
  "auth/login",
  async (
    { username, password }: { username: string; password: string },
    thunkAPI
  ) => {
    try {
      const data = await AuthService.login(username, password);
      return { token: data.jwt };
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

export const logout = createAsyncThunk(
  "auth/logout",
  async (args, thunkAPI) => {
    await AuthService.logout();
    thunkAPI.dispatch(cleanCompany());
    thunkAPI.dispatch(cleanBranch());
    thunkAPI.dispatch(cleanEmployee());
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (state: AuthState, action: { payload: { token: string | null } }) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
      }
    );
    builder.addCase(login.rejected, (state: AuthState) => {
      state.isLoggedIn = false;
      state.token = null;
    });
    builder.addCase(logout.fulfilled, (state: AuthState) => {
      state.isLoggedIn = false;
      state.token = null;
    });
  },
  reducers: {},
});

const { reducer } = authSlice;
export default reducer;
