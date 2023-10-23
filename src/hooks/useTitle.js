import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const useTitle = (title) => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Kiddo Zone || " + title;
  }, [location.pathname, title]);
};

export default useTitle;
