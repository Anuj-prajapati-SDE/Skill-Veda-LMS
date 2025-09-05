import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const PrivateComponent = ({ children, role }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_Backend_URL}/api/auth/user`, {
          method: "GET",
          credentials: "include", // Ensures cookies are sent with request
        });

        const data = await response.json();

        if (response.ok) {
          setIsAuthenticated(true);
          setUserRole(data.role);
        } else {
          setIsAuthenticated(false);
          toast.error("Please log in to access this page.");
        }
      } catch (error) {
        setIsAuthenticated(false);
        toast.error("Error verifying authentication.");
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show loading until authentication check is complete
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    toast.error("Unauthorized access.");
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateComponent;
