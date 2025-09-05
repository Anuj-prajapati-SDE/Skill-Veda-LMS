import { createContext, useState, useEffect } from "react";

export const PublishContext = createContext();

const PublishProvider = ({ children }) => {
  const [publishedCourses, setPublishedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublishedCourses();
  }, []);

  const fetchPublishedCourses = async () => {
    try {
      const res = await fetch("/api/published");
      const data = await res.json();
      if (res.ok) setPublishedCourses(data);
    } catch (error) {
      console.error("Publish Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublishContext.Provider value={{ publishedCourses, loading }}>
      {children}
    </PublishContext.Provider>
  );
};

export default PublishProvider;
