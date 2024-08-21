import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    cookieExpired: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInOrUpdateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
        },
        deleteOrSignOutUser: (state) => {
            state.currentUser = null;
        },
        cookieExpired: (state) => {
            state.currentUser = null;
            state.cookieExpired = true;
        },
        resetCookieExpired: (state) => {
            state.cookieExpired = false;
        },
    },
});

export const {
    signInOrUpdateUserSuccess,
    deleteOrSignOutUser,
    cookieExpired,
    resetCookieExpired,
} = userSlice.actions;

export default userSlice.reducer;
