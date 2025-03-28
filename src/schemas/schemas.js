import * as Yup from 'yup';

const numberRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

export const registrationFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short!')
    .max(20, 'Too long!')
    .required('Name is required!'),
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

export const makeAppointmentSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short!')
    .max(20, 'Too long!')
    .required('Name is required!'),
  phone: Yup.string()
    .matches(numberRegex, 'Invalid phone number. Phone must be +380XXXXXXXXX')
    .required('Phone number is required!'),
  time: Yup.string()
    .required('Meeting time is required!'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  comment: Yup.string().required('Comment is required!'),
});
