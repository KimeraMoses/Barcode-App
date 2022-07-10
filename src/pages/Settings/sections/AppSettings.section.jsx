import { Input, ColorInput, UploadLogo, Button } from "components";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import "./AppSettings.styles.scss";
import { useState } from "react";
import { editAppSettings } from "store/Actions/siteSettingActions";
import { messageNotifications } from "store";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  defaultAppName: Yup.string().required("Required"),
  homeMessage: Yup.string().required("Required"),
  logo: Yup.string().required("Required"),
  primaryColor: Yup.string().required("Required"),
  secondaryColor: Yup.string().required("Required"),
});

export function AppSettings() {
  const authToken = useSelector((state) => state.auth.token);
  const { appSettings } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="app-settings">
      <h2 className="app-settings__heading">App Settings</h2>

      <Formik
        enableReinitialize
        initialValues={{
          primaryColor: appSettings?.app_primary_color,
          secondaryColor: appSettings?.app_secondary_color,
          defaultAppName: appSettings?.app_name,
          homeMessage: appSettings?.home_page_message,
          logo: appSettings?.app_logo,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setIsLoading(true);
          try {
            await dispatch(
              editAppSettings(
                appSettings.id,
                values.defaultAppName,
                values.logo,
                values.primaryColor,
                values.secondaryColor,
                values.homeMessage,
                authToken
              )
            );
            setIsLoading(false);
            toast.success(`Changes Saved successfully`, {
              ...messageNotifications,
            });
          } catch (error) {
            setIsLoading(false);
            toast.error(`Failed Save Changes!`, {
              ...messageNotifications,
            });
          }
        }}
      >
        {({ touched, errors }) => {
          return (
            <Form className="app-settings__form">
              <Input
                name="defaultAppName"
                touched={touched}
                errors={errors}
                label="App Name"
              />
              <Input
                name="homeMessage"
                touched={touched}
                errors={errors}
                label="Home Message"
              />
              <UploadLogo
                name="logo"
                touched={touched}
                errors={errors}
                label="Logo"
              />
              <ColorInput
                name="primaryColor"
                touched={touched}
                errors={errors}
                label="Primary Color"
              />
              <ColorInput
                name="secondaryColor"
                touched={touched}
                errors={errors}
                label="Secondary Color"
              />
              <Button
                isSubmit
                variant="secondary"
                customClass="app-settings__submit-btn"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
