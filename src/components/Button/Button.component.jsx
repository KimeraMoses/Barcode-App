import './Button.styles.scss';

export function Button({ children, isSubmit, variant, onClick, disabled, customClass }) {
  return (
    <button
      className={`custom-button-component ${
        variant === 'secondary' ? 'custom-button-component__secondary' : ''
      } ${customClass}`}
      type={isSubmit ? 'submit' : 'button'}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  );
}
