import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./Slices/themeSlice";
import authReducer from "./Slices/authSlice";
import usersReducer from "./Slices/usersSlice";
import barCodeReducer from "./Slices/barCodeSlice";
import settingSlice from "./Slices/siteSettingSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    users: usersReducer,
    barCode: barCodeReducer,
    settings: settingSlice,
  },
});

export default store;

export const messageNotifications = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
