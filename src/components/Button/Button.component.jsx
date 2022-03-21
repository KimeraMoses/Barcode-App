import PropTypes from 'prop-types';
import './Button.styles.scss';

export function Button({ children, isSubmit, variant, onClick, disabled }) {
  return (
    <button
      className={`custom-button-component ${
        variant === 'secondary' ? 'custom-button-component__secondary' : ''
      }`}
      type={isSubmit ? 'submit' : 'button'}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.element.isRequired,
  isSubmit: PropTypes.bool,
  variant: PropTypes.oneOf('primary', 'secondary'),
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  isSubmit: false,
  variant: 'primary',
  onClick: () => {},
  disabled: false
};
