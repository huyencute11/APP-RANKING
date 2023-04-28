import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUsers } from "./actions";
import User from "../../../interface/User";

export interface UserState {
  userData: User[]; // Users data
  loading: boolean; // Loading state
  error: string | null; // Error state
  // filter: 'monthly', // Filter state, initially set to 'monthly'
}

const initialState: UserState = {
  userData: [],
  loading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle start of fetching users
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // Handle successful fetching of users
    builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.userData = action.payload;
    });
    // Handle error while fetching users
    builder.addCase(getUsers.rejected, (state) => {
      state.loading = false;
      state.error = 'Error while fetching users';
    });

  },
});

export default usersSlice.reducer;
// export const { applyMonthlyFilter, applyYearlyFilter } = usersSlice.actions;
