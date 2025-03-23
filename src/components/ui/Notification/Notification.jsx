import { Toaster } from "react-hot-toast";

const Notification = () => {
  return (
    <Toaster
      position="center"
      toastOptions={{
        success: {
          style: {
            color: "var(--color-blue)",
            backgroundColor: "var(--color-white200)",
            fontWeight: "bold",
            padding: "8px 30px",
            borderRadius: "10px",
          },
          duration: 3000,
        },
      }}
    />
  );
};

export default Notification;