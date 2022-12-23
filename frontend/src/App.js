import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./scss/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import CreateNewPass from "./pages/CreateNewPass";
import Home from "./pages/Home";
import { UserContextProvider } from "./contexts/UserContext";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/createnewpass" element={<CreateNewPass />} />
            <Route />
          </Routes>
          <Footer />
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
