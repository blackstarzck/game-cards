import { useEffect, useState } from 'react';
import './app.css';
import Navbar from './components/cointainer/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Join from './pages/Join/Join';
import { Routes,  Route, useNavigate } from "react-router-dom";
import { kakaoLoginCheck } from './service/kakaoLogin';
import { firebaseLoginCheck } from './service/firebaseLogin';
import { emailLoginCheck } from './service/emailLogin';


function App() {
  const [ login, setLogin] = useState({ID: "", NAME: "", EMAIL: "", REGI_TYPE: "", state: false}); // 로그인 true, 로그아웃 false
  const [ alarm, setAlarm ] = useState({ ID: "", NAME: "" });
  const navigate = useNavigate();


  const loginProcessCheck = () => {
    const sStorage = emailLoginCheck();
    if(sStorage && !login.state){
      console.log("이메일로 로그인했습니다.");
      setLogin({ID: sStorage.id, NAME: sStorage.name, EMAIL: sStorage.email, REGI_TYPE: "EMAIL", state: true});
    }

    const kakao = kakaoLoginCheck().then((result) => {
      console.log("kakaoLoginCheck: ", result);
      result && setLogin(login => {
        const updated = { ...login };
        updated["ID"] = result.id;
        updated["EMAIL"] = result.kakao_account.email;
        updated["NAME"] = result.kakao_account.profile.nickname;
        updated["REGI_TYPE"] = result.REGI_TYPE;
        updated["state"] = true;
        return updated
      });
      return
    });

    const firebase = firebaseLoginCheck().then((result) => {
      console.log("firebaseLoginCheck: ", result);
      result && setLogin(login => {
        const updated = { ...login };
        updated["ID"] = result.email;
        updated["email"] = result.email;
        updated["NAME"] = result.displayName;
        updated["REGI_TYPE"] = result.REGI_TYPE;
        updated["state"] = true;
        return updated
      });
      return
    });
  }

  useEffect(() => {
    loginProcessCheck();
  }, []);


  const goToHome = (user) => navigate("/", { replace: false, state: user });


  return (
    <>
      <div className="blur-img"></div>
      <Navbar login={login} setLogin={setLogin} goToHome={goToHome} />
      <Routes>
        <Route path="/*" element={ <Home login={login} /> } />
        <Route path="/login" element={ <Login login={login} setLogin={setLogin} goToHome={goToHome} /> }/>
        <Route path="/join/:depends" element={ <Join login={login} setLogin={setLogin} goToHome={goToHome} /> }/>
      </Routes>
    </>
  );
}

export default App;
