import { createSlice } from "@reduxjs/toolkit";
import { getTerms } from "./actions";

interface Term {
    point: number;
    detail: string;
}

export interface TermState {
    termData: Term[]; // Users data
    loading: boolean; // Loading state
    error: string | null; // Error state
}
// Define initial state
const initialState: TermState = {
    termData: [], // terms data
    loading: false, // Loading state
    error: null, // Error state
};
// Define the Redux slice
export const termsSlice = createSlice({
    name: 'terms', //name of slice
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle start of fetching terms
        builder.addCase(getTerms.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        // Handle successful fetching of terms
        builder.addCase(getTerms.fulfilled, (state, action) => {
            // console.log(action)
            state.loading = false;
            state.termData = action.payload;
        });
        // Handle error while fetching terms
        builder.addCase(getTerms.rejected, (state) => {
            state.loading = false;
            state.error = 'Error while fetching users';
        });
    },
});

// Export the async thunk and the Redux slice
export default termsSlice.reducer;
