
import Login from "./modules/auth//Login";
import SignUp from "./modules/auth/SignUp";
import Contact from "./pages/Contact";
import About from "./pages/About";
// import Footer from "./components/Footer";
// import Header from "./components/Header";
import "./scss/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import CreateNewPass from "./pages/CreateNewPass";
import Home from "./pages/Home";
import { UserContextProvider } from "./contexts/UserContext";
import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  console.log(isLogin);
  return (
    <div className="App">
      <BrowserRouter>
        <UserContextProvider>
          {/* <Header /> */}
          <Routes>
            <Route
              path="/login"
              element={<Login setIsLogin={setIsLogin} isLogin={isLogin} />}
            />
            <Route
              path="/"
              element={
                isLogin ? (
                  <Home />
                ) : (
                  <Login setIsLogin={setIsLogin} isLogin={isLogin} />
                )
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/createnewpass" element={<CreateNewPass />} />
            <Route />
          </Routes>
          {/* <Footer /> */}
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
