import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectIsLoggedIn } from '../../../redux/auth/selectors';
import { closeModal } from '../../../redux/modal/slice';
import LoginForm from '../../LoginForm/LoginForm';
import RegistrationForm from '../../RegistrationForm/RegistrationForm';
import MakeAppointment from '../../MakeAppointment/MakeAppointment';
import css from './ModalContainer.module.css';

Modal.setAppElement('#root');

const ModalContainer = () => {
  const dispatch = useDispatch();
  const modalType = useSelector(state => state.modal.modalType);
  const modalProps = useSelector(state => state.modal.modalProps);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isVisible, setIsVisible] = useState(false);

  // Контролюємо анімацію появи/зникнення
  useEffect(() => {
    if (modalType) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 10);
      return () => clearTimeout(timeout);
    }
  }, [modalType]);

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  if (!isVisible && !modalType) return null;

  return (
    <Modal
      isOpen={isVisible}
      onRequestClose={closeModalHandler}
      className={css.modal}
      overlayClassName={css.overlay}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      closeTimeoutMS={250}
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
