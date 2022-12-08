import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

export default function NavMobile({ setIsLogin, isLogin, setLoading }) {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div className="nav-mobile">
        <div onClick={() => navigate("/")} className="logo">
          {/* <img src="trello.png" alt="logo" /> */}
          <h4>IT4US</h4>
          <h2>TODO</h2>
        </div>

        {!toggle ? (
          <AiOutlineMenu
            style={{ color: "white" }}
            onClick={handleToggle}
            className="nav_menü"
          />
        ) : (
          <i
            style={{ color: "white" }}
            onClick={handleToggle}
            class="las la-times nav-menü"
          ></i>
        )}
      </div>
      {toggle ? (
        <div className="nav-toggle-items">
          <ul>
            <Link to={"/about"}>About</Link>
            <Link to={"/contact"}>Contact</Link>
          </ul>
        </div>
      ) : null}
    </>
  );
}
