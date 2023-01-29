import Login from './modules/auth//Login';
import SignUp from './modules/auth/SignUp';
import Contact from './pages/Contact';
import About from './pages/About';
import { Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import CreateNewPass from './pages/CreateNewPass';
import { AuthProvider } from './modules/auth/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import AuthRoute from './routes/AuthRoute';
import { axiosSetup } from './app/setup-axios';
import Landing from "./pages/Landing";
import MainLayout from "./pages/MainLayout";
import "./assets/scss/main.scss";

function App() {
  axiosSetup();
  return (
    <div className="App">
      <AuthProvider>
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
            <Route path="/mainlayout" element={<MainLayout />} />
            {/* <Route path="/home" element={<Home />} /> */}
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
