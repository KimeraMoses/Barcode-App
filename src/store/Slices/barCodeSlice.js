import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  barCodeList: [],
  barCodeDetails: {},
  isLoading: false,
  message: "",
  status: "",
};
const barCodeSlice = createSlice({
  name: "barCode",
  initialState,
  reducers: {
    fetchBarCodesPending: (state) => {
      state.isLoading = true;
    },
    fetchBarCodesSuccess: (state, { payload }) => {
      state.barCodeList = payload;
      state.status = payload.status;
      state.isLoading = false;
    },
    fetchBarCodesFail: (state, { payload }) => {
      state.message = payload.message;
      state.status = payload.status;
      state.isLoading = false;
    },
    fetchBarCodepending: (state) => {
      state.isLoading = true;
    },
    fetchBarCodeSuccess: (state, action) => {
      state.BarCodeDetails = action.payload;
      state.isLoading = false;
      state.message = "";
    },
    fetchBarCodeFail: (state, { payload }) => {
      state.message = payload.message;
      state.status = payload.status;
      state.isLoading = false;
    },
    createBarCodePending: (state) => {
      state.isLoading = true;
    },
    createBarCodeSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    createBarCodeFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    deleteBarCodePending: (state) => {
      state.isLoading = true;
    },
    deleteBarCodeSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload.message;
    },
    deleteBarCodeFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload.message;
    },
    editBarCodePending: (state) => {
      state.isLoading = true;
    },
    editBarCodeSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    editBarCodeFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
  },
});

const { reducer, actions } = barCodeSlice;

export const {
  fetchBarCodesPending,
  fetchBarCodesSuccess,
  fetchBarCodesFail,
  fetchBarCodepending,
  fetchBarCodeSuccess,
  fetchBarCodeFail,
  deleteBarCodePending,
  deleteBarCodeSuccess,
  deleteBarCodeFail,
  editBarCodePending,
  editBarCodeSuccess,
  editBarCodeFail,
} = actions;
export default reducer;
