import { ColorInput, Button } from 'components';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import './ColorSettings.styles.scss';

const initialValues = {
  primaryColor: '#096DD9',
  secondaryColor: '#13C2C2'
};

const validationSchema = Yup.object().shape({
  primaryColor: Yup.string().required('Required'),
  secondaryColor: Yup.string().required('Required')
});

export function ColorSettings() {
  return (
    <div className="color-settings">
      <h2 className="color-settings__heading">Color Settings</h2>

      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        {({ touched, errors }) => {
          return (
            <Form className="color-settings__form">
              <div>
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
              </div>
              <Button isSubmit variant="secondary" customClass="color-settings__submit-btn">
                Save Changes
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
