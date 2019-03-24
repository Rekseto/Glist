import React from "react";
import {Link} from "react-router-dom";
import "./index.css";

export default ({logout}) => {
  return (
    <header className="header">
      <h1>Glist</h1>
      <nav className="navigation">
        <ul className="navigation__list">
          <li className="navigation__element">
            <button className="profileBar__btn" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
