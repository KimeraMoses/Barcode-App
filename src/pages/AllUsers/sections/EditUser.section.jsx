import { Button, Input, Switch } from 'components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import './EditUser.styles.scss';

export function EditUser({ setModal, user, setUser }) {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required!'),
    email: Yup.string().email('Please enter a valid email.').required('Email is required!'),
    company: Yup.string().required('Company is required!')
  });

  return (
    <div className="edit-user__modal">
      <div className="edit-user__modal-content">
        Please enter the required information below in order to add a new user record to the table
        being displayed.
      </div>
      {Object.keys(user).length ? (
        <Formik
          initialValues={{
            name: user?.name,
            email: user?.email,
            company: user?.company,
            status: user?.status
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={() => {
            setModal(false);
            setUser({});
          }}>
          {({ errors, touched }) => {
            return (
              <Form className="edit-user__modal-form">
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
                <div className="edit-user__modal-buttons">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setModal(false);
                      setUser({});
                    }}>
                    Cancel
                  </Button>
                  <Button isSubmit>Save Changes</Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      ) : null}
    </div>
  );
}
