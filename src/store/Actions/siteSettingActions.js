import {
  fetchAppSettingFail,
  fetchAppSettingPending,
  fetchAppSettingSuccess,
  fetchWebSettingFail,
  fetchWebSettingPending,
  fetchWebSettingSuccess,
  updateWebSettingsFail,
  updateWebSettingsPending,
  updateWebSettingsSuccess,
} from "store/Slices/siteSettingSlice";
import { setPrimaryColor, setSecondaryColor } from "store/Slices/themeSlice";

export const fetchWebSiteSetting = () => {
  return async (dispatch) => {
    dispatch(fetchWebSettingPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/v1/admin-settings/getWebAppSettings`,
        {
          method: "GET",
          headers: new Headers({
            apiKey: process.env.REACT_APP_APIKEY,
          }),
        }
      );
      const data = await response.json();
      dispatch(fetchWebSettingSuccess(data.setting));
      dispatch(setPrimaryColor(data.setting.site_primary_color));
      dispatch(setSecondaryColor(data.setting.site_secondary_color));
    } catch (error) {
      dispatch(fetchWebSettingFail(error));
    }
  };
};
export const fetchAppSiteSetting = () => {
  return async (dispatch) => {
    dispatch(fetchAppSettingPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/v1/admin-settings/getMobileAppSettings`,
        {
          method: "GET",
          headers: new Headers({
            apiKey: process.env.REACT_APP_APIKEY,
          }),
        }
      );
      const data = await response.json();
      dispatch(fetchAppSettingSuccess(data.setting));
    } catch (error) {
      dispatch(fetchAppSettingFail(error));
    }
  };
};

export const editSiteSettings =
  (
    settingId,
    site_name,
    site_logo,
    site_primary_color,
    site_secondary_color,
    authToken
  ) =>
  async (dispatch) => {
    dispatch(updateWebSettingsPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/v1/admin-settings/${settingId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            site_name,
            site_logo,
            site_primary_color,
            site_secondary_color,
          }),
          headers: new Headers({
            "Content-type": "application/json",
            apiKey: process.env.REACT_APP_APIKEY,
            Authorization: "Bearer " + authToken,
          }),
        }
      );
      const res = await response.json();
      dispatch(updateWebSettingsSuccess(res.setting));
      dispatch(fetchWebSiteSetting());
      dispatch(setPrimaryColor(res.setting.site_primary_color));
      dispatch(setSecondaryColor(res.setting.site_secondary_color));
    } catch (error) {
      dispatch(updateWebSettingsFail(error));
    }
  };

export const editColorSettings =
  (settingId, site_primary_color, site_secondary_color, authToken) =>
  async (dispatch) => {
    dispatch(updateWebSettingsPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/v1/admin-settings/${settingId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            site_primary_color,
            site_secondary_color,
          }),
          headers: new Headers({
            "Content-type": "application/json",
            apiKey: process.env.REACT_APP_APIKEY,
            Authorization: "Bearer " + authToken,
          }),
        }
      );
      const res = await response.json();
      dispatch(updateWebSettingsSuccess(res.setting));
      dispatch(fetchWebSiteSetting());
      dispatch(setPrimaryColor(res.setting.site_primary_color));
      dispatch(setSecondaryColor(res.setting.site_secondary_color));
    } catch (error) {
      dispatch(updateWebSettingsFail(error));
    }
  };

export const editAppSettings =
  (
    seetingId,
    app_name,
    app_logo,
    app_primary_color,
    app_secondary_color,
<<<<<<< HEAD
    home_page_message,
=======
>>>>>>> 95c6faca11ddbdf6e91355e28c06fd1e56331726
    authToken
  ) =>
  async (dispatch) => {
    dispatch(updateWebSettingsPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/v1/admin-settings/${seetingId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            app_name,
            app_logo,
            app_primary_color,
            app_secondary_color,
<<<<<<< HEAD
            home_page_message,
=======
>>>>>>> 95c6faca11ddbdf6e91355e28c06fd1e56331726
          }),
          headers: new Headers({
            "Content-type": "application/json",
            apiKey: process.env.REACT_APP_APIKEY,
            Authorization: "Bearer " + authToken,
          }),
        }
      );
      const res = await response.json();
      dispatch(updateWebSettingsSuccess(res.setting));
      dispatch(fetchAppSiteSetting());
<<<<<<< HEAD
=======
      dispatch(setPrimaryColor(res.setting.site_primary_color));
      dispatch(setSecondaryColor(res.setting.site_secondary_color));
>>>>>>> 95c6faca11ddbdf6e91355e28c06fd1e56331726
    } catch (error) {
      dispatch(updateWebSettingsFail(error));
    }
  };
