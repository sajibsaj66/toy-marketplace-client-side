import { Link, useRouteError } from "react-router-dom";
import errorImg from "../../assets/error.svg";
import useTitle from "../../hooks/useTitle";
const ErrorPage = () => {
  const error = useRouteError();
  useTitle("Error Happened");

  return (
    <div className="flex flex-col justify-center items-center mt-32 px-5">
      <img className="object-fill w-4/12 mb-4" src={errorImg} alt="" />
      <p className="text-purple-400 font-xl">{error.data}</p>
      <p className="text-purple-400 font-xl">{error.statusText}</p>
      <p className="text-purple-400 font-xl text-9xl">{error.status}</p>
      <Link to="/" className="btn btn-primary md:button-xl mt-5">
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
