import React from 'react'
import styled from 'styled-components'

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transition.fast};

  &:hover {
    transform: translateY(-4px);
  }
`

const IconWrapper = styled.div`
  width: ${({ size }) => size || '60px'};
  height: ${({ size }) => size || '60px'};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm};
  transition: background-color ${({ theme }) => theme.transition.fast};

  ${IconContainer}:hover & {
    background-color: ${({ theme }) => theme.colors.orange};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const IconLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-align: center;
  transition: color ${({ theme }) => theme.transition.fast};

  ${IconContainer}:hover & {
    color: ${({ theme }) => theme.colors.white};
  }
`

function IconLabelComponent({ iconPath, label, size, onClick }) {
  return (
    <IconContainer onClick={onClick}>
      <IconWrapper size={size}>
        <img src={iconPath} alt={label} />
      </IconWrapper>
      <IconLabel>{label}</IconLabel>
    </IconContainer>
  )
}

// 아이콘 매핑 헬퍼
export const icons = {
  mobile: { path: '/assets/icons/ic_mobile.svg', label: 'Mobile' },
  tablet: { path: '/assets/icons/ic_tablet.svg', label: 'Tablet' },
  laptop: { path: '/assets/icons/ic_laptop.svg', label: 'Laptop' },
  codeBlock: { path: '/assets/icons/ic_code_block.svg', label: 'Code Block' },
  qrcode: { path: '/assets/icons/ic_qrcode.svg', label: 'QR Code' },
}

export default IconLabelComponent
