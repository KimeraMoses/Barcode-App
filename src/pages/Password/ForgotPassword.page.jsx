import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Input } from "components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { messageNotifications } from "store";
import { forgotPassword } from "store/Actions/authActions";
import { useDispatch } from "react-redux";
import "./ForgotPassword.styles.scss";

const initialValues = {
  email: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email.")
    .required("Email is required!"),
});

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="password-page">
      <div className="password-page__card">
        {/* Logo */}
        <div className="password-page__card-logo">
          <img src="/img/logo-blue.png" alt="logo" />
        </div>
        {/* Title */}
        <h1 className="password-page__card-title">Forgot Password</h1>
        {/* Description */}
        <p className="password-page__card-description">
          Please enter your email to reset password
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            setIsLoading(true);
            try {
              await dispatch(forgotPassword(values.email));
              resetForm();
              toast.success(
                "Please check your email for a link to reset password",
                {
                  ...messageNotifications,
                }
              );
              setIsLoading(false);
              navigate("/");
            } catch (err) {
              // console.log('err', err);
              setIsLoading(false);
              toast.error("Failed to generate password reset link!", {
                ...messageNotifications,
              });
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="password-page__card-form">
              <Input
                name="email"
                type="email"
                placeholder="Enter Email"
                errors={errors}
                touched={touched}
              />

              <div className="password-page__card-form-buttons">
                <Button
                  isSubmit
                  customClass="password-page__card-form-buttons-btn"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending Link..." : "Submit"}
                </Button>
                <Link to="/">
                  <Button customClass="password-page__card-form-buttons-btn forgot-btn">
                    Login
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

export default ForgotPassword;
