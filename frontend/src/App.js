import Login from "./pages/Login";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./scss/App.scss";
function App() {
  return (
    <div className="App">
      <Header />
      <Login />
      <Footer />
    </div>
  );
}

export default App;
