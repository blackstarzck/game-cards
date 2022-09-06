import React, { useEffect, useRef, useState } from 'react'
import { UploadButton, RecruitButton, GetButton, EditTitleButton, SaveTitleButton, ClearButton, ArrowDownButton, AddButton, RemoveButton, ResetButton, SaveButton, ViewButton, KeepButton, LevelUpButton, StatButton, SkillButton, SearchButton, YesButton, NoButton, LoginButton, GoogleButton, KakaoButton, NaverButton, EyeOpenButton, EyeCloseButton, SignButton, InfoButton, DeleteButton, SelectCardButton, BattleButton, ScrollUpButton } from './Button.elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFolderMagnifyingGlass, faCards, faCardClub, faPenToSquare, faFloppyDiskPen, faArrowRotateLeft, faFloppyDiskCircleArrowRight, faTrashCan, faMagnifyingGlassPlus } from '@fortawesome/pro-thin-svg-icons'
import { faPlus, faMinus, faCircleArrowUp, faSparkles, faEyeSlash, faEye, faMagnifyingGlass } from '@fortawesome/pro-solid-svg-icons'
import { faCircleXmark, faChevronDown, faArrowUp } from '@fortawesome/pro-light-svg-icons'
import { gsap } from "gsap"
import { kakaoLogin } from "../../service/kakaoLogin"
import { firebaseLogin } from '../../service/firebaseLogin'

library.add(faTrashCan, faMagnifyingGlassPlus, faEye, faEyeSlash, faFolderMagnifyingGlass, faCards, faPenToSquare, faFloppyDiskPen, faCircleXmark, faChevronDown, faPlus, faMinus, faArrowRotateLeft, faFloppyDiskCircleArrowRight, faCircleArrowUp, faMagnifyingGlass, faArrowUp);


export const ButtonScrollUp = () => {
  const handleClick = () => window.scrollTo(0, 0);
  return(
    <ScrollUpButton onClick={handleClick}><FontAwesomeIcon icon={faArrowUp} /></ScrollUpButton>
  );
}

export const ButtonUpload = ({...props}) => {
  const handleClick = () => {
    console.log("click");
  }

  return(
    <>
      <input onChange={(e) => props.onChange(e)} type="file" name="" id="file" accept="image/*" required={true} multiple={false} hidden={true} />
      <UploadButton onClick={handleClick}>
        <label htmlFor={props.dailyCnt && "file"}>파일선택<FontAwesomeIcon icon={faFolderMagnifyingGlass} /></label>
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

export const ButtonStatAdd = ({increase}) => <AddButton onClick={increase} ><FontAwesomeIcon icon={faPlus} /></AddButton>

export const ButtonStatRemove = ({descrease}) => <RemoveButton onClick={descrease} ><FontAwesomeIcon icon={faMinus} /></RemoveButton>

export const ButtonReset = ({imgLoaded, reset, remain}) => <ResetButton onClick={reset} imgLoaded={imgLoaded} remain={remain}><FontAwesomeIcon icon={faArrowRotateLeft} /></ResetButton>

export const ButtonSave = ({imgLoaded, save, remain}) => <SaveButton onClick={save} imgLoaded={imgLoaded} remain={remain}><FontAwesomeIcon icon={faFloppyDiskCircleArrowRight} /></SaveButton>

export const ButtonViewInfo = ({imgLoaded, viewCardInfo}) => {
  return(
    <ViewButton onClick={() => imgLoaded && viewCardInfo()} imgLoaded={imgLoaded}>설명보기</ViewButton>
  );
}

export const ButtonKeepCard = ({imgLoaded, mainCard, keepSelectedCard, upgradeCard, notice, setNotice, cards, newCard}) => {
  const handleClick = () => {
    if(newCard === "NEW" && imgLoaded){
      if(cards.DAILY_CNT === 0){
        alert("오늘은 더이상 이미지를 업로드할 수 없습니다.");
        return;
      }
      if(mainCard.KEY){
        alert("이미 보관중인 카드입니다.");
        return;
      }

      keepSelectedCard(mainCard);
      setNotice(!notice);
    }
    if(newCard === "PREV" && imgLoaded){
      if(cards.DAILY_CNT === 0){
        alert("오늘은 더이상 이미지를 업로드할 수 없습니다.");
        return;
      }
      if(!mainCard.KEY){
        alert("레벨업을 위해서는 카드를 우선 보관해야합니다.");
        return;
      }
      upgradeCard(mainCard);
    }
  }
  return(
    <KeepButton imgLoaded={imgLoaded} onClick={handleClick}>{(newCard === "NEW") ? "보관하기" : "레벨업"}</KeepButton>
  );
}

export const ButtonStat = ({imgLoaded, remain}) => <StatButton imgLoaded={imgLoaded} remain={remain}><b>능</b><b>력</b><b>치</b>{ remain !== 0 && <FontAwesomeIcon icon={faSparkles} /> }</StatButton>

export const ButtonSkill = ({imgLoaded, disable}) => <SkillButton disable imgLoaded={imgLoaded}><b>스</b><b>킬</b><FontAwesomeIcon icon={faSparkles} /></SkillButton>

export const ButtonSearch = ({login, searchFunc}) => {
  return(
    <SearchButton login={login} onClick={login ? searchFunc : undefined} ><FontAwesomeIcon icon={faMagnifyingGlass} /></SearchButton>
  );
}

export const ButtonYes = ({handleClick, handleMouseEnter}) => <YesButton onMouseEnter={handleMouseEnter} onClick={() => handleClick(false)}>네</YesButton>;
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

export const ButtonCardDelete = ({handleClick}) => {
  return(
    <DeleteButton onClick={handleClick}><FontAwesomeIcon icon={faTrashCan}/></DeleteButton>
  );
}

export const ButtonSelectCard = ({handleClick, remain}) => {
  return(
    <SelectCardButton onClick={handleClick} remain={remain}>{remain ? remain : "Lv UP"}</SelectCardButton>
  );
}

export const ButtonBattle = ({active, handleClick}) => {
  return(
    <BattleButton active={active} onClick={handleClick}>대결준비</BattleButton>
  );
}