import React from 'react'
import { DescriptionLi, DescriptionSpan, CardMainTitle, CardSubTitle, SectionTitle, FrdSectionHeading } from './Text.elements'

export const Description = ({ children, ...props }) => <DescriptionSpan {...props}>{children}</DescriptionSpan>
export const DescriptionLI = ({ children, ...props }) => <DescriptionLi {...props}>{children}</DescriptionLi>


export const TitleSection = ({ children, ...props }) => <SectionTitle {...props}>{children}</SectionTitle>
export const TitleNickName = ({ children, ...props }) => <CardMainTitle {...props}>{children}</CardMainTitle>
export const TitleJob = ({ children, ...props }) => <CardSubTitle {...props}>{children}</CardSubTitle>

export const ResultHeading = ({ children, ...props }) => <FrdSectionHeading {...props}>{children}</FrdSectionHeading>
