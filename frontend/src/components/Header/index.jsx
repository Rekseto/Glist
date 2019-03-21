import React from "react";
import {Link} from "react-router-dom";
import "./index.css";

export default ({}) => {
  return (
    <header className="header">
      <h1>Glist</h1>
      <nav className="navigation">
        <ul className="navigation__list">
          <li className="navigation__element">
            <Link to="/" className="navigation__link">
              Home
            </Link>
          </li>
          <li className="navigation__element">
            <Link to="/" className="navigation__link">
              Home
            </Link>
          </li>
          <li className="navigation__element">
            <Link to="/" className="navigation__link">
              Home
            </Link>
          </li>
          <li className="navigation__element">
            <Link to="/" className="navigation__link">
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
