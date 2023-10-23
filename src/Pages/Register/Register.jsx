import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import useTitle from "../../hooks/useTitle";

const Register = () => {
  useTitle("Sign Up");

  const navigate = useNavigate();
  const { registerWithEmailPassword, updateUserProfile } =
    useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  // handle password type
  const handlePasswordShow = () => {
    setShow(!show);
  };

  const handleRegister = (e) => {
    setError("");
    e.preventDefault();
    const form = e.target;
    const displayName = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoUrl.value;
    const password = form.password.value;
    const userInfoForUpdate = { displayName, photoURL };
    if (password.length < 6) {
      setError("Password must have to 6 or more character");
      return;
    }
    registerWithEmailPassword(email, password)
      .then((result) => {
        if (result.user.email) {
          updateUserProfile(userInfoForUpdate)
            .then(() => {
              // Profile updated!
              Swal.fire({
                position: "center",
                icon: "success",
                title: "User Created Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            })
            .catch((error) => {
              setError(error.message);
            });
        }
        form.reset();
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl">
            Get started today
          </h1>

          <form
            onSubmit={handleRegister}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
              Feel out the from correctly for registration.
            </p>
            {error && <p className="text-red-500 font-bold">{error}</p>}
            {/* Full Name input filed */}
            <div>
              <label htmlFor="email" className="sr-only">
                Full Name
              </label>

              <div className="relative">
                <input
                  required
                  name="name"
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter full name"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* Photo url input filed */}
            <div>
              <label htmlFor="photoUrl" className="sr-only">
                Photo
              </label>

              <div className="relative">
                <input
                  name="photoUrl"
                  required
                  type="url"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Photo URL"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
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
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            {/* Email input filed */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
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
            {/* password input filed */}
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

            <button
              type="submit"
              className="block w-full rounded-lg btn-primary px-5 py-3 text-sm font-medium text-white"
            >
              Sign up
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?
              <Link to="/login" className="link ml-1">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
