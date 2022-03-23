import { Input, Button, SelectTimeZone } from 'components';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import './AdminSettings.styles.scss';

const initialValues = {
  email: 'Paul.Elliott@Fakemail.com',
  password: '*********',
  confirmPassword: '*********',
  timeZone: '-5'
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password')], 'Passwords must match')
});

export function AdminSettings() {
  return (
    <div className="admin-settings">
      <h2 className="admin-settings__heading">Admin Settings</h2>

      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        {({ touched, errors }) => {
          return (
            <Form className="admin-settings__form">
              <Input
                name="email"
                type="email"
                touched={touched}
                errors={errors}
                label="Admin Email"
              />
              <Input
                name="password"
                type="password"
                touched={touched}
                errors={errors}
                label="Password"
              />
              <Input
                name="confirmPassword"
                type="password"
                touched={touched}
                errors={errors}
                label="Confirm Password"
              />
              <SelectTimeZone name="timeZone" label="Time Zone" />
              <Button isSubmit variant="secondary" customClass="admin-settings__submit-btn">
                Save Changes
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
