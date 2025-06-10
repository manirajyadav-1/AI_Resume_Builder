import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/resume/success", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Login Response:", response);
        setUserEmail(response.data); 
      })
      .catch((error) => {
        console.error("Login Error:", error.message);
        setUserEmail(null);
      });
  }, []);

  const handleLogout = () => {
    axios
      .post("http://localhost:8080/api/v1/resume/logout", {}, { withCredentials: true })
      .then(() => {
        setUserEmail(null);
        window.location.href = "/";
      })
      .catch((err) => console.error("Logout failed", err));
  };

  return (
    <div className="navbar max-h-10 fixed z-10 justify-between bg-base-100 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            <li>
              <Link to={"/services"}>Services</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
            {!userEmail ? (
              <li>
                <Link to={"/login"} className="btn">
                  Login
                </Link>
              </li>
            ) : (
              <>
                <li className="text-sm p-2">{userEmail}</li>
                <li>
                  <button className="btn btn-error" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl">
          AI Resume Builder
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {!userEmail ? (
            <li>
              <Link to={"/login"} className="btn">
                Login
              </Link>
            </li>
          ) : (
            <>
              <li className="p-2 font-medium">{userEmail}</li>
              <li>
                <button className="btn btn-error" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;