import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const PrivateComponent = ({ children, role }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get token from localStorage as fallback
        const token = localStorage.getItem("authToken");
        
        const response = await fetch(`http://localhost:5000/api/auth/admin`, {
          method: "GET",
          credentials: "include", // Ensures cookies are sent with request
          headers: {
            'Authorization': token ? `Bearer ${token}` : '', // Add Authorization header as fallback
            'Content-Type': 'application/json'
          },
        });

        const data = await response.json();

        if (response.ok) {
          setIsAuthenticated(true);
          setUserRole(data.role);
        } else {
          console.error("Authentication failed:", data);
          setIsAuthenticated(false);
          toast.error("Please log in to access this page.");
        }
      } catch (error) {
        console.error("Error verifying authentication:", error);
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
    return <Navigate to="/" />;
  }

  if (role && userRole !== role) {
    toast.error("Unauthorized access.");
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateComponent;
