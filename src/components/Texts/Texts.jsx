import React from 'react'
import { DescriptionLi, DescriptionSpan, TitleDefault, CardMainTitle, CardSubTitle } from './Text.elements'

export const Description = ({ children, ...props }) => <DescriptionSpan {...props}>{children}</DescriptionSpan>

export const Title = ({ children, ...props }) => <TitleDefault {...props}>{children}</TitleDefault>

Title.NickName = ({ children, ...props }) => <CardMainTitle {...props}>{children}</CardMainTitle>
Title.Job = ({ children, ...props }) => <CardSubTitle {...props}>{children}</CardSubTitle>

Description.li = ({ children, ...props }) => <DescriptionLi {...props}>{children}</DescriptionLi>