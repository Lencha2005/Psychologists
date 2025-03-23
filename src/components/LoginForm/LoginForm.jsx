import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { loginFormSchema, registrationFormSchema } from '../../schemas/schemas';
import { selectIsLoginModalOpen } from '../../redux/modal/selectors';
import { closeLoginModal } from '../../redux/modal/slice';
import { loginUser } from '../../redux/auth/operations';
import Button from '../ui/Button/Button';
import ModalContainer from '../ui/ModalContainer/ModalContainer';
import sprite from '../../../public/sprite.svg';
import css from './LoginForm.module.css';

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const isOpenLodIn = useSelector(selectIsLoginModalOpen);

  const user = useSelector(state => state.auth.user);
console.log("Redux user:", user);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (values, actions) => {
    dispatch(loginUser(values));
    dispatch(closeLoginModal());
    actions.resetForm();
  };

  return (
    <ModalContainer
      isOpen={isOpenLodIn}
      onClose={() => dispatch(closeLoginModal())}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <div>
        <button
          className={css.btnClose}
          onClick={() => dispatch(closeLoginModal())}
        >
          <svg className={css.iconClose}>
            <use href={`${sprite}#icon-close`}></use>
          </svg>
        </button>
      </div>
      <h2 className={css.title}>Log In</h2>
      <p className={css.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a psychologist.
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
    </ModalContainer>
  );
};

export default LoginForm;
