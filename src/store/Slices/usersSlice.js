import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  onSiteUsers: [],
  enbaledUsers: [],
  adminList: [],
  userEvents: [],
  userDetails: {},
  isLoading: false,
  isFetching: false,
  liveCount: 5,
  message: "",
  status: "",
};
const userSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    fetchingUserData: (state, { payload }) => {
      state.isFetching = payload;
    },
    loadingUserData: (state, { payload }) => {
      state.isLoading = payload;
    },
    fetchUsersPending: (state) => {
      state.isLoading = true;
    },
    fetchUsersSuccess: (state, { payload }) => {
      state.userList = payload;
      state.status = payload?.status;
      state.isLoading = false;
    },
    fetchUsersFail: (state, { payload }) => {
      state.message = payload?.message;
      state.status = payload?.status;
      state.isLoading = false;
    },
    fetchOnSiteUsersSuccess: (state, { payload }) => {
      state.onSiteUsers = payload;
      state.status = payload?.status;
      state.isLoading = false;
    },
    fetchEnabledUsersPending: (state) => {
      state.isLoading = true;
    },
    fetchEnabledUsersSuccess: (state, { payload }) => {
      state.enbaledUsers = payload;
      state.status = payload?.status;
      state.isLoading = false;
    },
    fetchEnabledUsersFail: (state, { payload }) => {
      state.message = payload?.message;
      state.status = payload?.status;
      state.isLoading = false;
    },
    fetchEventsPending: (state) => {
      state.isLoading = true;
    },
    fetchEventsSuccess: (state, { payload }) => {
      state.userEvents = payload;
      state.status = payload?.status;
      state.isLoading = false;
    },
    fetchEventsFail: (state, { payload }) => {
      state.message = payload?.message;
      state.status = payload?.status;
      state.isLoading = false;
    },
    fetchAdminsPending: (state) => {
      state.isLoading = true;
    },
    fetchAdminsSuccess: (state, { payload }) => {
      state.adminList = payload;
      state.status = payload?.status;
      state.isLoading = false;
    },
    fetchAdminsFail: (state, { payload }) => {
      state.message = payload?.message;
      state.status = payload?.status;
      state.isLoading = false;
    },
    fetchUserpending: (state) => {
      state.isLoading = true;
    },
    fetchUserSuccess: (state, action) => {
      state.userDetails = action.payload;
      state.isLoading = false;
      state.message = "";
    },
    fetchUserFail: (state, { payload }) => {
      state.message = payload?.message;
      state.status = payload?.status;
      state.isLoading = false;
    },
    fetchLiveCount: (state, { payload }) => {
      state.liveCount = payload;
    },
    createNewUserPending: (state) => {
      state.isLoading = true;
    },
    createNewUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    createNewUserFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    deleteUserPending: (state) => {
      state.isLoading = true;
    },
    deleteUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload?.message;
    },
    deleteUserFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload?.message;
    },
    editUserPending: (state) => {
      state.isLoading = true;
    },
    editUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    editUserFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    uploadingFilePending: (state) => {
      state.isLoading = true;
    },
    uploadingFileSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    uploadingFileFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    checkUsersPending: (state) => {
      state.isLoading = true;
    },
    checkUsersSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    checkUsersFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
  },
});

const { reducer, actions } = userSlice;

export const {
  fetchingUserData,
  loadingUserData,
  fetchUsersPending,
  fetchUsersSuccess,
  fetchUsersFail,
  fetchOnSiteUsersSuccess,
  fetchAdminsPending,
  fetchAdminsSuccess,
  fetchAdminsFail,
  fetchUserpending,
  fetchUserSuccess,
  fetchUserFail,
  fetchLiveCount,
  createNewUserPending,
  createNewUserSuccess,
  createNewUserFail,
  deleteUserPending,
  deleteUserSuccess,
  deleteUserFail,
  editUserPending,
  editUserSuccess,
  editUserFail,
  uploadingFilePending,
  uploadingFileSuccess,
  uploadingFileFail,
  checkUsersPending,
  checkUsersSuccess,
  checkUsersFail,
  fetchEventsPending,
  fetchEventsSuccess,
  fetchEventsFail,
  fetchEnabledUsersPending,
  fetchEnabledUsersSuccess,
  fetchEnabledUsersFail,
} = actions;
export default reducer;
