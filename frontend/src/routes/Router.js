import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "../modules/auth/SignIn";
import SignUp from "../modules/auth/SignUp";
import Workspace from "../modules/workspace/Workspace";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import CreateNewPass from "../pages/CreateNewPass";
import ForgotPassword from "../pages/ForgotPassword";
import LandingPage from "../pages/LandingPage";
import MainPage from "../pages/MainPage";
import AuthRoute from "./AuthRoute";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export default function Router() {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<LandingPage />} />
      </Route>

      <Route element={<PublicRoute />}>
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/createnewpass" element={<CreateNewPass />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/main" element={<MainPage />} />
        <Route path="/workspace" element={<Workspace />} />
        {/* <Route path="/home" element={<Home />} /> */}
      </Route>
    </Routes>
  );
}
