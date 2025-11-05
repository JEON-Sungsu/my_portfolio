import React from 'react'
import styled from 'styled-components'

const StyledBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background-color: rgba(42, 42, 42, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  backdrop-filter: blur(10px);
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.white};
  text-transform: capitalize;
  white-space: nowrap;
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    background-color: rgba(42, 42, 42, 0.8);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
  }
`

function Badge({ children, className }) {
  return <StyledBadge className={className}>{children}</StyledBadge>
}

export default Badge
