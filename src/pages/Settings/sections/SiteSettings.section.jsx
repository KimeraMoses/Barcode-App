import { Input, ColorInput, UploadLogo, Button } from 'components';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import './SiteSettings.styles.scss';

const initialValues = {
  siteTitle: 'Barcode App',
  logo: '/img/logo-blue.png',
  primaryColor: '#096DD9',
  secondaryColor: '#13C2C2'
};

const validationSchema = Yup.object().shape({
  siteTitle: Yup.string().required('Required'),
  logo: Yup.string().required('Required'),
  primaryColor: Yup.string().required('Required'),
  secondaryColor: Yup.string().required('Required')
});

export function SiteSettings() {
  return (
    <div className="site-settings">
      <h2 className="site-settings__heading">Site Settings</h2>

      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        {({ touched, errors }) => {
          return (
            <Form className="site-settings__form">
              <Input name="siteTitle" touched={touched} errors={errors} label="Site Name" />
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
              <Button isSubmit variant="secondary" customClass="site-settings__submit-btn">
                Save Changes
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
