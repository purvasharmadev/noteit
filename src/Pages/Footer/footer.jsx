import React from "react";
import { Link } from "react-router-dom";
import { BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";
import "./footer.css";

function Footer() {
  return (
    <>
      <footer>
        <div className="flex flex-space-evenly align-item-center flex-wrap">
          <Link to="/" className="nav-link link">
            Home
          </Link>

          <Link to="/notes" className="nav-link link">
            Notes
          </Link>

          <p className="text-center">
            Follow me on :
            <a
              href="https://www.instagram.com/purva.codes/"
              className="p-1 link"
            >
              <BsInstagram />
            </a>
            <a
              href="https://twitter.com/Purva_Sharma__"
              className="p-1"
            >
              <BsTwitter />
            </a>
            <a
              href="https://www.linkedin.com/in/purva-sharma1999/"
              className="p-1"
            >
              <BsLinkedin />
            </a>
          </p>
        </div>
        <p className= "text-center">
          NoteIt | Made with React | ©{" "}
          <a
            href="https://purvasharma.netlify.app/"
            className="link"
          >
            Purva Sharma{" "}
          </a>
          |
        </p>
      </footer>
    </>
  );
}

export {Footer};
