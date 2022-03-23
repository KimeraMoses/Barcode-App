import { Button, Input, Switch } from 'components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import './AddUser.styles.scss';

const initialValues = {
  name: '',
  email: '',
  company: '',
  status: false,
  welcomeMsg: ''
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required!'),
  email: Yup.string().email('Please enter a valid email.').required('Email is required!'),
  company: Yup.string().required('Company is required!'),
  welcomeMsg: Yup.string().required('Welcome message is required!')
});

export function AddUser({ setModal }) {
  return (
    <div className="add-user__modal">
      <div className="add-user__modal-content">
        Please enter the required information below in order to add a new user record to the table
        being displayed.
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {
          setModal(false);
        }}>
        {({ errors, touched }) => (
          <Form className="add-user__modal-form">
            <Input
              name="name"
              type="text"
              placeholder="Full Name"
              errors={errors}
              touched={touched}
            />
            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              errors={errors}
              touched={touched}
            />
            <Input
              name="company"
              type="text"
              placeholder="Company"
              errors={errors}
              touched={touched}
            />
            <Switch name="status" placeholder="Status" errors={errors} touched={touched} />
            <Input
              name="welcomeMsg"
              type="text"
              placeholder="Welcome Message"
              errors={errors}
              touched={touched}
            />
            <div className="add-user__modal-buttons">
              <Button
                variant="secondary"
                onClick={() => {
                  setModal(false);
                }}>
                Cancel
              </Button>
              <Button isSubmit>Add New User</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
