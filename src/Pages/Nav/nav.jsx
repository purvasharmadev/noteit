import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";
import {BsPlayCircleFill,BsPersonCircle} from "react-icons/bs"

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
          alt=""
          srcset=""
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
            <span>
            <BsPlayCircleFill/>
              </span>Home
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li className="nav-item">
              <span onClick={logOut} className=" nav-link link pointer">
              <span><BsPersonCircle/></span>  Logout
              </span>
            </li>
          </>
        ) : (
          <li className="nav-item">
            <Link to="/login" className=" nav-link link">
            <span><BsPersonCircle/></span>   Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export {Nav};
