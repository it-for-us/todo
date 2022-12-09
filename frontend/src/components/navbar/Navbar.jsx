import React from "react";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

export default function Navbar({ isLogin, setIsLogin, setLoading }) {
  return (
    <div className="nav-bar">
      <NavDesktop
        setIsLogin={setIsLogin}
        isLogin={isLogin}
        setLoading={setLoading}
      />
      <NavMobile
        setIsLogin={setIsLogin}
        isLogin={isLogin}
        setLoading={setLoading}
      />
    </div>
  );
}
