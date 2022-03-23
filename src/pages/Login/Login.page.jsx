import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from 'components';
import { useNavigate } from 'react-router-dom';
import './Login.styles.scss';

const initialValues = {
  user: '',
  password: ''
};

const validationSchema = Yup.object().shape({
  user: Yup.string().required('This field is Required!').min(4, 'Too Short!').max(50, 'Too Long!'),
  password: Yup.string()
    .required('This field is Required!')
    .min(4, 'Too Short!')
    .max(50, 'Too Long!')
});

function Login() {
  const navigate = useNavigate();
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
          Please enter the required information below in order to sign in to your account and use
          the application.
        </p>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => {
            navigate('/dashboard/onsite-users');
          }}>
          {({ errors, touched }) => (
            <Form className="login-page__card-form">
              {/* User */}
              <Input
                name="user"
                type="text"
                placeholder="Enter Email or Username"
                errors={errors}
                touched={touched}
              />
              {/* Password */}
              <Input
                name="password"
                type="password"
                placeholder="Enter Password"
                errors={errors}
                touched={touched}
              />
              {/* Submit */}
              <Button isSubmit customClass="login-page__card-form-btn">
                Get Started
              </Button>
            </Form>
          )}
        </Formik>
        {/* Name Field */}
        {/* Password Field */}
        {/* Button (submit) */}
      </div>
    </div>
  );
}

export default Login;
