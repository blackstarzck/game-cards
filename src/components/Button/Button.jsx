import React, { useEffect, useRef, useState } from 'react'
import { UploadButton, RecruitButton, GetButton, EditTitleButton, SaveTitleButton, ClearButton, ArrowDownButton, AddButton, RemoveButton, ResetButton, SaveButton, ViewButton, KeepButton, LevelUpButton, StatButton, SkillButton, SearchButton, YesButton, NoButton, LoginButton, GoogleButton, KakaoButton, NaverButton, EyeOpenButton, EyeCloseButton, SignButton } from './Button.elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFolderMagnifyingGlass, faCards, faCardClub, faPenToSquare, faFloppyDiskPen, faArrowRotateLeft, faFloppyDiskCircleArrowRight } from '@fortawesome/pro-thin-svg-icons'
import { faPlus, faMinus, faCircleArrowUp, faSparkles, faEyeSlash, faEye } from '@fortawesome/pro-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/pro-regular-svg-icons'
import { faCircleXmark, faChevronDown } from '@fortawesome/pro-light-svg-icons'
import { gsap } from "gsap"
import { kakaoLogin } from "../../service/kakaoLogin"
import { firebaseLogin } from '../../service/firebaseLogin'

library.add(faEye, faEyeSlash, faFolderMagnifyingGlass, faCards, faPenToSquare, faFloppyDiskPen, faCircleXmark, faChevronDown, faPlus, faMinus, faArrowRotateLeft, faFloppyDiskCircleArrowRight, faCircleArrowUp, faMagnifyingGlass);


export const ButtonUpload = ({...props}) => {
  return(
    <>
      <input onChange={(e) => props.onChange(e)} type="file" name="" id="file" accept="image/*" required={true} multiple={false} hidden={true} />
      <UploadButton>
        <label htmlFor="file">파일선택<FontAwesomeIcon icon={faFolderMagnifyingGlass} /></label>
      </UploadButton>
    </>
  );
}

export const ButtonRecruit = ({...props}) => {
  return(
    <RecruitButton 
      state={props.activeState}
      onClick={props.selectNewOrPrev}
      >NEW<FontAwesomeIcon icon={faCards} />
    </RecruitButton>
  );
}

export const ButtonGetPrev = ({...props}) => {
  return(
    <GetButton 
      state={props.activeState}
      onClick={props.selectNewOrPrev}
      >LVL UP<FontAwesomeIcon icon={faCardClub} />
    </GetButton>
  );
}

export const ButtonEditTitle = ({handleEditState, imgLoaded}) => {

  const onClick = () => {
    imgLoaded && handleEditState();
  }

  return(
    <EditTitleButton onClick={onClick} imgLoaded={imgLoaded}>
      <FontAwesomeIcon icon={faPenToSquare} />
    </EditTitleButton>
  );
}

export const ButtonSaveTitle = ({handleEditState, updateCard, names, mainCard }) => {
  const onClick = () => {
    updateCard({ key: "nickName", value: names["nickName"] || mainCard.nickName });
    updateCard({ key: "jobKR", value: names["jobKR"] });
    updateCard({ key: "jobEN", value: names["jobEN"] });
    handleEditState();
    console.log("ButtonSaveTitle:", { nickName: names["nickName"], jobKR: names["jobKR"], jobEN: names["jobEN"] });
  }

  return(
    <SaveTitleButton onClick={onClick} >
      <FontAwesomeIcon icon={faFloppyDiskPen} />
    </SaveTitleButton>
  );
}

export const ButtonTextClear = ({className, setInputVal, target, handleNames}) => {
  const onClick = () => {
    console.log("지워~!")
    setInputVal("");
    handleNames && handleNames({ key: "nickName", value: "" });
  }
  return(
    <ClearButton className={className} name={target} onClick={onClick} >
      <FontAwesomeIcon icon={faCircleXmark} />
    </ClearButton>
  );
} 

export const ButtonArrowDown = ({...props}) => {
  const el = useRef(null);
  const tl = useRef(null);
  const toggle = props.clickState;

  useEffect(() => {
      tl.current = gsap.timeline({ pause: true });
      tl.current.to(el.current, { rotate: 180, duration: 0.3 });
  }, []);

  useEffect(() => {
      toggle ? tl.current.play() : tl.current.reverse() ;
  },[toggle]);

  return(
    <ArrowDownButton ><FontAwesomeIcon ref={el} icon={faChevronDown} /></ArrowDownButton>
  );
}

export const ButtonStatAdd = () => <AddButton ><FontAwesomeIcon icon={faPlus} /></AddButton>

export const ButtonStatRemove = () => <RemoveButton ><FontAwesomeIcon icon={faMinus} /></RemoveButton>

export const ButtonReset = ({imgLoaded}) => <ResetButton imgLoaded={imgLoaded}><FontAwesomeIcon icon={faArrowRotateLeft} /></ResetButton>

export const ButtonSave = ({imgLoaded}) => <SaveButton imgLoaded={imgLoaded}><FontAwesomeIcon icon={faFloppyDiskCircleArrowRight} /></SaveButton>

export const ButtonViewInfo = ({imgLoaded, viewCardInfo}) => {
  const onClick = () => {
    imgLoaded && viewCardInfo();
  }
  return(
    <ViewButton onClick={onClick} imgLoaded={imgLoaded}>설명보기</ViewButton>
  );
}

export const ButtonKeepCard = ({imgLoaded}) => <KeepButton imgLoaded={imgLoaded}>보관하기</KeepButton>

export const ButtonLevelUp = () => <LevelUpButton ><FontAwesomeIcon icon={faCircleArrowUp} /></LevelUpButton>

export const ButtonStat = ({imgLoaded}) => <StatButton imgLoaded={imgLoaded}><b>능</b><b>력</b><b>치</b><FontAwesomeIcon icon={faSparkles} /></StatButton>

export const ButtonSkill = ({imgLoaded, disable}) => <SkillButton disable imgLoaded={imgLoaded}><b>스</b><b>킬</b><FontAwesomeIcon icon={faSparkles} /></SkillButton>

export const ButtonSearch = ({login, searchFunc}) => {
  return(
    <SearchButton login={login} onClick={login ? searchFunc : undefined} ><FontAwesomeIcon icon={faMagnifyingGlass} /></SearchButton>
  );
}

export const ButtonYes = ({handleClick}) => <YesButton onClick={() => handleClick(false)}>네</YesButton>;
export const ButtonNo = ({handleClick}) => <NoButton onClick={() => handleClick(false)}>아니오</NoButton>;

export const ButtonLogin = ({emailLogin}) => {
  return(
    <LoginButton onClick={emailLogin}>로그인</LoginButton>
  );
}

export const ButtonGoogle = ({setLogin, redirect}) => {
  const onClick = () => {
    firebaseLogin(redirect).then((result) => {
      setLogin({ REGI_TYPE: result.REGI_TYPE, ID: result.user.email, NAME: result.user.displayName, state: true });
    });
  }
  return(
    <GoogleButton onClick={() => onClick()} />
  );
}

export const ButtonKakao = ({setLogin, redirect}) => {
  const onClick = () => {
    kakaoLogin(redirect).then((result) => {
      setLogin({ REGI_TYPE: result.REGI_TYPE, ID: result.kakao_account.email, NAME: result.kakao_account.profile.nickname, state: true });
    });
  }
  return(
      <KakaoButton onClick={() => onClick()} />
    );
}
export const ButtonNaver = () => {
  return(
    <NaverButton/>
  );
}

export const ButtonEyeOpen = ({eyeOpen, setEye}) => {
  const handleEye = (e) => {
    e.preventDefault();
    setEye(!eyeOpen);
  }

  return(
  <EyeOpenButton eyeOpen={eyeOpen} onClick={handleEye}><FontAwesomeIcon icon={faEye} /></EyeOpenButton>
  );
}
export const ButtonEyeClose = ({eyeOpen, setEye}) => {
  const handleEye = (e) => {
    e.preventDefault();
    setEye(!eyeOpen);
  }

  return(
    <EyeCloseButton eyeOpen={eyeOpen} onClick={handleEye}><FontAwesomeIcon icon={faEyeSlash} /></EyeCloseButton>
  );
}

export const ButtonSign = ({handleSignIn}) => {

  return(
    <SignButton onClick={handleSignIn}>가입하기</SignButton>
  );
}