import { ColorInput, Button } from 'components';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { setPrimaryColor, setSecondaryColor } from 'store';
import './ColorSettings.styles.scss';

const validationSchema = Yup.object().shape({
  primaryColor: Yup.string().required('Required'),
  secondaryColor: Yup.string().required('Required')
});

export function ColorSettings() {
  const { primaryColor, secondaryColor } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  return (
    <div className="color-settings">
      <h2 className="color-settings__heading">Color Settings</h2>

      <Formik
        enableReinitialize
        initialValues={{
          primaryColor,
          secondaryColor
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(setPrimaryColor(values.primaryColor));
          dispatch(setSecondaryColor(values.secondaryColor));
        }}>
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
