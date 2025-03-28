import { Toaster } from 'react-hot-toast';

const Notification = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        success: {
          style: {
            color: 'var(--color-primary-white)',
            backgroundColor: 'var(--button-bg-color)',
            fontWeight: 'bold',
            padding: '8px 30px',
            borderRadius: '10px',
          },
          duration: 3000,
        },
        error: {
          style: {
            color: 'var(--color-primary-white)',
            backgroundColor: 'tomato',
            fontWeight: 'bold',
            padding: '8px 30px',
            borderRadius: '10px',
          },
          duration: 3000,
        },
      }}
    />
  );
};

export default Notification;
