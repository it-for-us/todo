import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
// import { Link, useNavigate } from "react-router-dom";

export default function NavMobile({ setIsLogin, isLogin, setLoading }) {
  const [toggle, setToggle] = useState(false);
  // const navigate = useNavigate();
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div className="nav-mobile">
        <div
          // onClick={() => navigate("/")}
          className="logo"
        >
          {/* <img src="trello.png" alt="logo" /> */}
          <h4>IT4US</h4>
          <h2>TODO</h2>
        </div>

        {!toggle ? (
          <MenuIcon
            style={{ color: "white" }}
            onClick={handleToggle}
            className="nav-burger-menü"
          />
        ) : (
          <MenuOpenIcon
            style={{ color: "white" }}
            onClick={handleToggle}
            className="nav-burger-menü"
          />
        )}
      </div>
      {toggle ? (
        <div className="nav-toggle-items">
          <ul>
            {/* <Link to={"/about"}>About</Link>
            <Link to={"/contact"}>Contact</Link> */}
            <a href="/about" rel="noreferrer">
              About
            </a>
            <a href="/contact" rel="noreferrer">
              Contact
            </a>
          </ul>
        </div>
      ) : null}
    </>
  );
}
