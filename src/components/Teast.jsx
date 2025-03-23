import { useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { ref, get } from "firebase/database";

const TestFirebase = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(db, "psychologists"));
        if (snapshot.exists()) {
          console.log("Psychologists Data from Firebase:", snapshot.val());
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Firebase error:", error);
      }
    };

    fetchData();
  }, []);

  return <div>Check Console for Data</div>;
};

export default TestFirebase;