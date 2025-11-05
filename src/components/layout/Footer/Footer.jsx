import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.gray};
  text-align: center;
`

const Copyright = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textLight};
`

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <FooterContainer>
      <Copyright>© {currentYear} JEON-Sungsu. All rights reserved.</Copyright>
    </FooterContainer>
  )
}

export default Footer
