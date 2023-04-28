import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserByMonthOrYear, getUserByPostOrWantToGo } from "../../../util/apiCall";

interface Date {
    month?: number | undefined;
    year: number;
}
interface FetchUsersPayload {
    date: Date;
    isWantToGo?: boolean;
}

interface FetchUsersRejectedValue {
    message: string;
}

// Define async thunk for fetching users data
export const getUsers = createAsyncThunk<
    any, // Return type of fulfilled action
    FetchUsersPayload, // Payload type of the async thunk
    {
        rejectValue: FetchUsersRejectedValue;
    }
>(
    'users/getUsers', // Action type
    async ({ date, isWantToGo }, { rejectWithValue }) => {

        try {

            const data = await (isWantToGo ? getUserByPostOrWantToGo(date) : getUserByMonthOrYear(date));
            return data;
            // get usser by want to go or post
        } catch (error: any) {
            const rejectedValue: FetchUsersRejectedValue = { message: error.response.data };
            return rejectWithValue(rejectedValue); // Pass error response data to payload
        }
    }
);

