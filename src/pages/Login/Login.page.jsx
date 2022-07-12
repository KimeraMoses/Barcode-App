import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Input } from "components";
import { Link, useNavigate } from "react-router-dom";
import "./Login.styles.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import { messageNotifications } from "store";
import { login } from "store/Actions/authActions";
import { useDispatch } from "react-redux";

const initialValues = {
  user: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  user: Yup.string()
    .required("This field is Required!")
    .min(4, "Too Short!")
    .max(50, "Too Long!"),
  password: Yup.string()
    .required("This field is Required!")
    .min(4, "Too Short!")
    .max(50, "Too Long!"),
});

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="login-page">
      <div className="login-page__card">
        {/* Logo */}
        <div className="login-page__card-logo">
          <img src="/img/logo-blue.png" alt="logo" />
        </div>
        {/* Title */}
        <h1 className="login-page__card-title">Welcome back</h1>
        {/* Description */}
        <p className="login-page__card-description">
          Please enter the required information below in order to sign in to
          your account and use the application.
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            setIsLoading(true);
            try {
              await dispatch(login(values.user, values.password));
              resetForm();
              toast.success("You have logged in successfuly", {
                ...messageNotifications,
              });
              setIsLoading(false);
              navigate("/dashboard/onsite-users");
            } catch (err) {
              console.log("err", err);
              setIsLoading(false);
              toast.error("Failed to Login", {
                ...messageNotifications,
              });
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="login-page__card-form">
              <Input
                name="user"
                type="text"
                placeholder="Enter Email or Username"
                errors={errors}
                touched={touched}
              />

              <Input
                name="password"
                type="password"
                placeholder="Enter Password"
                errors={errors}
                touched={touched}
              />

              <div className="login-page__card-form-buttons">
                <Button
                  isSubmit
                  customClass="login-page__card-form-buttons-btn"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging In..." : "Get Started"}
                </Button>
                <Link to="/forgot-password">
                  <Button customClass="login-page__card-form-buttons-btn forgot-btn">
                    Forgot Password?
                  </Button>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
