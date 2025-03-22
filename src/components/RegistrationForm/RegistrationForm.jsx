import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { registrationFormSchema } from '../../schemas/schemas';
import { selectIsRegistrationModalOpen } from '../../redux/modal/selectors';
import { closeRegistrationModal } from '../../redux/modal/slice';
import Button from '../ui/Button/Button';
import ModalContainer from '../ui/ModalContainer/ModalContainer';
import sprite from '../../../public/sprite.svg';
import css from './RegistrationForm.module.css';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const isOpenSingUp = useSelector(selectIsRegistrationModalOpen);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (values, actions) => {
    console.log('Submitted values:', values);
    actions.resetForm();
  };

  return (
    <ModalContainer
      isOpen={isOpenSingUp}
      onClose={() => dispatch(closeRegistrationModal())}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <div>
        <button
          className={css.btnClose}
          onClick={() => dispatch(closeRegistrationModal())}
        >
          <svg className={css.iconClose}>
            <use href={`${sprite}#icon-close`}></use>
          </svg>
        </button>
      </div>
      <h2 className={css.title}>Registration</h2>
      <p className={css.text}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
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
    </ModalContainer>
  );
};

export default RegistrationForm;
