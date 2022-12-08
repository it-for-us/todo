import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { MdLogout } from 'react-icons/md'

export default function NavDesktop({ setIsLogin, isLogin, setLoading }) {
  const navigate = useNavigate();

  return (
    <div className="nav-desktop">
      <div onClick={() => navigate("/")} className="logo">
        {/* <img src="trello.png" alt="logo" /> */}
        <h4>IT4US</h4>
        <h2>TODO</h2>
      </div>
      <ul>
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
      </ul>
    </div>
  );
}
