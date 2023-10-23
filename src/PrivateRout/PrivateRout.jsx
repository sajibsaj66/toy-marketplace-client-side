import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider/AuthProvider";

const PrivateRout = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (!user) {
    Swal.fire({
      position: "center",
      icon: "info",
      title: "Please login first!",
      showConfirmButton: false,
      timer: 1500,
    });
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default PrivateRout;
