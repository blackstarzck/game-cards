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
const loginRecord = (id, name, email, state) => {
  db.loginCheck(id, name, email, state);
}

function App() {
  const [ login, setLogin] = useState({ID: "", NAME: "", EMAIL: "", REGI_TYPE: "", state: false}); // 로그인 true, 로그아웃 false
  const [ cards, setCards ] = useState(setInitDatas("USER_CARDS"));
  const [ frd, setFrd ] = useState(setInitDatas("USER_FRDS"));
  const [ alarm, setAlarm ] = useState(setInitDatas("ALARM_TABLE"));

  const navigate = useNavigate();

  const loginProcessCheck = () => {
    const sStorage = emailLoginCheck();
    if(sStorage && !login.state){
      // console.log("이메일로 로그인했습니다. ")
      setLogin({ID: sStorage.id, NAME: sStorage.name, EMAIL: sStorage.email, REGI_TYPE: "EMAIL", state: true});
    }

    const kakao = kakaoLoginCheck().then((result) => {
      // console.log("카카오로 로그인했습니다.", result)
      result && setLogin(login => {
        const updated = { ...login };
        updated["ID"] = String(result.id);
        updated["EMAIL"] = result.kakao_account.email;
        updated["NAME"] = result.kakao_account.profile.nickname;
        updated["REGI_TYPE"] = result.REGI_TYPE;
        updated["state"] = true;
        return updated
      });
      return
    });

    const firebase = firebaseLoginCheck().then((result) => {
      // console.log("파이어베이스로 로그인했습니다.", result)
      result && setLogin(login => {
        const updated = { ...login };
        updated["ID"] = result.email;
        updated["EMAIL"] = result.email;
        updated["NAME"] = result.displayName;
        updated["REGI_TYPE"] = result.REGI_TYPE;
        updated["state"] = true;
        return updated
      });
      return
    });

  }

  const onlineCheck = (USER_FRDS) => {
    if(!login.ID) return;
    const copied = { ...USER_FRDS };
    copied?.FRDS_INFO?.map((frd) => {
      db.frdOnlineCheck(frd.FRD_ID, status => {
        if(status === true) frd.LOGIN = true;
        if(status === false) frd.LOGIN = false;
      });
    });
    return copied
  }

  const getInitTableDatas = async () => { // 초기 데이터 설정
    const USER_ID = login.ID || "", USER_NAME = login.NAME || ""; 
    
    const USER_CARDS = await db.getSingleData("USER_CARDS", USER_ID);
    if(USER_CARDS) setCards({ ...cards, ...USER_CARDS, USER_ID, USER_NAME });
    if(!USER_CARDS) setCards({ ...cards, USER_ID, USER_NAME });

    const USER_FRDS = await db.getSingleData("USER_FRDS", USER_ID);
    const status = await onlineCheck(USER_FRDS);
    if(USER_FRDS) setFrd({ ...frd, ...USER_FRDS, ...status, USER_ID, USER_NAME });
    if(!USER_FRDS) setFrd({ ...frd, USER_ID, USER_NAME });


    const ALARM_TABLE = await db.getSingleData("ALARM_TABLE", USER_ID);
    if(ALARM_TABLE) setAlarm({ ...alarm, ...ALARM_TABLE, USER_ID, USER_NAME });
    if(!ALARM_TABLE) setAlarm({ ...alarm, USER_ID, USER_NAME });
  }

  const goToHome = (user) => navigate("/", { replace: false, state: user });

  useEffect(() => {
    loginProcessCheck();
  }, []);

  useEffect(() => {
    login.state && console.log(`%c로그인되었습니다. REGI_TYPE: ${login.REGI_TYPE}, ID: ${login.ID}`, "color: goldenrod");
    login.state || console.log(`%c로그 아웃되었습니다.`, "color: red");

    if(login.state){
      getInitTableDatas();
      loginRecord(login.ID, login.NAME, login.EMAIL, true);
    }

    return () => {
      login.ID && loginRecord(login.ID, login.NAME, login.EMAIL, false);
      onlineCheck();
      setCards(setInitDatas("USER_CARDS"));
      setFrd(setInitDatas("USER_FRDS"));
      setAlarm(setInitDatas("ALARM_TABLE"));
    }
  }, [login]);

  //  사이트 이탈 감지
  window.onbeforeunload = () => login.ID && loginRecord(login.ID, login.NAME, login.EMAIL, false);

  return (
    <>
      <div className="blur-img"></div>
      <Navbar
        login={login}
        setCards={setCards} //로그아웃 시 모든 state의 ID, NAME 초기화 필요!
        setFrd={setFrd}
        setAlarm={setAlarm}
        setLogin={setLogin}
        goToHome={goToHome} />
      <Routes>
        <Route
          path="/*"
          element={
            <Home
              login={login}
              alarm={alarm}
              setAlarm={setAlarm}
              frd={frd}
              setFrd={setFrd}
              cards={cards}
              setCards={setCards} /> } />
        <Route path="/login" element={ <Login login={login} setLogin={setLogin} goToHome={goToHome} /> }/>
        <Route path="/join/:depends" element={ <Join login={login} setLogin={setLogin} goToHome={goToHome} /> }/>
      </Routes>
    </>
  );
}

export default App;
