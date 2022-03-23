import { Switch as AntdSwitch } from 'antd';
import { Field } from 'formik';
import './Switch.styles.scss';

export function Switch({ name, placeholder, customClass, errors, touched, onChange }) {
  const invalid = errors?.[name] && touched?.[name];
  return (
    <div>
      <div className="custom-switch">
        <div className="custom-switch__label">{placeholder}</div>
        <Field
          id={name}
          name={name}
          type="checkbox"
          className={`custom-switch__el ${
            invalid ? 'custom-switch__el-invalid' : ''
          } ${customClass}`}>
          {({ field: { value }, form: { setFieldValue, setFieldTouched } }) => {
            return (
              <AntdSwitch
                checked={value}
                onChange={(checked, event) => {
                  setFieldValue(name, checked);
                  setFieldTouched(name, true, false);
                  if (onChange) onChange(checked, event);
                }}
              />
            );
          }}
        </Field>
      </div>
      <div className="custom-switch__error">{errors[name] || 'Error'}</div>
    </div>
  );
}
