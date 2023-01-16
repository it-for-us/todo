import Login from "./modules/auth//Login";
import SignUp from "./modules/auth/SignUp";
import Contact from "./pages/Contact";
import About from "./pages/About";
// import Footer from "./components/Footer";
// import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import CreateNewPass from "./pages/CreateNewPass";
import Home from "./pages/Home";
import { AuthProvider } from "./modules/auth/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import AuthRoute from "./routes/AuthRoute";

import "./assets/scss/main.scss";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        {/* <Header /> */}
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/createnewpass" element={<CreateNewPass />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
        {/* <Footer /> */}
      </AuthProvider>
    </div>
  );
}

export default App;
