import { Button, Input, Switch } from "components";
import { Formik, Form } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { messageNotifications } from "store";
import { editAdminDetails, editUserDetails } from "store/Actions/userActions";
import * as Yup from "yup";
import "./EditUser.styles.scss";

const validationSchema__Admin = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  userName: Yup.string().required("User Name is required!"),
  email: Yup.string()
    .email("Please enter a valid email.")
    .required("Email is required!"),
  timeZone: Yup.string().required("Timezone is required!"),
});

export function EditUser({ setModal, user, setUser, isAdmin }) {
  const authToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    email: Yup.string()
      .email("Please enter a valid email.")
      .required("Email is required!"),
    company: Yup.string().required("Company is required!"),
  });

  return (
    <div className="edit-user__modal">
      <div className="edit-user__modal-content">
        Please enter the required information below in order to edit the
        {isAdmin ? " admin " : " user "}
        record to the table being displayed.
      </div>
      {Object.keys(user).length ? (
        <Formik
          initialValues={{
            name: user?.name,
            email: user?.email,
            company: user?.company,
            status: user?.status !== "Disabled" ? true : false,
            userName: user?.username,
            timeZone: user?.timezone,
          }}
          enableReinitialize
          validationSchema={
            isAdmin ? validationSchema__Admin : validationSchema
          }
          onSubmit={async (values, { resetForm }) => {
            setIsLoading(true);
            console.log(values);
            try {
              await dispatch(
                isAdmin
                  ? editAdminDetails(
                      user.key,
                      authToken,
                      values.name,
                      values.userName,
                      values.email,
                      values.status ? 1 : 0,
                      values.timeZone,
                      false
                    )
                  : editUserDetails(
                      user.key,
                      authToken,
                      values.name,
                      values.email,
                      values.company,
                      values.status ? 1 : 0
                    )
              );
              resetForm();
              setIsLoading(false);
              setUser({});
              setModal(false);
              toast.success(`Changes to ${user.name} saved successfuly`, {
                ...messageNotifications,
              });
            } catch (error) {
              setIsLoading(false);
              toast.error(`Failed to save changes to ${user.name}!`, {
                ...messageNotifications,
              });
            }
          }}
        >
          {({ errors, touched }) => {
            return (
              <Form className="edit-user__modal-form">
                <Input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  errors={errors}
                  touched={touched}
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  errors={errors}
                  touched={touched}
                />
                {isAdmin && (
                  <>
                    <Input
                      name="userName"
                      type="text"
                      placeholder="UserName"
                      errors={errors}
                      touched={touched}
                    />
                    <Input
                      name="timeZone"
                      type="text"
                      placeholder="Timezone"
                      errors={errors}
                      touched={touched}
                    />
                  </>
                )}
                {!isAdmin && (
                  <Input
                    name="company"
                    type="text"
                    placeholder="Company"
                    errors={errors}
                    touched={touched}
                  />
                )}
                <Switch
                  name="status"
                  placeholder="Status"
                  errors={errors}
                  touched={touched}
                />
                <div className="edit-user__modal-buttons">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setModal(false);
                      setUser({});
                    }}
                  >
                    Cancel
                  </Button>
                  <Button isSubmit disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      ) : null}
    </div>
  );
}
