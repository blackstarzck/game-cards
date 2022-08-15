import { useEffect, useState } from 'react';
import './app.css';
import Navbar from './components/cointainer/Navbar/Navbar';
import Home from './pages/Home/Home';

function App() {
  const [ login, setLogin] = useState(false); // 로그인 true, 로그아웃 false

  useEffect(() => {
    console.log("App:", login);
  }, [login]);

  return (
    <>
      <div className="blur-img"></div>
      <Navbar/>
      <Home login={login}/>
    </>
  );
}

export default App;
