import { dashboardPages } from "pages";
import { Navigate, Route, Routes } from "react-router-dom";
import styles from "./LoggedIn.module.scss";
import { Navbar } from "./components/Navbar.component";
import AllAdmins from "pages/AllUsers/admins/AllAdmin.page";
import { useSelector } from "react-redux";
import AllUsers from "pages/AllUsers/AllUsers.page";

function LoggedInLayout() {
  const { loggedIn } = styles;
  const { user } = useSelector((state) => state.auth);
  const isSupperAdmin = user && user.role === "super-admin" ? true : false;
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className={loggedIn}>
        <div>
          <Routes>
            {dashboardPages.map(({ path, Component }) => {
              return <Route key={path} path={path} element={<Component />} />;
            })}
            <Route
              path="all-admins"
              element={
                isSupperAdmin ? (
                  <AllAdmins />
                ) : (
                  <Navigate to="/dashboard/onsite-users" />
                )
              }
            />
            <Route
              path="all-users"
              element={
                isSupperAdmin ? (
                  <AllUsers />
                ) : (
                  <Navigate to="/dashboard/onsite-users" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default LoggedInLayout;
