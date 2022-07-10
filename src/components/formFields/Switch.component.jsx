import { Switch as AntdSwitch } from 'antd';
import { Field } from 'formik';
import './Switch.styles.scss';

export function Switch({
  name,
  placeholder,
  customClass,
  errors,
  touched,
  onChange,
}) {
  const invalid = errors?.[name] && touched?.[name];
  return (
    <div>
      <div className={`custom-switch ${customClass}`}>
        <div className="custom-switch__label">{placeholder}</div>
        <Field
          id={name}
          name={name}
          type="checkbox"
          className={`custom-switch__el ${
            invalid ? 'custom-switch__el-invalid' : ''
          }`}
        >
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
      {invalid ? (
        <div className="custom-switch__error">{errors[name]}</div>
      ) : (
        <></>
      )}
    </div>
  );
}
