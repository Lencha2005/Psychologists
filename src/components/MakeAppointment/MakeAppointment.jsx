import { ref, push } from 'firebase/database';
import { db } from '../../firebase/firebaseConfig';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { makeAppointmentSchema } from '../../schemas/schemas';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/modal/slice';
import toast from 'react-hot-toast';
import TimePicker from '../TimePicker/TimePicker';
import Button from '../ui/Button/Button';
import sprite from '../../assets/sprite/sprite.svg';
import css from './MakeAppointment.module.css';

const initialValues = {
  name: '',
  phone: '',
  time: '',
  email: '',
  comment: '',
};

const MakeAppointment = ({ psychologist }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    const appointmentsRef = ref(db, 'appointments');

    const newAppointment = {
      psychologist_name: psychologist.name,
      name: values.name,
      phone: values.phone,
      email: values.email,
      time: values.time,
      comment: values.comment,
    };

    try {
      await push(appointmentsRef, newAppointment);
      toast.success('You have successfully registered an appointment.');
      actions.resetForm();
      dispatch(closeModal());
    } catch (error) {
      toast.error('Appointment booking error. Please try again.');
    }
  };

  return (
    <div className={css.modalContent}>
      <button
        type="button"
        className={css.btnClose}
        onClick={() => dispatch(closeModal())}
      >
        <svg className={css.iconClose}>
          <use href={`${sprite}#icon-close`}></use>
        </svg>
      </button>
      <h2 className={css.title}>Make an appointment with a psychologists</h2>
      <p className={css.text}>
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
      </p>
      <div className={css.wrapperPsychologist}>
        <img
          className={css.img}
          src={psychologist.avatar_url}
          alt={psychologist.name}
        />
        <p className={css.profession}>Your psychologists</p>
        <p className={css.namePsychologist}>{psychologist.name}</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={makeAppointmentSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ setFieldValue, values }) => (
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
            <div className={css.wrapPhone}>
              <label className={css.labelPhone}>
                <Field
                  className={css.input}
                  type="text"
                  name="phone"
                  placeholder="+380"
                />
                <ErrorMessage
                  className={css.errorMessage}
                  name="phone"
                  component="span"
                />
              </label>
              <label className={css.labelPhone}>
                <TimePicker
                  value={values.time}
                  onSelectTime={time => {
                    setFieldValue('time', time);
                  }}
                />
                <ErrorMessage
                  className={css.errorMessage}
                  name="time"
                  component="span"
                />
              </label>
            </div>
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
            <label>
              <Field
                className={`${css.input} ${css.textarea}`}
                as="textarea"
                rows="5"
                name="comment"
                placeholder="Comment"
              />
              <ErrorMessage
                className={css.errorMessage}
                name="comment"
                component="span"
              />
            </label>
            <Button type="submit" className={css.btnSend}>
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MakeAppointment;
