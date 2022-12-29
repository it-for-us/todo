import Login from "./modules/auth//Login";
import SignUp from "./modules/auth/SignUp";
import Contact from "./pages/Contact";
import About from "./pages/About";
// import Footer from "./components/Footer";
// import Header from "./components/Header";
import "./scss/App.scss";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import CreateNewPass from "./pages/CreateNewPass";
import Home from "./pages/Home";
import userContext from "./contexts/UserContext";
import { AuthProvider } from "./modules/auth/AuthContext";
import ProtectedRoute from "./modules/routes/ProtectedRoute";
import PublicRoute from "./modules/routes/PublicRoute";
import { useContext } from "react";
function App() {
  const { isLogin } = useContext(userContext);
  console.log("islogin", isLogin);
  return (
    <div className="App">
      <AuthProvider>
        {/* <Header /> */}
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
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
