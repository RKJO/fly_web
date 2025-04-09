import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  mix-blend-mode: difference;
`;

const Logo = styled(motion.div)`
  font-size: 24px;
  font-weight: 700;
  color: white;
  cursor: pointer;
`;

const MenuButton = styled(motion.button)`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 10px;
  z-index: 1001;
`;

const Menu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--primary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const MenuItem = styled(Link)`
  font-size: 48px;
  color: white;
  text-decoration: none;
  margin: 20px 0;
  position: relative;
  
  &:hover {
    color: var(--accent);
  }
`;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isVisualization = location.pathname === '/visualization';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  const menuItems = [
    { name: 'Strona główna', path: '/' },
    { name: 'Proflyers', path: '/pricing' },
    { name: 'Zajęcia dla dzieci', path: '/kids' },
    { name: 'Blog', path: '/blog' },
    { name: 'Wizualizacja', path: '/visualization' },
    { name: 'Kontakt', path: '/#contact' }
  ];

  return (
    <>
      <Nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          as={Link}
          to="/"
        >
          FLY
        </Logo>
        <MenuButton
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? 'Zamknij' : 'Menu'}
        </MenuButton>
      </Nav>

      <AnimatePresence>
        {isOpen && (
          <Menu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {menuItems.map((item, index) => (
              <MenuItem 
                key={index}
                to={item.path} 
                onClick={handleMenuItemClick}
              >
                {item.name}
              </MenuItem>
            ))}
          </Menu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation; 