import PropTypes from 'prop-types';
import './Heading.styles.scss';

export function Heading({ children }) {
  return <h1 className="custom-heading">{children}</h1>;
}

Heading.propTypes = {
  children: PropTypes.string.isRequired
};
