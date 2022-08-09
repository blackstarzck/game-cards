import React from 'react'
import { DefaultButton, UploadButton, RecruitButton, LevelUpButton, EditTitleButton, SaveTitleButton, ClearButton, ArrowDownButton } from './Button.elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFolderMagnifyingGlass, faCards, faCardClub, faPenToSquare, faFloppyDiskPen } from '@fortawesome/pro-thin-svg-icons'
import { faCircleXmark, faChevronDown } from '@fortawesome/pro-solid-svg-icons'
 
library.add(faFolderMagnifyingGlass, faCards, faPenToSquare, faFloppyDiskPen, faCircleXmark, faChevronDown);

export const Button = ({ children, ...props }) => {
  return <DefaultButton {...props}>{children}</DefaultButton>
}

Button.Upload = ({ children, ...props }) => <UploadButton {...props}>파일선택<FontAwesomeIcon icon={faFolderMagnifyingGlass} /></UploadButton>

Button.Recruit = ({ children, ...props }) => <RecruitButton defChecked {...props}>NEW<FontAwesomeIcon icon={faCards} /></RecruitButton>

Button.LevelUp = ({ children, ...props }) => <LevelUpButton {...props}>LVL UP<FontAwesomeIcon icon={faCardClub} /></LevelUpButton>

Button.EditTitle = ({ children, ...props }) => <EditTitleButton {...props}><FontAwesomeIcon icon={faPenToSquare} /></EditTitleButton>

Button.SaveTitle = ({ children, ...props }) => <SaveTitleButton {...props}><FontAwesomeIcon icon={faFloppyDiskPen} /></SaveTitleButton>

Button.TextClear = ({ children, ...props }) => <ClearButton {...props}><FontAwesomeIcon icon={faCircleXmark} /></ClearButton>

Button.ArrowDown = ({ children, ...props }) => <ArrowDownButton {...props}><FontAwesomeIcon icon={faChevronDown} /></ArrowDownButton>