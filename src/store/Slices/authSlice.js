import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: null,
  isLoggedIn: false,
  status: "",
  message: null,
  updateStatus: "",
  isLoading: false,
};

export const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    autoAuthenticationSuccess(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = !!state.token;
      state.isLoading = false;
    },
    authenticationPending(state) {
      state.isLoading = true;
    },
    authenticationSuccess(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = !!state.token;
      state.isLoading = false;
    },

    authenticationFail(state, { payload }) {
      state.isLoading = false;
      state.message = payload;
    },
    updateAdminDetails(state, { payload }) {
      state.user = payload;
    },
    resetPasswordPending(state) {
      state.isLoading = true;
    },
    resetPasswordSuccess(state, { payload }) {
      state.isLoading = false;
      state.message = payload.massage;
      state.status = payload.status;
    },
    resetPasswordFail(state) {
      state.isLoading = false;
    },
    forgotPasswordPending(state) {
      state.isLoading = true;
    },
    forgotPasswordSuccess(state, { payload }) {
      state.isLoading = false;
      state.message = payload.message;
      state.status = payload.status;
    },
    forgotPasswordFail(state, { payload }) {
      state.isLoading = false;
      state.message = payload.message;
      state.status = payload.status;
    },
    logout(state) {
      console.log("Log out clicked");
      state.user = {};
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("Barcode__AuthToken");
      localStorage.removeItem("Barcode__CurrentUser");
    },
  },
});
const { reducer, actions } = authSlice;

export const {
  autoAuthenticationSuccess,
  authenticationPending,
  authenticationSuccess,
  authenticationFail,
  verificationPending,
  verificationSuccess,
  verificationFail,
  updateProfilePending,
  updateProfileSuccess,
  updateProfileFail,
  updateAdminDetails,
  resetPasswordPending,
  resetPasswordSuccess,
  resetPasswordFail,
  forgotPasswordPending,
  forgotPasswordSuccess,
  forgotPasswordFail,
  logout,
} = actions;

export default reducer;
