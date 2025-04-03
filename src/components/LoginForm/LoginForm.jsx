import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { loginFormSchema } from '../../schemas/schemas';
import { loginUser } from '../../redux/auth/operations';
import { closeModal } from '../../redux/modal/slice';
import toast from 'react-hot-toast';
import Button from '../ui/Button/Button';
import sprite from '../../assets/sprite/sprite.svg';
import css from './LoginForm.module.css';

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.modal.modalType === 'login');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      actions.resetForm();
      dispatch(closeModal());
    } catch (error) {
      if (error.includes('auth/invalid-credential')) {
        toast.error('Incorrect email or password. Try again!');
      } else {
        toast.error('User not found. Please register first');
      }
    }
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
          <h2 className={css.title}>Log In</h2>
          <p className={css.text}>
            Welcome back! Please enter your credentials to access your account
            and continue your search for a psychologist.
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={loginFormSchema}
            onSubmit={handleSubmit}
          >
            <Form className={css.form}>
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
              <Button type="submit" width="100%" className={css.btnLogIn}>
                Log In
              </Button>
            </Form>
          </Formik>
        </div>
      )}
    </>
  );
};

export default LoginForm;
