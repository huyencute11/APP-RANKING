import { configureStore } from "@reduxjs/toolkit";
import usersReducer, { UserState } from "./user/userSlice";
import termsReducer, { TermState } from "./term/termSlice";
import userClickReducer, { UserDetailState } from "./userDetail";

// Define the type of state for our Redux store
export interface RootState {
    users: UserState;
    terms: TermState;
    userClickShowDetail: UserDetailState;
}

// Create the Redux store
const store = configureStore({
    reducer: {
        users: usersReducer,
        terms: termsReducer,
        userClickShowDetail: userClickReducer,
    }
});

export default store;
