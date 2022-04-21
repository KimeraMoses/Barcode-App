import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ref } from 'yup';
import { Button, Input } from 'components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { messageNotifications } from 'store';
import { passwordReset } from 'store/Actions/authActions';
import { useDispatch } from 'react-redux';
import './ResetPassword.styles.scss';

const initialValues = {
  confirmPassword: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('This field is Required!')
    .min(4, 'Too Short!')
    .max(50, 'Too Long!'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([ref('password')], 'Passwords do not match'),
});

function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resetToken } = useParams();
  return (
    <div className="reset-page">
      <div className="reset-page__card">
        {/* Logo */}
        <div className="reset-page__card-logo">
          <Link to="/">
            <img src="/img/logo-blue.png" alt="logo" />
          </Link>
        </div>
        {/* Title */}
        <h1 className="reset-page__card-title">Reset Password</h1>
        {/* Description */}
        <p className="reset-page__card-description">
          Please enter the required information below to set a new password
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            setIsLoading(true);
            try {
              await dispatch(passwordReset(values.password, resetToken));
              resetForm();
              toast.success('You have logged in successfuly', {
                ...messageNotifications,
              });
              setIsLoading(false);
              navigate('/');
            } catch (err) {
              setIsLoading(false);
              toast.error('Failed to Login', {
                ...messageNotifications,
              });
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="reset-page__card-form">
              <Input
                name="password"
                type="password"
                placeholder="Enter Password"
                errors={errors}
                touched={touched}
              />
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                errors={errors}
                touched={touched}
              />

              <div className="password-page__card-form-buttons">
                <Button
                  isSubmit
                  customClass="reset-page__card-form-buttons-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ResetPassword;
