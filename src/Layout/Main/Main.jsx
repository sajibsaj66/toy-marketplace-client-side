import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Footer from "../../Shared/Footer/Footer";
import NavBar from "../../Shared/NavBar/NavBar";

const Main = () => {
  const { loading, } = useContext(AuthContext);

  
  if (loading) {
    return (
      <div className="grid justify-center items-center h-screen">
        <GridLoader color="#36d7b7" />
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <Outlet />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Main;
