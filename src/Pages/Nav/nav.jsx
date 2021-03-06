import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";


import { useAuth } from "../../Auth/auth-context";

function Nav() {
  const { isLoggedIn, logOut } = useAuth();

  // function to toggle on small screen
  function ClickHandler() {
    const navList = document.getElementsByClassName("navbar-list")[0];
    return navList.classList.toggle("toggle-active");
  }

  return (
    <nav className="color-white nav-resp">
      {/* Logo */}
      <h2 className="nav-brand">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Tomboy_logo.svg/1200px-Tomboy_logo.svg.png"
          className="nav-logo img-responsive img-rounded"
          alt="logo"
        />
        <Link to="/" className="nav-link link">
          NoteIt
        </Link>
      </h2>
      {/* Toggle */}
      <span onClick={ClickHandler} className="nav-toggle nav-link">
        &#9776;
      </span>

      {/* Navbar-list */}

      <ul className="navbar-list bg-primary">
        {/* Explore */}
        <li className="nav-item">
          <Link to="/" className=" nav-link link">
            Home
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li className="nav-item">
              <span onClick={logOut} className=" nav-link link pointer">
                Logout
              </span>
            </li>
          </>
        ) : (
          <li className="nav-item">
            <Link to="/login" className=" nav-link link">
                 Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export {Nav};
