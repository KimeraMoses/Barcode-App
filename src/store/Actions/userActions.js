import { updateAdminDetails } from "store/Slices/authSlice";
import {
  checkUsersFail,
  checkUsersPending,
  checkUsersSuccess,
  createNewUserFail,
  createNewUserPending,
  createNewUserSuccess,
  deleteUserFail,
  deleteUserPending,
  deleteUserSuccess,
  editUserFail,
  editUserPending,
  editUserSuccess,
  fetchAdminsFail,
  fetchAdminsPending,
  fetchAdminsSuccess,
  fetchEnabledUsersFail,
  fetchEnabledUsersPending,
  fetchEnabledUsersSuccess,
  fetchEventsFail,
  fetchEventsPending,
  fetchEventsSuccess,
  fetchLiveCount,
  fetchUsersFail,
  fetchUsersPending,
  fetchUsersSuccess,
  uploadingFileFail,
  uploadingFilePending,
  uploadingFileSuccess,
} from "store/Slices/usersSlice";

export const fetchAllUserEvents = (authToken) => {
  return async (dispatch) => {
    dispatch(fetchEventsPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/v1/users/userEvents`,
        {
          method: "GET",
          headers: new Headers({
            "Content-type": "application/json",
            Authorization: "Bearer " + authToken,
            apiKey: process.env.REACT_APP_APIKEY,
          }),
        }
      );
      const res = await response.json();
      dispatch(fetchEventsSuccess(res?.data));
    } catch (error) {
      dispatch(fetchEventsFail(error));
    }
  };
};

export const fetchOnSiteUsers = (authToken) => {
  return async (dispatch) => {
    dispatch(fetchUsersPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/v1/users/getStats`,
        {
          method: "GET",
          headers: new Headers({
            "Content-type": "application/json",
            Authorization: "Bearer " + authToken,
            apiKey: process.env.REACT_APP_APIKEY,
          }),
        }
      );
      const data = await response.json();
      dispatch(fetchUsersSuccess(data.users));
      dispatch(fetchLiveCount(data.liveCount));
    } catch (error) {
      dispatch(fetchUsersFail(error));
    }
  };
};

export const fetchEnabledUsers = (authToken) => {
  return async (dispatch) => {
    dispatch(fetchEnabledUsersPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/v1/users/getEnabledUsers`,
        {
          method: "GET",
          headers: new Headers({
            "Content-type": "application/json",
            Authorization: "Bearer " + authToken,
            apiKey: process.env.REACT_APP_APIKEY,
          }),
        }
      );
      const data = await response.json();
      dispatch(fetchEnabledUsersSuccess(data?.users));
      // console.log("users", data?.users);
    } catch (error) {
      dispatch(fetchEnabledUsersFail(error));
      // console.log(error);
    }
  };
};

export const fetchAllAdmins = (authToken) => {
  return async (dispatch) => {
    dispatch(fetchAdminsPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/v1/admin/`,
        {
          method: "GET",
          headers: new Headers({
            "Content-type": "application/json",
            Authorization: "Bearer " + authToken,
            apiKey: process.env.REACT_APP_APIKEY,
          }),
        }
      );
      const data = await response.json();
      dispatch(fetchAdminsSuccess(data.admins));
    } catch (error) {
      dispatch(fetchAdminsFail(error));
    }
  };
};

export const editUserDetails =
  (userId, authToken, full_name, email, company, status) =>
  async (dispatch) => {
    dispatch(editUserPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/v1/users/${userId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            full_name,
            email,
            company,
            status,
          }),
          headers: new Headers({
            "Content-type": "application/json",
            apiKey: process.env.REACT_APP_APIKEY,
            Authorization: "Bearer " + authToken,
          }),
        }
      );
      const res = await response.json();
      dispatch(editUserSuccess(res));
      dispatch(fetchOnSiteUsers(authToken));
    } catch (error) {
      dispatch(editUserFail(error));
    }
  };

export const editAdminDetails =
  (
    userId,
    authToken,
    full_name,
    username,
    email,
    status,
    role,
    timezone,
    isLoggedIn
  ) =>
  async (dispatch) => {
    dispatch(editUserPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/v1/admin/${userId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            full_name,
            username,
            email,
            status,
            role,
            timezone,
          }),
          headers: new Headers({
            "Content-type": "application/json",
            apiKey: process.env.REACT_APP_APIKEY,
            Authorization: "Bearer " + authToken,
          }),
        }
      );
      const res = await response.json();
      dispatch(editUserSuccess(res));
      dispatch(
        isLoggedIn ? updateAdminDetails(res.admin) : fetchAllAdmins(authToken)
      );
      if (isLoggedIn) {
        localStorage.setItem("Barcode__CurrentUser", JSON.stringify(res.admin));
      }
    } catch (error) {
      dispatch(editUserFail(error));
    }
  };

export const createNewUser =
  (authToken, full_name, email, company, status, welcome_email_message) =>
  async (dispatch) => {
    dispatch(createNewUserPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/v1/users/`,
        {
          method: "POST",
          body: JSON.stringify({
            full_name,
            email,
            company,
            status,
            welcome_email_message,
          }),
          headers: new Headers({
            "Content-type": "application/json",
            apiKey: process.env.REACT_APP_APIKEY,
            Authorization: "Bearer " + authToken,
          }),
        }
      );
      const res = await response.json();
      dispatch(createNewUserSuccess(res));
      dispatch(fetchOnSiteUsers(authToken));
    } catch (error) {
      dispatch(createNewUserFail(error));
    }
  };

export const createNewAdmin =
  (authToken, full_name, username, password, email, status, role, timezone) =>
  async (dispatch) => {
    dispatch(createNewUserPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/v1/admin/signup`,
        {
          method: "POST",
          body: JSON.stringify({
            full_name,
            username,
            email,
            password,
            status,
            role,
            timezone,
          }),
          headers: new Headers({
            "Content-type": "application/json",
            apiKey: process.env.REACT_APP_APIKEY,
            Authorization: "Bearer " + authToken,
          }),
        }
      );
      const res = await response.json();
      dispatch(createNewUserSuccess(res));
      dispatch(fetchAllAdmins(authToken));
    } catch (error) {
      dispatch(createNewUserFail(error));
    }
  };

export const deleteUser = (userId, authToken, isAdmin) => async (dispatch) => {
  dispatch(deleteUserPending());
  const path = `${isAdmin ? "/api/v1/admin/" : "/api/v1/users/"}`;
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}${path}${userId}`,
      {
        method: "DELETE",
        headers: new Headers({
          apiKey: process.env.REACT_APP_APIKEY,
          Authorization: "Bearer " + authToken,
        }),
      }
    );
    dispatch(deleteUserSuccess(`Success ${response.statusText}`));
    dispatch(isAdmin ? fetchAllAdmins(authToken) : fetchOnSiteUsers(authToken));
  } catch (error) {
    dispatch(deleteUserFail(error));
  }
};

export const uploadFile = (file, authToken) => {
  return async (dispatch) => {
    dispatch(uploadingFilePending());
    const data = new FormData();
    data.append("file", file);

    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/v1/users/uploadCSV`,
      {
        method: "POST",
        body: data,
        headers: new Headers({
          apiKey: process.env.REACT_APP_APIKEY,
          Authorization: "Bearer " + authToken,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      dispatch(uploadingFileFail(error));
    }
    const res = await response.json();
    dispatch(uploadingFileSuccess(res));
  };
};

export const checkInUsers =
  (user_ids, authToken, checkIn) => async (dispatch) => {
    dispatch(checkUsersPending());
    const path = `${
      checkIn
        ? "/api/v1/checkIn/manuallyCheckInUsers"
        : "/api/v1/checkOut/manuallyCheckoutUsers"
    }`;
    try {
      const response = await fetch(`${process.env.REACT_APP_BASEURL}${path}`, {
        method: "POST",
        body: JSON.stringify({
          user_ids,
        }),
        headers: new Headers({
          "Content-type": "application/json",
          apiKey: process.env.REACT_APP_APIKEY,
          Authorization: "Bearer " + authToken,
        }),
      });
      const res = await response.json();
      dispatch(checkUsersSuccess(res));
      dispatch(fetchOnSiteUsers(authToken));
      dispatch(fetchEnabledUsers(authToken));
    } catch (error) {
      dispatch(checkUsersFail(error));
    }
  };
