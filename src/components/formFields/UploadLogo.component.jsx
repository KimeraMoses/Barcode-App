import { Field } from "formik";
import { useRef } from "react";
import { Button } from "components";
import "./UploadLogo.styles.scss";

export function UploadLogo({ name, onChange, label }) {
  const convertbase64Logo = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const inputFile = useRef(null);
  return (
    <>
      {label ? (
        <div className="custom-logo-uploader__label">{label}</div>
      ) : null}
      <Field id={name} name={name} type="file">
        {({ field: { value }, form: { setFieldValue, setFieldTouched } }) => {
          return (
            <div className="custom-logo-uploader">
              <div className="custom-logo-uploader__output">
                <img src={value} alt="logo" />
              </div>
              <input
                type="file"
                onChange={async (e) => {
                  setFieldTouched(name, true, false);
                  const Logo = await convertbase64Logo(e.target.files[0]);
                  setFieldValue(name, Logo);

                  if (onChange) onChange(e);
                }}
                style={{ display: "none" }}
                ref={inputFile}
              />
              <Button
                customClass="custom-logo-uploader__el"
                onClick={() => inputFile.current.click()}
              >
                Upload Logo
              </Button>
            </div>
          );
        }}
      </Field>
    </>
  );
}
