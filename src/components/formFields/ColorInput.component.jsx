import { Field } from "formik";
import { useState } from "react";
import { ChromePicker } from "react-color";
import "./ColorInput.styles.scss";

const popover = {
  position: "absolute",
  zIndex: "2",
};
const cover = {
  position: "fixed",
  top: "0px",
  right: "0px",
  bottom: "0px",
  left: "0px",
};

export function ColorInput({
  name,
  type,
  placeholder,
  customClass,
  errors,
  touched,
  label,
  onChange,
}) {
  const invalid = errors?.[name] && touched?.[name];

  const [displayColorPicker, setDisplayColorPicker] = useState("");
  return (
    <div className="custom-color-input">
      {label ? <div className="custom-color-input__label">{label}</div> : null}
      <Field id={name} name={name}>
        {({ field: { value }, form: { setFieldValue, setFieldTouched } }) => {
          return (
            <div
              className={`custom-color-input__el ${
                invalid ? "custom-color-input__el-invalid" : ""
              } ${customClass}`}
            >
              <input
                type={type || "text"}
                placeholder={placeholder}
                value={value}
                readOnly
              />
              <div
                style={{
                  borderRadius: "50%",
                  background: value,
                  width: "21px",
                  height: "21px",
                  cursor: "pointer",
                }}
                onClick={() => setDisplayColorPicker(!displayColorPicker)}
                role="button"
                tabIndex={0}
                onKeyDown={() => setDisplayColorPicker(!displayColorPicker)}
              >
                {/* Label */}
              </div>
              {displayColorPicker ? (
                <div style={popover}>
                  <div
                    style={cover}
                    onClick={() => setDisplayColorPicker(false)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => setDisplayColorPicker(!displayColorPicker)}
                  >
                    {/* Label */}
                  </div>
                  <ChromePicker
                    color={value}
                    onChange={(color) => {
                      setFieldValue(name, color?.hex);
                      setFieldTouched(name, true, false);
                      if (onChange) onChange(color);
                    }}
                  />
                </div>
              ) : null}
            </div>
          );
        }}
      </Field>
      <p
        className={`custom-color-input__error ${
          invalid ? "custom-color-input__error-show" : ""
        }`}
      >
        {errors?.[name] || "Error"}
      </p>
    </div>
  );
}
