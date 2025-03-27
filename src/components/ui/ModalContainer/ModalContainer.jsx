import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import css from './ModalContainer.module.css'

import { closeModal } from '../../../redux/modal/slice';
import LoginForm from '../../LoginForm/LoginForm';
import RegistrationForm from '../../RegistrationForm/RegistrationForm';
import MakeAppointment from '../../MakeAppointment/MakeAppointment';

Modal.setAppElement('#root');

const ModalContainer = () => {
  const modalType = useSelector((state) => state.modal.modalType);
  const modalProps = useSelector((state) => state.modal.modalProps);
  const dispatch = useDispatch();
  
  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  let modalStyle;

  if(modalType === 'login') {
    modalStyle = css.login;
  } else if (modalType === 'register') {
    modalStyle = css.register;
  } else if (modalType === 'appointment') {
    modalStyle = css.appointment
  }
  
  console.log('modalType: ', modalType);
  return (
    <Modal
      isOpen={!!modalType}
      onRequestClose={closeModalHandler}
      className={modalStyle}
      overlayClassName={css.overlay}
    >
      {modalType === 'login' && <LoginForm />}
      {modalType === 'register' && <RegistrationForm />}
      {modalType === 'appointment' && <MakeAppointment psychologist={modalProps}/>}
    </Modal>
  );
};

export default ModalContainer;