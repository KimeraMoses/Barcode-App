import { toast } from "react-toastify";
import { messageNotifications } from "store";
import { updateAdminDetails } from "store/Slices/authSlice";
import {
  checkUsersFail,
  checkUsersSuccess,
  createNewUserFail,
  createNewUserSuccess,
  deleteUserFail,
  deleteUserSuccess,
  editUserFail,
  editUserSuccess,
  fetchAdminsFail,
  fetchAdminsSuccess,
  fetchEnabledUsersFail,
  fetchEnabledUsersSuccess,
  fetchEventsFail,
  fetchEventsSuccess,
  fetchingUserData,
  fetchLiveCount,
  fetchOnSiteUsersSuccess,
  fetchUsersFail,
  fetchUsersSuccess,
  loadingUserData,
  uploadingFileFail,
  uploadingFileSuccess,
} from "store/Slices/usersSlice";

export const fetchAllUserEvents = (authToken) => {
  return async (dispatch) => {
    dispatch(fetchingUserData(true));
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
      dispatch(fetchingUserData(false));
    } catch (error) {
      dispatch(fetchEventsFail(error));
      dispatch(fetchingUserData(false));
    }
  };
};

export const fetchOnSiteUsers = (authToken) => {
  return async (dispatch) => {
    try {
      dispatch(fetchingUserData(true));
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
      dispatch(fetchOnSiteUsersSuccess(data.users));
      dispatch(fetchLiveCount(data.liveCount));
      dispatch(fetchingUserData(false));
    } catch (error) {
      dispatch(fetchingUserData(false));
      dispatch(fetchUsersFail(error));
    }
  };
};

export const fetchEnabledUsers = (authToken) => {
  return async (dispatch) => {
    dispatch(fetchingUserData(true));
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
      dispatch(fetchingUserData(false));
    } catch (error) {
      dispatch(fetchEnabledUsersFail(error));
      dispatch(fetchingUserData(false));
    }
  };
};

export const fetchAllUsers = (authToken) => {
  return async (dispatch) => {
    dispatch(fetchingUserData(true));
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/v1/users/`,
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
      dispatch(fetchingUserData(false));
    } catch (error) {
      dispatch(fetchingUserData(false));
      dispatch(fetchUsersFail(error));
    }
  };
};

export const fetchAllAdmins = (authToken) => {
  return async (dispatch) => {
    dispatch(fetchingUserData(true));
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
      dispatch(fetchingUserData(false));
      console.log("admin", data);
    } catch (error) {
      console.log("admin", error);
      dispatch(fetchingUserData(false));
      dispatch(fetchAdminsFail(error));
    }
  };
};

export const editUserDetails =
  (userId, authToken, full_name, email, company, status) =>
  async (dispatch) => {
    dispatch(loadingUserData(true));
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
      dispatch(fetchAllUsers(authToken));
      dispatch(loadingUserData(false));
    } catch (error) {
      dispatch(editUserFail(error));
      dispatch(loadingUserData(false));
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
    dispatch(loadingUserData(true));
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
      dispatch(loadingUserData(false));
      dispatch(editUserSuccess(res));
      dispatch(
        isLoggedIn ? updateAdminDetails(res.admin) : fetchAllAdmins(authToken)
      );
      if (isLoggedIn) {
        localStorage.setItem("Barcode__CurrentUser", JSON.stringify(res.admin));
      }
    } catch (error) {
      dispatch(editUserFail(error));
      dispatch(loadingUserData(false));
    }
  };

export const createNewUser =
  (authToken, full_name, email, company, status, welcome_email_message) =>
  async (dispatch) => {
    try {
      dispatch(loadingUserData(true));
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
      dispatch(loadingUserData(false));
      if (res?.status === "fail" && res?.message?.includes(email)) {
        toast.error(
          "Failed to create user, Email Already taken!",
          messageNotifications
        );
        return;
      } else {
        toast.success("New user created successfuly", messageNotifications);
        dispatch(createNewUserSuccess(res));
        dispatch(fetchAllUsers(authToken));
      }
    } catch (error) {
      dispatch(createNewUserFail(error));
      toast.error("Failed to create user!");
      dispatch(loadingUserData(false));
    }
  };

export const createNewAdmin =
  (authToken, full_name, username, password, email, status, role, timezone) =>
  async (dispatch) => {
    try {
      dispatch(loadingUserData(true));
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
      if (res?.status === "fail" && res?.message?.includes("already in use")) {
        return toast.error(
          "Failed to create admin, Email Already taken!",
          messageNotifications
        );
      } else {
        toast.success("New admin created successfuly", messageNotifications);
        dispatch(createNewUserSuccess(res));
        dispatch(fetchAllAdmins(authToken));
        dispatch(loadingUserData(false));
      }
    } catch (error) {
      dispatch(createNewUserFail(error));
      toast.error("Failed to create user!");
      dispatch(loadingUserData(false));
    }
  };

export const deleteUser = (userId, authToken, isAdmin) => async (dispatch) => {
  dispatch(loadingUserData(true));
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
    dispatch(isAdmin ? fetchAllAdmins(authToken) : fetchAllUsers(authToken));
    dispatch(loadingUserData(false));
  } catch (error) {
    dispatch(deleteUserFail(error));
    dispatch(loadingUserData(false));
  }
};

export const uploadFile = (file, authToken) => {
  return async (dispatch) => {
    dispatch(loadingUserData(true));
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
      dispatch(loadingUserData(false));
    }
    const res = await response.json();
    dispatch(uploadingFileSuccess(res));
    dispatch(loadingUserData(false));
  };
};

export const checkInUsers =
  (user_ids, authToken, checkIn) => async (dispatch) => {
    dispatch(loadingUserData(true));
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
      dispatch(loadingUserData(false));
    } catch (error) {
      dispatch(checkUsersFail(error));
      dispatch(loadingUserData(false));
    }
  };
