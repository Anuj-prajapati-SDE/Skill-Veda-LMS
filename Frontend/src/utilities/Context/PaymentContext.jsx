import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const PaymentContext = createContext();

const PaymentProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch("/api/payments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setPayments(data);
    } catch (error) {
      console.error("Payment Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaymentContext.Provider value={{ payments, loading }}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentProvider;
