import { useEffect, useState } from 'react';
import './app.css';
import Navbar from './components/cointainer/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { Routes,  Route, useNavigate } from "react-router-dom";
import { kakaoLoginCheck } from './service/kakaoLogin';
import { firebaseLoginCheck } from './service/firebaseLogin';


function App() {
  const [ login, setLogin] = useState({ ID: "", NAME: "", REGI_TYPE: "", state: false}); // 로그인 true, 로그아웃 false
  const [ alarm, setAlarm ] = useState({ ID: "", NAME: "" });
  const navigate = useNavigate();

  useEffect(() => {
    console.log("111 login: ", login);

    kakaoLoginCheck().then((result) => {
      console.log("카카오 로그인여부 체크", result);

      result && setLogin(login => {
        const updated = { ...login };
        updated["ID"] = result.kakao_account.email;
        updated["NAME"] = result.kakao_account.profile.nickname;
        updated["REGI_TYPE"] = result.REGI_TYPE;
        updated["state"] = true;
        return updated
      });

    });
    firebaseLoginCheck().then((result) => {
      console.log("파이어베이스 로그인여부 체크", result);

      result && setLogin(login => {
        const updated = { ...login };
        updated["ID"] = result.email;
        updated["NAME"] = result.displayName;
        updated["REGI_TYPE"] = result.REGI_TYPE;
        updated["state"] = true;
        return updated
      });

      console.log("44444444login: ", login)
    });

  }, []);

  useEffect(() => {

  }, [login]);

  const goToHome = (user) => navigate("/", { replace: false, state: user });


  return (
    <>
      <div className="blur-img"></div>
      <Navbar login={login} setLogin={setLogin} goToHome={goToHome} />
      <Routes>
        <Route path="/*"  element={ <Home login={login} /> } />
        <Route path="/login"  element={ <Login login={login} setLogin={setLogin} goToHome={goToHome} /> }/>
      </Routes>
    </>
  );
}

export default App;
