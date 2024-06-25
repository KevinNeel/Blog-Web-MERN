import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

import baseURL from '../../Api/Api'

const initialState = {
    user: "",
    success: null,
    loading: false,
    error: null,
};


// Login
export const register = createAsyncThunk(
    "auth/register",
    async (formData, { rejectWithValue }) => { // Fix here
        try {
            const response = await axios.post(`${process.env.REACT_APP_AUTH_URL}/register`, formData); // Fix here
            const { user, token } = response.data;
            console.log(user, 'this is auth user');
            localStorage.setItem("access_token", JSON.stringify(token));
            localStorage.setItem("user", JSON.stringify({
                ...user
            }));
            return { user, token };

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Login
export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => { // Fix here
        try {

            const response = await axios.post(`${process.env.REACT_APP_AUTH_URL}/login`, { email, password }); // Fix here
            const { user, token } = response.data;
            console.log(user, 'this is auth user');
            localStorage.setItem("access_token", JSON.stringify(token));
            localStorage.setItem("user", JSON.stringify({
                ...user
            }));
            return { user, token };

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Get Profile
// export const getProfile = createAsyncThunk(
//     "auth/getProfile",
//     async () => { 
//         try {
//             console.log("called");
//             const response = await baseURL.get(`/myProfile`);
//             console.log(response.data);
//             return response.data;

//         } catch (error) {
//             return error.response.data
//         }
//     }
// );


const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder

            // register
            .addCase(register.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.error = null;
                state.user = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ? action.payload.message : "Login failed";
            })

            // login
            .addCase(login.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.error = null;
                state.user = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ? action.payload.message : "Login failed";
            })

        // Profile
        //  .addCase(getProfile.fulfilled, (state, action) => {
        //     state.loading = "succeeded";
        //     state.error = null;
        //     state.user = action.payload;
        // })
        // .addCase(getProfile.pending, (state) => {
        //     state.loading = "pending";
        //     state.error = null;
        // })
        // .addCase(getProfile.rejected, (state, action) => {
        //     state.loading = "failed";
        //     state.error = action.payload ? action.payload.message : "Login failed";
        // })

    }
});

export default authSlice.reducer;
