import Modal from 'react-modal';
import { useRef } from 'react';

Modal.setAppElement('#root');

const ModalContainer = ({
  isOpen = false,
  className = css.modal,
  overlayClassName = css.overlay,
  onClose,
  children,
}) => {
const modalRef = useRef(null);

  return (
    <Modal
      isOpen={isOpen}
      className={className}
      overlayClassName={overlayClassName}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true} 
      closeTimeoutMS={300}
      ariaHideApp={false}
      // onAfterOpen={() => (document.body.style.overflow = 'hidden')}
      // onAfterClose={() => (document.body.style.overflow = 'unset')}
    >
      {children}
    </Modal>
  );
};

export default ModalContainer;

// const modalRef = useRef(null);
// useEffect(() => {
//   if (isOpen) {
//     document.body.style.overflow = 'hidden';
//   } else {
//     document.body.style.overflow = 'unset';
//     setTimeout(() => {
//       const loginButton = document.querySelector('.btnLogin'); // Фокус на кнопку Log In
//       if (loginButton) loginButton.focus();
//     }, 300); // Чекаємо завершення анімації закриття
//   }
// }, [isOpen]);
