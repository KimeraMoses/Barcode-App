import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  webSettings: {},
  appSettings: {},
  generalSettings: {},
  isLoading: false,
  message: "",
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    fetchWebSettingPending: (state) => {
      state.isLoading = true;
    },
    fetchWebSettingSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.webSettings = payload;
    },
    fetchWebSettingFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    updateWebSettingsPending: (state, { payload }) => {
      state.isLoading = true;
    },
    updateWebSettingsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.generalSettings = payload;
    },
    updateWebSettingsFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    fetchAppSettingPending: (state) => {
      state.isLoading = true;
    },
    fetchAppSettingSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.appSettings = payload;
    },
    fetchAppSettingFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
  },
});

const { reducer, actions } = settingSlice;

export const {
  fetchWebSettingPending,
  fetchWebSettingSuccess,
  fetchWebSettingFail,
  updateWebSettingsPending,
  updateWebSettingsSuccess,
  updateWebSettingsFail,
  fetchAppSettingPending,
  fetchAppSettingSuccess,
  fetchAppSettingFail,
} = actions;

export default reducer;
