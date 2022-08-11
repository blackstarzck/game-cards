import React from 'react'
import { UploadButton, RecruitButton, GetButton, EditTitleButton, SaveTitleButton, ClearButton, ArrowDownButton, AddButton, RemoveButton, ResetButton, SaveButton, ViewButton, KeepButton, LevelUpButton, StatButton, SkillButton } from './Button.elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFolderMagnifyingGlass, faCards, faCardClub, faPenToSquare, faFloppyDiskPen, faArrowRotateLeft, faFloppyDiskCircleArrowRight } from '@fortawesome/pro-thin-svg-icons'
import { faPlus, faMinus, faCircleArrowUp, faSparkles } from '@fortawesome/pro-solid-svg-icons'
import { faCircleXmark, faChevronDown } from '@fortawesome/pro-light-svg-icons'
 
library.add(faFolderMagnifyingGlass, faCards, faPenToSquare, faFloppyDiskPen, faCircleXmark, faChevronDown, faPlus, faMinus, faArrowRotateLeft, faFloppyDiskCircleArrowRight, faCircleArrowUp);


export const ButtonUpload = () => <UploadButton >파일선택<FontAwesomeIcon icon={faFolderMagnifyingGlass} /></UploadButton>

export const ButtonRecruit = () => <RecruitButton defChecked>NEW<FontAwesomeIcon icon={faCards} /></RecruitButton>

export const ButtonGetPrev = () => <GetButton>LVL UP<FontAwesomeIcon icon={faCardClub} /></GetButton>

export const ButtonEditTitle = () => <EditTitleButton ><FontAwesomeIcon icon={faPenToSquare} /></EditTitleButton>

export const ButtonSaveTitle = () => <SaveTitleButton ><FontAwesomeIcon icon={faFloppyDiskPen} /></SaveTitleButton>

export const ButtonTextClear = () => <ClearButton ><FontAwesomeIcon icon={faCircleXmark} /></ClearButton>

export const ButtonArrowDown = () => <ArrowDownButton ><FontAwesomeIcon icon={faChevronDown} /></ArrowDownButton>

export const ButtonStatAdd = () => <AddButton ><FontAwesomeIcon icon={faPlus} /></AddButton>

export const ButtonStatRemove = () => <RemoveButton ><FontAwesomeIcon icon={faMinus} /></RemoveButton>

export const ButtonReset = () => <ResetButton ><FontAwesomeIcon icon={faArrowRotateLeft} /></ResetButton>

export const ButtonSave = () => <SaveButton ><FontAwesomeIcon icon={faFloppyDiskCircleArrowRight} /></SaveButton>

export const ButtonViewInfo = () => <ViewButton >설명보기</ViewButton>

export const ButtonKeepCard = () => <KeepButton >보관하기</KeepButton>

export const ButtonLevelUp = () => <LevelUpButton ><FontAwesomeIcon icon={faCircleArrowUp} /></LevelUpButton>

export const ButtonStat = () => <StatButton><b>능</b><b>력</b><b>치</b><FontAwesomeIcon icon={faSparkles} /></StatButton>

export const ButtonSkill = () => <SkillButton><b>스</b><b>킬</b><FontAwesomeIcon icon={faSparkles} /></SkillButton>