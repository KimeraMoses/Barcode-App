import PropTypes from 'prop-types';
import styles from './LoggedIn.module.scss';
import { Navbar } from './components/Navbar.component';

export function LoggedInLayout({ children }) {
  const { loggedIn } = styles;

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className={loggedIn}>
        <div>{children}</div>
      </div>
    </>
  );
}

LoggedInLayout.propTypes = {
  children: PropTypes.element.isRequired
};
