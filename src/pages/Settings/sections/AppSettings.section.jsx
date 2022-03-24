import { Input, ColorInput, UploadLogo, Button } from 'components';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { setPrimaryColor, setSecondaryColor } from 'store';
import './AppSettings.styles.scss';

const initialValues = {
  defaultAppName: 'Mind 2 Matter',
  logo: '/img/logo-blue.png'
};

const validationSchema = Yup.object().shape({
  defaultAppName: Yup.string().required('Required'),
  logo: Yup.string().required('Required'),
  primaryColor: Yup.string().required('Required'),
  secondaryColor: Yup.string().required('Required')
});

export function AppSettings() {
  const { primaryColor, secondaryColor } = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  return (
    <div className="app-settings">
      <h2 className="app-settings__heading">App Settings</h2>

      <Formik
        enableReinitialize
        initialValues={{
          primaryColor,
          secondaryColor,
          ...initialValues
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(setPrimaryColor(values.primaryColor));
          dispatch(setSecondaryColor(values.secondaryColor));
        }}>
        {({ touched, errors }) => {
          return (
            <Form className="app-settings__form">
              <Input
                name="defaultAppName"
                touched={touched}
                errors={errors}
                label="Default App Name"
              />
              <UploadLogo name="logo" touched={touched} errors={errors} label="Default Logo" />
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
              <Button isSubmit variant="secondary" customClass="app-settings__submit-btn">
                Save Changes
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
