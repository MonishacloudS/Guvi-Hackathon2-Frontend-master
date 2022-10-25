import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [expand, setExpand] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg fs-5 border-bottom">
        <div className="container-fluid container-fluid-relative">
          <NavLink to="/" className="navbar-brand">
            <span
              className="iconify default-color"
              data-icon="emojione-monotone:letter-r"
              data-width="80"
              data-height="80"
            ></span>
          </NavLink>

          {!expand && (
            <div
              onClick={() => {
                setExpand((expand) => !expand);
              }}
            >
              <span
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                className="navbar-toggler iconify default-color"
                data-icon="codicon:three-bars"
                data-width="60"
                data-height="60"
              ></span>
            </div>
          )}
          {expand && (
            <div
              onClick={() => {
                setExpand((expand) => !expand);
              }}
            >
              <span
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                className="navbar-toggler iconify default-color"
                data-icon="akar-icons:cross"
                data-width="60"
                data-height="60"
              ></span>
            </div>
          )}

          <div
            className="collapse navbar-collapse navbar-relative"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <NavLink className="nav-link text-dark items p-4" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link text-dark items p-4" to="/products">
                Products
              </NavLink>
              <NavLink className="nav-link text-dark items p-4" to="/carts">
                Carts
              </NavLink>
              <NavLink className="nav-link text-dark items p-4" to="/contactus">
                Contact Us
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
