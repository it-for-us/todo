import { AuthProvider } from "./modules/auth/AuthContext";
import { axiosSetup } from "./app/setup-axios";
import "./assets/scss/main.scss";
import Router from "./routes/Router";

function App() {
  axiosSetup();
  return (
    <div className="App">
      <AuthProvider>
        <Router />
      </AuthProvider>
    </div>
  );
}

export default App;
