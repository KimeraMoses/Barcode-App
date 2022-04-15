import { Input, ColorInput, UploadLogo, Button } from "components";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { messageNotifications } from "store";
import { editSiteSettings } from "store/Actions/siteSettingActions";
import * as Yup from "yup";
import "./SiteSettings.styles.scss";

const validationSchema = Yup.object().shape({
  siteTitle: Yup.string().required("Required"),
  logo: Yup.string().required("Required"),
  primaryColor: Yup.string().required("Required"),
  secondaryColor: Yup.string().required("Required"),
});

export function SiteSettings() {
  const { webSettings } = useSelector((state) => state.settings);
  const authToken = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="site-settings">
      <h2 className="site-settings__heading">Site Settings</h2>

      <Formik
        enableReinitialize
        initialValues={{
          primaryColor: webSettings?.site_primary_color,
          secondaryColor: webSettings?.site_secondary_color,
          siteTitle: webSettings?.site_name,
          logo: webSettings?.site_logo,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setIsLoading(true);
          try {
            await dispatch(
              editSiteSettings(
                webSettings.id,
                values.siteTitle,
                values.logo,
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
            toast.error(`Failed to new user!`, {
              ...messageNotifications,
            });
          }
        }}
      >
        {({ touched, errors }) => {
          return (
            <Form className="site-settings__form">
              <Input
                name="siteTitle"
                touched={touched}
                errors={errors}
                label="Site Name"
              />
              <UploadLogo
                name="logo"
                touched={touched}
                errors={errors}
                label="Default Logo"
              />
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
              <Button
                isSubmit
                variant="secondary"
                customClass="site-settings__submit-btn"
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
