import { axiosSetup } from './app/setup-axios';
import Router from './routes/Router';
import { Route, Routes } from 'react-router-dom';
import './assets/scss/main.scss';

function App() {
  axiosSetup();
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Router />} />
      </Routes>
    </div>
  );
}

export default App;
