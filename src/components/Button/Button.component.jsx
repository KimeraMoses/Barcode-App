import { useSelector } from 'react-redux';
import './Button.styles.scss';

export function Button({ children, isSubmit, variant, onClick, disabled, customClass }) {
  const { primaryColor } = useSelector((state) => state.theme);
  const primaryStyles = {
    background: primaryColor,
    color: 'white',
    border: `1px solid ${primaryColor}`
  };
  const secondaryStyles = {
    background: '#fff',
    color: primaryColor,
    border: `1px solid ${primaryColor}`
  };
  return (
    <button
      className={`custom-button-component ${
        variant === 'secondary' ? 'custom-button-component__secondary' : ''
      } ${customClass}`}
      style={variant === 'secondary' ? secondaryStyles : primaryStyles}
      type={isSubmit ? 'submit' : 'button'}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  );
}
