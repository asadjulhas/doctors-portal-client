import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const menuItems = (
    <>
      <li className="text-black">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/appointment">Appointment</Link>
        <Link to="/reviews">Reviews</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </li>
      <li tabIndex="0">
              <a>
                More
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2">
                <Link to="/">More 1</Link>
                <Link to="/">More 2</Link>
              </ul>
            </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex="0" className="btn btn-ghost lg:hidden">
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
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 bg-white  rounded-box w-52"
            >
             {menuItems}
              
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl text-black">
            Doctors-Point
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            {menuItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
