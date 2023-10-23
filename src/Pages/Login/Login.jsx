import { useContext, useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import ScrollToTop from "../../hooks/ScrollToTop";
import useTitle from "../../hooks/useTitle";

const Login = () => {
  useTitle("Sign In");

  const emailRef = useRef();
  const navigate = useNavigate();
  const { loginWithEmailPass, handlePasswordReset, googleSignIn } =
    useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const handlePasswordShow = () => {
    setShow(!show);
  };
  const handleGoogleSignIn = () => {
    setError("");
    googleSignIn()
      .then((result) => {
        if (result.user.email) {
          navigate(from, { replace: true });
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successful!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => setError(err.message));
  };
  const handleLogin = (e) => {
    setError("");
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    loginWithEmailPass(email, password)
      .then((result) => {
        if (result.user.email) {
          navigate(from, { replace: true });
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successful!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => setError(err.message));
  };
  const passwordReset = () => {
    const email = emailRef.current.value;
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter your email first!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
      return;
    }
    handlePasswordReset(email);
    setError("")
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Reset link send check your email!",
          showConfirmButton: true,
          timer: false,
        });
      })
      .catch((err) => {
        setError(err.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="">Why do I have this issue?</a>',
        });
      });
  };
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <ScrollToTop />
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl">
          Please Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Feel out the from correctly for login.
          </p>
          {error && <p className="text-red-500 font-bold">{error}</p>}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                ref={emailRef}
                name="email"
                required
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                name="password"
                required
                type={!show ? "password" : "text"}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
              />

              <span
                onClick={handlePasswordShow}
                className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
              >
                {!show ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </span>
            </div>
          </div>
          <p className="text-center text-sm text-ellipsis">
            Forgat password?
            <span className="link ml-1" onClick={passwordReset}>
              Reset
            </span>
          </p>
          <button
            type="submit"
            className="block w-full rounded-lg btn-primary px-5 py-3 text-sm font-medium text-white"
          >
            Sign in
          </button>
          <div className="divider">OR</div>
          <div className="grid card rounded-box place-items-center">
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className=" w-full flex gap-3 rounded-lg btn px-5 py-3 text-sm font-medium text-white"
            >
              <FaGoogle color="white" />
              Google Sign in
            </button>
          </div>
          <p className="text-center text-sm text-gray-500">
            Do not have account?
            <Link to="/register" className="link ml-1" href="">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
