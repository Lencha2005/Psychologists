import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Not Found Page</h2>
      <p style={{ textAlign: "center" }}>
        Redirecting to the homepage in 5 seconds...
      </p>
    </div>
  );
};

export default NotFoundPage;