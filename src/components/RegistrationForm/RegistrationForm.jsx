import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { registrationFormSchema } from '../../schemas/schemas';
import Button from '../ui/Button/Button';
import { registerUser } from '../../redux/auth/operations';
import { closeModal } from '../../redux/modal/slice';
import sprite from '../../../public/sprite.svg';
import css from './RegistrationForm.module.css';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.modal.modalType === 'register');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (values, actions) => {
    dispatch(registerUser(values));
    actions.resetForm();
    dispatch(closeModal());
  };

  return (
    <>
      {isOpen && (
          <div className={css.modalContent}>
            <button
              className={css.btnClose}
              onClick={() => dispatch(closeModal())}
            >
              <svg className={css.iconClose}>
                <use href={`${sprite}#icon-close`}></use>
              </svg>
            </button>
          {/* </div> */}
          <h2 className={css.title}>Registration</h2>
          <p className={css.text}>
            Thank you for your interest in our platform! In order to register,
            we need some information. Please provide us with the following
            information.
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={registrationFormSchema}
            onSubmit={handleSubmit}
          >
            <Form className={css.form}>
              <label>
                <Field
                  className={css.input}
                  type="text"
                  name="name"
                  placeholder="Name"
                />
                <ErrorMessage
                  className={css.errorMessage}
                  name="name"
                  component="span"
                />
              </label>
              <label>
                <Field
                  className={css.input}
                  type="text"
                  name="email"
                  placeholder="Email"
                />
                <ErrorMessage
                  className={css.errorMessage}
                  name="email"
                  component="span"
                />
              </label>
              <label className={css.label}>
                <Field
                  className={css.input}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={css.eyeButton}
                >
                  <svg className={css.iconEye}>
                    <use
                      href={
                        showPassword
                          ? `${sprite}#icon-eye`
                          : `${sprite}#icon-eye-off`
                      }
                    ></use>
                  </svg>
                </button>
                <ErrorMessage
                  className={css.errorMessage}
                  name="password"
                  component="span"
                />
              </label>
              <Button type="submit" width="100%" className={css.btnSignUp}>
                Sign Up
              </Button>
            </Form>
          </Formik>
        </div>
      )}
    </>
  );
};

export default RegistrationForm;
