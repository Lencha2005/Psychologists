import * as Yup from 'yup';

export const registrationFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short!')
    .max(20, 'Too long!')
    .required('Field is required!'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const loginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});
