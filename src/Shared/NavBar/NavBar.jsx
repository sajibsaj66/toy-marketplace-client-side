import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const NavBar = () => {
  const { logOut, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li tabIndex={0}>
        <NavLink
          to="all-toys"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          All Toys
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="my-toys"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              My Toys
            </NavLink>
          </li>
          <li>
            <NavLink
              to="add-toys"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Add A Toy
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink
          to="blogs"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          {" "}
          Blogs
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2  shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost normal-case text-sm sm:text-2xl sm:font-extrabold"
        >
          = <span className="text-primary"> KIDDO </span> ZONE=
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <div
              className="dropdown dropdown-end tooltip tooltip-left"
              data-tip={user?.displayName}
            >
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-16 rounded-full">
                  <img src={user?.photoURL} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">Profile</a>
                </li>
                <li
                  onClick={() => {
                    logOut()
                      .then(() => {
                        Swal.fire({
                          position: "center",
                          icon: "success",
                          title: "Sign out success",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                        navigate("/");
                      })
                      .catch((error) => {
                        alert(error.massage);
                      });
                  }}
                >
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary btn-outline">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
