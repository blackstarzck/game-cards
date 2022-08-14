import React from 'react'
import { DescriptionLi, DescriptionSpan, TitleDefault, CardMainTitle, CardSubTitle } from './Text.elements'

export const Description = ({ children, ...props }) => <DescriptionSpan {...props}>{children}</DescriptionSpan>

export const Title = ({ children, ...props }) => <TitleDefault {...props}>{children}</TitleDefault>
export const TitleNickName = ({ children, ...props }) => <CardMainTitle {...props}>{children}</CardMainTitle>
export const TitleJob = ({ children, ...props }) => <CardSubTitle {...props}>{children}</CardSubTitle>

export const DescriptionLI = ({ children, ...props }) => <DescriptionLi {...props}>{children}</DescriptionLi>