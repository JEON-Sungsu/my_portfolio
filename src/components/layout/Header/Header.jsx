import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ $isScrolled, theme }) =>
    $isScrolled ? theme.colors.gray : 'transparent'};
  backdrop-filter: ${({ $isScrolled }) => ($isScrolled ? 'blur(10px)' : 'none')};
  border-bottom: ${({ $isScrolled, theme }) =>
    $isScrolled ? `1px solid ${theme.colors.grayDark}` : 'none'};
  transition: background-color ${({ theme }) => theme.transition.medium},
              backdrop-filter ${({ theme }) => theme.transition.medium};
  z-index: 1000;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md}
      ${({ theme }) => theme.spacing.lg};
  }
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.a`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.white};
  font-style: italic;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.white};
  transition: color ${({ theme }) => theme.transition.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.gradientStart};
  }

  &.active {
    color: ${({ theme }) => theme.colors.gradientStart};
  }
`;

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderContainer $isScrolled={isScrolled}>
      <Nav>
        <Logo href='#hero'>JEON Sungsu Portfolio</Logo>
        <NavLinks>
          <li>
            <NavLink href='#hero'>Home</NavLink>
          </li>
          <li>
            <NavLink href='#projects'>Projects</NavLink>
          </li>
          <li>
            <NavLink href='#experience'>Experience</NavLink>
          </li>
          <li>
            <NavLink href='#contact'>Contact</NavLink>
          </li>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
