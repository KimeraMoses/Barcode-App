import { dashboardPages } from 'pages';
import { Route, Routes } from 'react-router-dom';
import styles from './LoggedIn.module.scss';
import { Navbar } from './components/Navbar.component';

function LoggedInLayout() {
  const { loggedIn } = styles;

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
          </Routes>
        </div>
      </div>
    </>
  );
}

export default LoggedInLayout;
