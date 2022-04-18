import { Input, Button, SelectTimeZone } from "components";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { messageNotifications } from "store";
import { editAdminDetails } from "store/Actions/userActions";
import * as Yup from "yup";
import "./AdminSettings.styles.scss";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is Required"),
  name: Yup.string().required("Name is Required"),
  userName: Yup.string().required("UserName is Required"),
  timeZone: Yup.string().required("Time Zone is Required"),
});

export function AdminSettings() {
  const user = useSelector((state) => state.auth.user);
  const authToken = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="admin-settings">
      <h2 className="admin-settings__heading">Admin Settings</h2>

      <Formik
        initialValues={{
          email: user?.email,
          name: user?.full_name,
          userName: user?.username,
          timeZone: user?.timezone,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          setIsLoading(true);
          try {
            await dispatch(
              editAdminDetails(
                user.id,
                authToken,
                values.name,
                values.userName,
                values.email,
                user.status,
                user.role,
                values.timeZone,
                true
              )
            );
            setIsLoading(false);
            toast.success(`Changes saved successfuly`, {
              ...messageNotifications,
            });
          } catch (error) {
            setIsLoading(false);
            toast.error(`Failed to save changes!`, {
              ...messageNotifications,
            });
          }
        }}
      >
        {({ touched, errors }) => {
          return (
            <Form className="admin-settings__form">
              <Input
                name="name"
                type="text"
                touched={touched}
                errors={errors}
                label="Full Name"
              />
              <Input
                name="userName"
                type="text"
                touched={touched}
                errors={errors}
                label="userName"
              />
              <Input
                name="email"
                type="email"
                touched={touched}
                errors={errors}
                label="Admin Email"
              />
              <SelectTimeZone name="timeZone" label="Time Zone" />
              <Button
                isSubmit
                variant="secondary"
                customClass="admin-settings__submit-btn"
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
