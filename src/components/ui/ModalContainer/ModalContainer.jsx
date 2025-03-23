import Modal from 'react-modal';

Modal.setAppElement('#root');

const ModalContainer = ({
  isOpen = false,
  className = css.modal,
  overlayClassName = css.overlay,
  onClose,
  children,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      className={className}
      overlayClassName={overlayClassName}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={300}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
};

export default ModalContainer;
