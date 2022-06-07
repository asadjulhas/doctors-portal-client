import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../../firebaseinit";

const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  const avatar = user?.photoURL || 'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_960_720.png'
  // console.log(user)
  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem('accessToken');
  };
  const menuItems = (
    <>
      <li className="text-black">
        <Link to="/">Home</Link>
        {/* <Link to="/about">About</Link> */}
        <Link to="/appointment">Appointment</Link>
        {/* <Link to="/reviews">Reviews</Link> */}
        {/* <Link to="/contact">Contact Us</Link> */}
        {user ? <Link to="/dashboard">Dashboard</Link> : ''}
        {user ? '' : <Link to="/register">Register</Link>}
        {user ? '' : <Link to="/login">Login</Link>}
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
          <ul className="menu menu-horizontal p-0">{menuItems}</ul>
        </div>
        {user ? <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={avatar} alt={user?.displayName} title={user?.displayName} />
            </div>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                <b>{user?.displayName}</b>
              </a>
            </li>
            <li className="text-[red]">
              <Link onClick={handleLogout} to="">
                Logout
              </Link>
            </li>
          </ul>
        </div> : ''}
        <div className="navbar-end  lg:hidden">
          <div className="dropdown">
            <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
