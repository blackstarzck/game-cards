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
import Database from './service/database';
import { setInitDatas } from './data/data';

const db = new Database();

function App() {
  const [ login, setLogin] = useState({ID: "", NAME: "", EMAIL: "", REGI_TYPE: "", state: false}); // 로그인 true, 로그아웃 false
  const [ alarm, setAlarm ] = useState({ ID: "", NAME: "" });
  const [ cards, setCards ] = useState(setInitDatas("USER_CARDS"));

  const navigate = useNavigate();

  const loginProcessCheck = () => {
    const sStorage = emailLoginCheck();
    if(sStorage && !login.state){
      setLogin({ID: sStorage.id, NAME: sStorage.name, EMAIL: sStorage.email, REGI_TYPE: "EMAIL", state: true});
    }

    const kakao = kakaoLoginCheck().then((result) => {
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

  const getInitTableDatas = async () => { // 초기 데이터 설정
    const USER_ID = login.ID, USER_NAME = login.NAME; 
    const USER_CARDS = await db.getSingleData("USER_CARDS", USER_ID);
    USER_CARDS && setCards({ ...USER_CARDS, USER_ID, USER_NAME });
  }

  useEffect(() => {
    loginProcessCheck();
  }, []);

  useEffect(() => {
    login.state && console.log(`%c로그인되었습니다. REGI_TYPE: ${login.REGI_TYPE}, ID: ${login.ID}`, "color: goldenrod");
    login.state || console.log(`%c로그 아웃되었습니다.`, "color: red");

    if(login.state){
      getInitTableDatas();
      setCards({...cards, USER_ID: login.ID, USER_NAME: login.NAME })
    }
  }, [login]);


  const goToHome = (user) => navigate("/", { replace: false, state: user });


  return (
    <>
      <div className="blur-img"></div>
      <Navbar
        login={login}
        setCards={setCards} //로그아웃 시 모든 state의 ID, NAME 초기화 필요!
        setLogin={setLogin}
        goToHome={goToHome} />
      <Routes>
        <Route
          path="/*"
          element={
            <Home
              login={login}
              cards={cards}
              setCards={setCards}/> } />
        <Route path="/login" element={ <Login login={login} setLogin={setLogin} goToHome={goToHome} /> }/>
        <Route path="/join/:depends" element={ <Join login={login} setLogin={setLogin} goToHome={goToHome} /> }/>
      </Routes>
    </>
  );
}

export default App;
