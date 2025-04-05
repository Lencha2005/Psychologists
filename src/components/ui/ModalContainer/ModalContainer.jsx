// // import Modal from 'react-modal';
// import { useSelector, useDispatch } from 'react-redux';
// import { closeModal } from '../../../redux/modal/slice';
// import LoginForm from '../../LoginForm/LoginForm';
// import RegistrationForm from '../../RegistrationForm/RegistrationForm';
// import MakeAppointment from '../../MakeAppointment/MakeAppointment';
// import css from './ModalContainer.module.css';
// import { useEffect, useState } from 'react';
// import { selectIsLoggedIn } from '../../../redux/auth/selectors';
// import ReactDOM from 'react-dom';

// // Modal.setAppElement('#root');
// const modalRoot = document.getElementById('modal-root');

// const ModalContainer = () => {
//   if (!modalRoot) {
//   console.warn("⚠️ modal-root not found in HTML!");
//   return null;
//   }
//   const dispatch = useDispatch();
//   const modalType = useSelector(state => state.modal.modalType);
//   const modalProps = useSelector(state => state.modal.modalProps);

//   const [localModalType, setLocalModalType] = useState(null);

//   useEffect(() => {
//     if (modalType) {
//       document.body.style.overflow = 'hidden';
//       setLocalModalType(modalType);
//     } else {
//       document.body.style.overflow = '';
//       setTimeout(() => setLocalModalType(null), 0); // прибираємо контент після закриття
//     }
//   }, [modalType]);

//   if (!modalType && !localModalType) return null;

//   const closeModalHandler = () => {
//     dispatch(closeModal());
//   };

//   //  const handleAfterClose = () => {
//   //   document.body.style.overflow = '';
//   //   // тільки після повного закриття — розмонтовуємо контент
//   //   setLocalModalType(null);
//   // };

//   // console.log("MODAL RENDER")

//   const modalContent = (
//     <div className={css.overlay} onClick={closeModalHandler}>
//       <div
//         className={css.modal}
//         onClick={e => e.stopPropagation()} // блокуємо закриття по контенту
//       >
//         <button className={css.btnClose} onClick={closeModalHandler}>
//           ×
//         </button>
//         {localModalType === 'login' && <LoginForm />}
//         {localModalType === 'register' && <RegistrationForm />}
//         {localModalType === 'appointment' && (
//           <MakeAppointment psychologist={modalProps} />
//         )}
//       </div>
//     </div>
//   );

//   return ReactDOM.createPortal(modalContent, modalRoot);

// return (
//   <Modal
//     isOpen={!!modalType}
//     onRequestClose={closeModalHandler}
//     className={css.modal}
//     overlayClassName={css.overlay}
//        onAfterOpen={() => (document.body.style.overflow = 'hidden')}
//     onAfterClose={handleAfterClose}
//     shouldReturnFocusAfterClose={false}
//   >
//     {localModalType === 'login' && <LoginForm />}
//     {localModalType === 'register' && <RegistrationForm />}
//     {localModalType === 'appointment' && (
//       <MakeAppointment psychologist={modalProps} />
//     )}
//     {/* {modalType === 'login' && <LoginForm />}
//     {modalType === 'register' && <RegistrationForm />}
//     {modalType === 'appointment' && (
//       <MakeAppointment psychologist={modalProps} />
//     )} */}
//   </Modal>
// );
// };

// export default ModalContainer;

// import Modal from 'react-modal';
// import { useSelector, useDispatch } from 'react-redux';
// import { closeModal } from '../../../redux/modal/slice';
// import LoginForm from '../../LoginForm/LoginForm';
// import RegistrationForm from '../../RegistrationForm/RegistrationForm';
// import MakeAppointment from '../../MakeAppointment/MakeAppointment';
// import css from './ModalContainer.module.css';

// Modal.setAppElement('#root');
// // Modal.setAppElement('#modal-root');

// const ModalContainer = () => {
//   const modalType = useSelector(state => state.modal.modalType);
//   const modalProps = useSelector(state => state.modal.modalProps);
//   const dispatch = useDispatch();

//   const closeModalHandler = () => {
//     dispatch(closeModal());
//   };

//   return (
//     <Modal
//       isOpen={!!modalType}
//       onRequestClose={closeModalHandler}
//       className={css.modal}
//       overlayClassName={css.overlay}
//       onAfterOpen={() => (document.body.style.overflow = 'hidden')}
//       onAfterClose={() => (document.body.style.overflow = 'unset')}
//     >
//       {modalType === 'login' && <LoginForm />}
//       {modalType === 'register' && <RegistrationForm />}
//       {modalType === 'appointment' && (
//         <MakeAppointment psychologist={modalProps} />
//       )}
//     </Modal>
//   );
// };

// export default ModalContainer;


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