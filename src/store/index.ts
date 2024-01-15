import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import companyReducer from "./slices/company";
import branchReducer from "./slices/branch";
import employeeReducer from "./slices/employee";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    company: companyReducer,
    branch: branchReducer,
    employee: employeeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
