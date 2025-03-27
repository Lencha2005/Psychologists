import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modal/slice';
import Button from '../ui/Button/Button';
import css from './AuthMenu.module.css';

const AuthMenu = ({onClose}) => {
  const dispatch = useDispatch();

  const onLogoInClick = () => {
          dispatch(openModal({type: 'login'}));
          onClose()
        }
    
      const onSignUpClick = () => {
        dispatch(openModal({type: 'register'}));
          onClose();
      }

  return (
    <div className={css.wrap}>
      <Button
        variant="log"
        className={css.btnLogin}
        onClick={() => {
          dispatch(onLogoInClick)
        }
          }
      >
        Log In
      </Button>
      <Button
        variant="default"
        className={css.btnRegistration}
        onClick={onSignUpClick}
      >
        Registration
      </Button>
    </div>
  );
};

export default AuthMenu;

// import { useSelector } from 'react-redux';
// import Button from '../ui/Button/Button';
// import css from './AuthMenu.module.css';
// import LoginForm from '../LoginForm/LoginForm';
// import RegistrationForm from '../RegistrationForm/RegistrationForm';
// import { useState } from 'react';

// const AuthMenu = ({onClose}) => {
//   const [isOpenSignUp, setIsOpenSignUp] = useState(false);
//   const [isOpenLogIn, setIsOpenLogIn] = useState(false);

//   const onLogoInClick = () => {
//     if (!isOpenLogIn) {
//       console.log("Відкриваємо модалку log", new Error().stack);
//       setIsOpenLogIn(true);
//     }
//   };

//   const onSignUpClick = () => {
//     if (!isOpenSignUp) {
//       console.log("Відкриваємо модалку sign", new Error().stack);
//       setIsOpenSignUp(true);
//     }
//   };

//   const onCloseModalLogIn = () => {
//     console.log("Закриваємо модалку log", new Error().stack);
//     setIsOpenLogIn(false);
//   };

//   const onCloseModalSignUP = () => {
//     console.log("Закриваємо модалку sign", new Error().stack);
//     setIsOpenSignUp(false);
//   };
// // const onLogoInClick = () =>{
// //   setIsOpenLogIn(true);
// //   setIsOpenSingUp(false);
// //   onClose()
// // }

// // const onSignUpClick = () =>{
// //   setIsOpenSingUp(true);
// //   setIsOpenLogIn(false);
// //   onClose()
// // }

//   return (
//     <div className={css.wrap}>
//       <Button variant="log" className={css.btnLogin} onClick={onLogoInClick}>
//         Log In
//       </Button>
//       <Button
//         variant="default"
//         className={css.btnRegistration}
//         onClick={onSignUpClick}
//       >
//         Registration
//       </Button>
//       {isOpenLogIn && <LoginForm isOpen={isOpenLogIn} onClose={onCloseModalLogIn}/>}
//       {isOpenSignUp && <RegistrationForm isOpen={isOpenSignUp} onClose={onCloseModalSignUP}/>}
//     </div>
//   );
// };

// export default AuthMenu;
