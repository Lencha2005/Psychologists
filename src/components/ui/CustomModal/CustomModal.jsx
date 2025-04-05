// import { useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import css from './CustomModal.module.css';

// const modalRoot = document.getElementById('modal-root');

// const CustomModal = ({ isOpen, onClose, children }) => {
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }

//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return ReactDOM.createPortal(
//     <div className={css.overlay} onClick={onClose}>
//       <div className={css.modal} onClick={(e) => e.stopPropagation()}>
//         <button className={css.closeBtn} onClick={onClose}>
//           ×
//         </button>
//         {children}
//       </div>
//     </div>,
//     modalRoot
//   );
// };

// export default CustomModal;
