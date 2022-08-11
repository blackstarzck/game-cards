import React from 'react'
import { DefaultButton, UploadButton, RecruitButton, GetButton, EditTitleButton, SaveTitleButton, ClearButton, ArrowDownButton, AddButton, RemoveButton, ResetButton, SaveButton, ViewButton, KeepButton, LevelUpButton, StatButton, SkillButton } from './Button.elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFolderMagnifyingGlass, faCards, faCardClub, faPenToSquare, faFloppyDiskPen, faArrowRotateLeft, faFloppyDiskCircleArrowRight } from '@fortawesome/pro-thin-svg-icons'
import { faPlus, faMinus, faCircleArrowUp, faSparkles } from '@fortawesome/pro-solid-svg-icons'
import { faCircleXmark, faChevronDown } from '@fortawesome/pro-light-svg-icons'
 
library.add(faFolderMagnifyingGlass, faCards, faPenToSquare, faFloppyDiskPen, faCircleXmark, faChevronDown, faPlus, faMinus, faArrowRotateLeft, faFloppyDiskCircleArrowRight, faCircleArrowUp);

export const Button = ({ children, ...props }) => {
  return <DefaultButton {...props}>{children}</DefaultButton>
}

Button.Upload = ({ ...props }) => <UploadButton {...props}>파일선택<FontAwesomeIcon icon={faFolderMagnifyingGlass} /></UploadButton>

Button.Recruit = ({ ...props }) => <RecruitButton defChecked {...props}>NEW<FontAwesomeIcon icon={faCards} /></RecruitButton>

Button.GetPrev = ({ ...props }) => <GetButton {...props}>LVL UP<FontAwesomeIcon icon={faCardClub} /></GetButton>

Button.EditTitle = ({ ...props }) => <EditTitleButton {...props}><FontAwesomeIcon icon={faPenToSquare} /></EditTitleButton>

Button.SaveTitle = ({ ...props }) => <SaveTitleButton {...props}><FontAwesomeIcon icon={faFloppyDiskPen} /></SaveTitleButton>

Button.TextClear = ({ ...props }) => <ClearButton {...props}><FontAwesomeIcon icon={faCircleXmark} /></ClearButton>

Button.ArrowDown = ({ ...props }) => <ArrowDownButton {...props}><FontAwesomeIcon icon={faChevronDown} /></ArrowDownButton>

Button.StatAdd = ({ ...props }) => <AddButton {...props}><FontAwesomeIcon icon={faPlus} /></AddButton>

Button.StatRemove = ({ ...props }) => <RemoveButton {...props}><FontAwesomeIcon icon={faMinus} /></RemoveButton>

Button.Reset = ({ ...props }) => <ResetButton {...props}><FontAwesomeIcon icon={faArrowRotateLeft} /></ResetButton>

Button.Save = ({ ...props }) => <SaveButton {...props}><FontAwesomeIcon icon={faFloppyDiskCircleArrowRight} /></SaveButton>

Button.ViewInfo = ({ ...props }) => <ViewButton {...props}>설명보기</ViewButton>

Button.KeepCard = ({ ...props }) => <KeepButton {...props}>보관하기</KeepButton>

Button.LevelUp = ({ ...props }) => <LevelUpButton {...props}><FontAwesomeIcon icon={faCircleArrowUp} /></LevelUpButton>

Button.Stat = () => <StatButton><b>능</b><b>력</b><b>치</b><FontAwesomeIcon icon={faSparkles} /></StatButton>

Button.Skill = () => <SkillButton><b>스</b><b>킬</b><FontAwesomeIcon icon={faSparkles} /></SkillButton>