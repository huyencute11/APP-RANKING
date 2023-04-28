import { createAsyncThunk } from "@reduxjs/toolkit";
import { getListTerms } from "../../../util/apiCall";

interface FetchTermsRejectedValue {
    message: string;
}

// Define async thunk for fetching terms data
export const getTerms = createAsyncThunk<
    any, // Return type of fulfilled action
    void, // Payload type of the async thunk (no payload needed)
    {
        rejectValue: FetchTermsRejectedValue;
    }
>(
    'terms/getTerms', // Action type
    async (_, { rejectWithValue }) => {
        try {
            const data = await getListTerms();
            return data;
        } catch (error: any) {
            const rejectedValue: FetchTermsRejectedValue = { message: error.response.data };
            return rejectWithValue(rejectedValue); // Pass error response data to payload
        }
    }
);
