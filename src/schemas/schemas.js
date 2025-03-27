import * as Yup from 'yup';

const numberRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

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
    .matches(timeRegex, 'Invalid time format (HH:mm)')
    .required('Meeting time is required!'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  comment: Yup.string().required('Comment is required!'),
});
