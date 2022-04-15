import { ColorInput, Button } from "components";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import "./ColorSettings.styles.scss";
import { useState } from "react";
import { editColorSettings } from "store/Actions/siteSettingActions";
import { messageNotifications } from "store";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  primaryColor: Yup.string().required("Required"),
  secondaryColor: Yup.string().required("Required"),
});

export function ColorSettings() {
  const { webSettings } = useSelector((state) => state.settings);
  const authToken = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="color-settings">
      <h2 className="color-settings__heading">Color Settings</h2>

      <Formik
        enableReinitialize
        initialValues={{
          primaryColor: webSettings?.site_primary_color,
          secondaryColor: webSettings?.site_secondary_color,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setIsLoading(true);
          try {
            await dispatch(
              editColorSettings(
                webSettings.id,
                values.primaryColor,
                values.secondaryColor,
                authToken
              )
            );
            setIsLoading(false);
            toast.success(`Changes Saved successfully`, {
              ...messageNotifications,
            });
          } catch (error) {
            setIsLoading(false);
            toast.error(`Failed to Save Changes!`, {
              ...messageNotifications,
            });
          }
        }}
      >
        {({ touched, errors }) => {
          return (
            <Form className="color-settings__form">
              <div>
                <ColorInput
                  name="primaryColor"
                  touched={touched}
                  errors={errors}
                  label="Default Primary Color"
                />
                <ColorInput
                  name="secondaryColor"
                  touched={touched}
                  errors={errors}
                  label="Default Secondary Color"
                />
              </div>
              <Button
                isSubmit
                variant="secondary"
                customClass="color-settings__submit-btn"
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
