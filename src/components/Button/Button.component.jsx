import PropTypes from 'prop-types';
import './Button.styles.scss';

export function Button({ children, isSubmit, variant }) {
  return (
    <button
      className={`custom-button-component ${
        variant === 'secondary' ? 'custom-button-component__secondary' : ''
      }`}
      type={isSubmit ? 'submit' : 'button'}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.element.isRequired,
  isSubmit: PropTypes.bool,
  variant: PropTypes.oneOf('primary', 'secondary')
};

Button.defaultProps = {
  isSubmit: false,
  variant: 'primary'
};
