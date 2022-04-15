import { Field } from "formik";
import "./Input.styles.scss";

export function Input({
  name,
  type,
  placeholder,
  customClass,
  errors,
  touched,
  label,
  disabled,
}) {
  const invalid = errors?.[name] && touched?.[name];
  return (
    <div className="custom-input">
      {label ? <div className="custom-input__label">{label}</div> : null}
      <Field
        disabled={disabled}
        id={name}
        name={name}
        type={type || "text"}
        placeholder={placeholder}
        className={`custom-input__el ${
          invalid ? "custom-input__el-invalid" : ""
        } ${customClass}`}
      />
      <p
        className={`custom-input__error ${
          invalid ? "custom-input__error-show" : ""
        }`}
      >
        {errors?.[name] || "Error"}
      </p>
    </div>
  );
}
