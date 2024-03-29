import { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LoggedInLayout } from "layout";
import "react-toastify/dist/ReactToastify.css";
import "./lang/i18n";
import Login from "pages/Login/Login.page";
import { useDispatch, useSelector } from "react-redux";
import { AutoAuthenticate } from "store/Actions/authActions";
import {
  fetchAppSiteSetting,
  fetchWebSiteSetting,
} from "store/Actions/siteSettingActions";
import ForgotPassword from "pages/Password/ForgotPassword.page";
import ResetPassword from "pages/Password/ResetPassword.page";
import Spinner from "./components/Spinner/Spinner";

function App() {
  const { webSettings } = useSelector((state) => state.settings);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAuth = !!JSON.parse(localStorage.getItem("Barcode__AuthToken"))
    ?.token;

  const dispatch = useDispatch();

  const isAuthenticated = isAuth || isLoggedIn;

  useEffect(() => {
    AutoAuthenticate(dispatch);
    dispatch(fetchWebSiteSetting());
    dispatch(fetchAppSiteSetting());
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <div>
          <Spinner />
        </div>
      }
    >
      <ToastContainer />
      <Helmet>
        <title>
          {`${
            webSettings && webSettings.site_name
              ? webSettings.site_name
              : "Loading..."
          } `}
          {" | "}
          Admin
        </title>
      </Helmet>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              !isAuthenticated ? (
                <Login />
              ) : (
                <Navigate to="/dashboard/onsite-users" />
              )
            }
          />
          <Route
            path="/forgot-password"
            element={
              !isAuthenticated ? (
                <ForgotPassword />
              ) : (
                <Navigate to="/dashboard/onsite-users" />
              )
            }
          />
          <Route
            path="/reset-password/:resetToken"
            element={
              !isAuthenticated ? (
                <ResetPassword />
              ) : (
                <Navigate to="/dashboard/onsite-users" />
              )
            }
          />
          <Route
            path="/dashboard/*"
            element={isAuthenticated ? <LoggedInLayout /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
