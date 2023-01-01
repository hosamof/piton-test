import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

export interface AuthState {
    loggedIn: boolean;
    token: string;
    user: string;
}

const initialState: AuthState = {
    loggedIn: false,
    token: '',
    user: '',
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthState(state, action) {
            state.loggedIn = action.payload.loggedIn;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            console.log("HYDRATE", action.payload);
            return {
                ...state,
                ...action.payload.auth,
            };
        },
    },
});

export const { setAuthState } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;

export default authSlice.reducer;