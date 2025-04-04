import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  background: ${props => props.scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
  box-shadow: ${props => props.scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: ${props => props.scrolled ? '#333' : '#fff'};
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  transition: color 0.3s ease;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.scrolled ? '#333' : '#fff'};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 8px 16px;
  border-radius: 4px;

  &:hover {
    background: ${props => props.scrolled ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.scrolled ? '#333' : '#fff'};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background: white;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

const MobileNavLink = styled(Link)`
  display: block;
  color: #333;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 12px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <Nav scrolled={scrolled}>
      <NavContainer>
        <Logo to="/" scrolled={scrolled}>Fly Web</Logo>
        <NavLinks>
          <NavLink to="/" scrolled={scrolled}>Strona główna</NavLink>
          <NavLink to="/#about" scrolled={scrolled}>O nas</NavLink>
          <NavLink to="/#pricing" scrolled={scrolled}>Cennik</NavLink>
          <NavLink to="/#blog" scrolled={scrolled}>Blog</NavLink>
          <NavLink to="/visualization" scrolled={scrolled}>Wizualizacja</NavLink>
          <NavLink to="/#contact" scrolled={scrolled}>Kontakt</NavLink>
        </NavLinks>
        <MobileMenuButton 
          scrolled={scrolled} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </MobileMenuButton>
      </NavContainer>
      <MobileMenu isOpen={mobileMenuOpen}>
        <MobileNavLink to="/" onClick={() => setMobileMenuOpen(false)}>Strona główna</MobileNavLink>
        <MobileNavLink to="/#about" onClick={() => setMobileMenuOpen(false)}>O nas</MobileNavLink>
        <MobileNavLink to="/#pricing" onClick={() => setMobileMenuOpen(false)}>Cennik</MobileNavLink>
        <MobileNavLink to="/#blog" onClick={() => setMobileMenuOpen(false)}>Blog</MobileNavLink>
        <MobileNavLink to="/visualization" onClick={() => setMobileMenuOpen(false)}>Wizualizacja</MobileNavLink>
        <MobileNavLink to="/#contact" onClick={() => setMobileMenuOpen(false)}>Kontakt</MobileNavLink>
      </MobileMenu>
    </Nav>
  );
};

export default Navbar; 