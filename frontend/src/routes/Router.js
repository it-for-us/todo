import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../modules/auth/Login";
import SignUp from "../modules/auth/SignUp";
import Workspace from "../modules/workspace/Workspace";
import About from "../pages/About";
import Contact from "../pages/Contact";
import CreateNewPass from "../pages/CreateNewPass";
import ForgotPassword from "../pages/ForgotPassword";
import Landing from "../pages/Landing";
import Main from "../pages/Main";
import AuthRoute from "./AuthRoute";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Landing />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/createnewpass" element={<CreateNewPass />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/main" element={<Main />} />
          <Route path="/workspace" element={<Workspace />} />
          {/* <Route path="/home" element={<Home />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
