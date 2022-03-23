import { Field } from 'formik';
import './ColorInput.styles.scss';

export function ColorInput({
  name,
  type,
  placeholder,
  customClass,
  errors,
  touched,
  label,
  onChange
}) {
  const invalid = errors?.[name] && touched?.[name];
  return (
    <div className="custom-color-input">
      {label ? <div className="custom-color-input__label">{label}</div> : null}
      <Field id={name} name={name}>
        {({ field: { value }, form: { setFieldValue, setFieldTouched } }) => {
          return (
            <div
              className={`custom-color-input__el ${
                invalid ? 'custom-color-input__el-invalid' : ''
              } ${customClass}`}>
              <input
                type={type || 'text'}
                placeholder={placeholder}
                value={value}
                onChange={(event) => {
                  setFieldValue(name, event.target.value);
                  setFieldTouched(name, true, false);
                  if (onChange) onChange(event);
                }}
              />
              <div
                style={{ borderRadius: '50%', background: value, width: '21px', height: '21px' }}
              />
            </div>
          );
        }}
      </Field>
      <p className={`custom-color-input__error ${invalid ? 'custom-color-input__error-show' : ''}`}>
        {errors?.[name] || 'Error'}
      </p>
    </div>
  );
}
