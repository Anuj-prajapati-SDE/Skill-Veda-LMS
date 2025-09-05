import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const EnrolledContext = createContext();

const EnrolledProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchEnrolledCourses();
  }, [user]);

  const fetchEnrolledCourses = async () => {
    try {
      const res = await fetch("/api/enrolled", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setEnrolledCourses(data);
    } catch (error) {
      console.error("Enrolled Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EnrolledContext.Provider value={{ enrolledCourses, loading }}>
      {children}
    </EnrolledContext.Provider>
  );
};

export default EnrolledProvider;
