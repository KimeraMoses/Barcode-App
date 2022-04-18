import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Input } from "components";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.styles.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import { messageNotifications } from "store";
import { forgotPassword } from "store/Actions/authActions";
import { useDispatch } from "react-redux";

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
    <div className="login-page">
      <div className="login-page__card">
        {/* Logo */}
        <div className="login-page__card-logo">
          <img src="/img/logo-blue.png" alt="logo" />
        </div>
        {/* Title */}
        <h1 className="login-page__card-title">Forgot Password</h1>
        {/* Description */}
        <p className="login-page__card-description">
          Please enter the your email to reset password
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
              console.log("err", err);
              setIsLoading(false);
              toast.error("Failed to generate password reset link!", {
                ...messageNotifications,
              });
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="login-page__card-form">
              <Input
                name="email"
                type="email"
                placeholder="Enter Email"
                errors={errors}
                touched={touched}
              />
              <div className="login-page__forgot-password-link">
                Have password?<Link to="/"> Login</Link>
              </div>

              <Button
                isSubmit
                customClass="login-page__card-form-btn"
                disabled={isLoading}
              >
                {isLoading ? "Sending Link..." : "Submit"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ForgotPassword;
