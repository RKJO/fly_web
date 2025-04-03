import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(30, 60, 114, 0.95);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(5px);
  z-index: 1000;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: ${props => props.$active ? '#00ff87' : 'white'};
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.2s;

  &:hover {
    color: #00ff87;
  }
`;

const Navbar = () => {
  const location = useLocation();

  return (
    <Nav>
      <Logo to="/">Made4Fly</Logo>
      <NavLinks>
        <NavLink to="/" $active={location.pathname === '/'}>
          Home
        </NavLink>
        <NavLink 
          to="/visualization" 
          $active={location.pathname === '/visualization'}
        >
          Visualization
        </NavLink>
      </NavLinks>
    </Nav>
  );
};

export default Navbar; 