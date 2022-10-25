import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="heading-relative">
        <img
          src="https://tinyurl.com/rentalbackgroundimage"
          className="backgroundImage"
        />
        <div className="heading-absolute">
          <div className="title-design">
            <p>List your rental.</p>
            <p>All in one place with Rental App.</p>
            <p
              className="d-inline"
              onClick={() => {
                window.scrollBy({
                  top: 800,
                  left: 400,
                  behavior: "smooth",
                });
              }}
            >
              <span
                className="iconify cursor-design"
                data-icon="akar-icons:arrow-down-thick"
                style={{ color: "#ffffff" }}
              ></span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
