import { Button, Input, SelectTimeZone, Switch } from "components";
import { Formik, Form } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { messageNotifications } from "store";
import { createNewAdmin, createNewUser } from "store/Actions/userActions";
import * as Yup from "yup";
import "./AddUser.styles.scss";

const initialValues = {
  name: "",
  email: "",
  company: "",
  status: false,
  welcomeMsg: "",
  password: "",
  timeZone: "",
  userName: "",
};

const validationSchema__User = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  email: Yup.string()
    .email("Please enter a valid email.")
    .required("Email is required!"),
  company: Yup.string().required("Company is required!"),
  welcomeMsg: Yup.string().required("Welcome message is required!"),
});

const validationSchema__Admin = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  userName: Yup.string().required("User Name is required!"),
  email: Yup.string()
    .email("Please enter a valid email.")
    .required("Email is required!"),
  password: Yup.string()
    .required("Password is required!")
    .min(8, "Password must be minimum of 8 characters"),
  timeZone: Yup.string().required("Timezone is required!"),
});
export function AddUser({ setModal, isAdmin }) {
  const authToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="add-user__modal">
      <div className="add-user__modal-content">
        Please enter the required information below in order to add a new
        {isAdmin ? " admin " : " user "}
        record to the table being displayed.
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={
          isAdmin ? validationSchema__Admin : validationSchema__User
        }
        onSubmit={async (values, { resetForm }) => {
          setIsLoading(true);
          console.log(values);
          try {
            await dispatch(
              isAdmin
                ? createNewAdmin(
                    authToken,
                    values.name,
                    values.userName,
                    values.password,
                    values.email,
                    values.status ? 1 : 0,
                    values.timeZone
                  )
                : createNewUser(
                    authToken,
                    values.name,
                    values.email,
                    values.company,
                    values.status ? 1 : 0,
                    values.welcomeMsg
                  )
            );
            resetForm();
            setIsLoading(false);
            setModal(false);
            toast.success(
              `New ${isAdmin ? "admin" : "user"} created successfuly`,
              {
                ...messageNotifications,
              }
            );
          } catch (error) {
            setIsLoading(false);
            toast.error(`Failed to new user!`, {
              ...messageNotifications,
            });
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="add-user__modal-form">
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
                  name="password"
                  type="password"
                  placeholder="Password"
                  errors={errors}
                  touched={touched}
                />
                <SelectTimeZone name="timeZone" />
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
            {!isAdmin && (
              <Input
                name="welcomeMsg"
                type="text"
                placeholder="Welcome Message"
                errors={errors}
                touched={touched}
              />
            )}
            <div className="add-user__modal-buttons">
              <Button
                variant="secondary"
                onClick={() => {
                  setModal(false);
                }}
              >
                Cancel
              </Button>
              <Button isSubmit disabled={isLoading}>
                {isLoading
                  ? "Adding..."
                  : `Add New ${isAdmin ? "Admin" : "User"}`}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
