import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/modal/slice';
import LoginForm from '../../LoginForm/LoginForm';
import RegistrationForm from '../../RegistrationForm/RegistrationForm';
import MakeAppointment from '../../MakeAppointment/MakeAppointment';
import css from './ModalContainer.module.css';

Modal.setAppElement('#root');

const ModalContainer = () => {
  const modalType = useSelector(state => state.modal.modalType);
  const modalProps = useSelector(state => state.modal.modalProps);
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      isOpen={!!modalType}
      onRequestClose={closeModalHandler}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      {modalType === 'login' && <LoginForm />}
      {modalType === 'register' && <RegistrationForm />}
      {modalType === 'appointment' && (
        <MakeAppointment psychologist={modalProps} />
      )}
    </Modal>
  );
};

export default ModalContainer;
