import Modal from 'react-modal';

Modal.setAppElement('#root');

const ModalContainer = ({
  isOpen = false,
  className,
  overlayClassName,
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
