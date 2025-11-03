import React from 'react'
import styled from 'styled-components'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const FooterContainer = styled.footer`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.gray};
  text-align: center;
`

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const SocialLink = styled.a`
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.text};
  transition: color ${({ theme }) => theme.transition.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Copyright = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textLight};
`

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <FooterContainer>
      <SocialLinks>
        <SocialLink
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </SocialLink>
        <SocialLink
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </SocialLink>
        <SocialLink
          href="mailto:your@email.com"
          aria-label="Email"
        >
          <FaEnvelope />
        </SocialLink>
      </SocialLinks>
      <Copyright>© {currentYear} Your Name. All rights reserved.</Copyright>
    </FooterContainer>
  )
}

export default Footer
