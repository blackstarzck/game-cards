import { useEffect, useState } from 'react';
import './app.css';
import Navbar from './components/cointainer/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { BrowserRouter,  Routes,  Route } from "react-router-dom";

function App() {
  const [ login, setLogin] = useState(true); // 로그인 true, 로그아웃 false

  useEffect(() => {

  }, []);

  return (
    <BrowserRouter>
      <div className="blur-img"></div>
      <Navbar/>
      <Routes>
        <Route path="/*"  element={ <Home login={login}/> }/>
        <Route path="/login"  element={ <Login login={login}/> }/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
