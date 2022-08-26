import React, { useEffect, useRef, useState } from 'react'
import { UploadButton, RecruitButton, GetButton, EditTitleButton, SaveTitleButton, ClearButton, ArrowDownButton, AddButton, RemoveButton, ResetButton, SaveButton, ViewButton, KeepButton, LevelUpButton, StatButton, SkillButton, SearchButton, YesButton, NoButton, LoginButton, GoogleButton, KakaoButton, NaverButton, EyeOpenButton, EyeCloseButton, SignButton, InfoButton, DeleteButton, SelectCardButton, BattleButton } from './Button.elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFolderMagnifyingGlass, faCards, faCardClub, faPenToSquare, faFloppyDiskPen, faArrowRotateLeft, faFloppyDiskCircleArrowRight, faTrashCan, faMagnifyingGlassPlus } from '@fortawesome/pro-thin-svg-icons'
import { faPlus, faMinus, faCircleArrowUp, faSparkles, faEyeSlash, faEye, faMagnifyingGlass } from '@fortawesome/pro-solid-svg-icons'
import { faCircleXmark, faChevronDown } from '@fortawesome/pro-light-svg-icons'
import { gsap } from "gsap"
import { kakaoLogin } from "../../service/kakaoLogin"
import { firebaseLogin } from '../../service/firebaseLogin'

library.add(faTrashCan, faMagnifyingGlassPlus, faEye, faEyeSlash, faFolderMagnifyingGlass, faCards, faPenToSquare, faFloppyDiskPen, faCircleXmark, faChevronDown, faPlus, faMinus, faArrowRotateLeft, faFloppyDiskCircleArrowRight, faCircleArrowUp, faMagnifyingGlass);


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

export const ButtonRecruit = ({selectNewOrPrev, newCard}) => {
  return(
    <RecruitButton
      select={newCard}
      onClick={() => selectNewOrPrev("NEW")}>NEW
      <FontAwesomeIcon icon={faCards} />
    </RecruitButton>
  );
}

export const ButtonGetPrev = ({selectNewOrPrev, newCard}) => {
  return(
    <GetButton
      select={newCard}
      onClick={() => selectNewOrPrev("PREV")}>LVL UP
      <FontAwesomeIcon icon={faCardClub} />
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
    updateCard({ key: "NICK", value: names["NICK"] || mainCard.NICK });
    updateCard({ key: "JOB_KR", value: names["JOB_KR"] || mainCard.JOB_KR });
    updateCard({ key: "JOB_EN", value: names["JOB_EN"] || mainCard.JOB_EN });
    handleEditState();
    console.log("ButtonSaveTitle:", { NICK: names["NICK"], JOB_KR: names["JOB_KR"], JOB_EN: names["JOB_EN"] });
  }

  return(
    <SaveTitleButton onClick={onClick} >
      <FontAwesomeIcon icon={faFloppyDiskPen} />
    </SaveTitleButton>
  );
}

export const ButtonTextClear = ({className, setInputVal, target}) => {
  const onClick = () => {
    setInputVal("");
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

export const ButtonReset = ({imgLoaded}) => {
  return(
    <ResetButton imgLoaded={imgLoaded}><FontAwesomeIcon icon={faArrowRotateLeft} /></ResetButton>
  );
}

export const ButtonSave = ({imgLoaded}) => <SaveButton imgLoaded={imgLoaded}><FontAwesomeIcon icon={faFloppyDiskCircleArrowRight} /></SaveButton>

export const ButtonViewInfo = ({imgLoaded, viewCardInfo}) => {
  return(
    <ViewButton onClick={() => imgLoaded && viewCardInfo()} imgLoaded={imgLoaded}>설명보기</ViewButton>
  );
}

export const ButtonKeepCard = ({imgLoaded, mainCard, keepSelectedCard, notice, setNotice}) => {
  const handleClick = async () => {
    const select = imgLoaded && await keepSelectedCard(mainCard);
    select && setNotice(!notice);

    console.log("보관결과(select): ", select);
  }
  return(
    <KeepButton imgLoaded={imgLoaded} onClick={handleClick}>보관하기</KeepButton>
  );
}

export const ButtonLevelUp = ({imgLoaded}) => {
  return(
    <LevelUpButton imgLoaded={imgLoaded}><FontAwesomeIcon icon={faCircleArrowUp} /></LevelUpButton>
  );
}

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

export const ButtonGoogle = ({login, setLogin, redirect}) => {
  const onClick = () => {
    !login.state ?
    firebaseLogin(redirect).then((result) => {
      setLogin({ REGI_TYPE: result.REGI_TYPE, ID: result.user.email, NAME: result.user.displayName, EMAIL:result.user.email, state: true });
    }) : alert("이미 로그인이 되어있습니다.");
  }
  return(
    <GoogleButton onClick={() => onClick()} />
  );
}

export const ButtonKakao = ({login, setLogin, redirect}) => {
  const onClick = () => {
    !login.state ?
    kakaoLogin(redirect).then((result) => {
      setLogin({ REGI_TYPE: result.REGI_TYPE, ID: String(result.id), NAME: result.kakao_account.profile.nickname, EMAIL: result.kakao_account.email, state: true });
    }) : alert("이미 로그인이 되어있습니다.");
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

export const ButtonCardInfo = ({visible, onClick}) => {
  return(
    <InfoButton onClick={() => onClick(!visible)}><FontAwesomeIcon icon={faMagnifyingGlassPlus}/></InfoButton>
  );
}

export const ButtonCardDelete = () => {
  return(
    <DeleteButton><FontAwesomeIcon icon={faTrashCan}/></DeleteButton>
  );
}

export const ButtonSelectCard = () => {
  return(
    <SelectCardButton>Lv UP</SelectCardButton>
  );
}

export const ButtonBattle = () => {
  return(
    <BattleButton>대결준비</BattleButton>
  );
}