import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Section = styled.section`
  min-height: 80vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: var(--primary);
  padding: 80px 20px;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  height: 600px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);

  @media (max-width: 968px) {
    height: 400px;
    margin-top: 2rem;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, var(--accent), transparent);
    opacity: 0.3;
    z-index: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled(motion.h2)`
  font-size: 4rem;
  margin-bottom: 2rem;
  font-weight: 700;
  background: linear-gradient(45deg, var(--accent), #fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 968px) {
    font-size: 3rem;
  }
`;

const Text = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 3rem;
  color: rgba(255, 255, 255, 0.9);
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 15px 30px;
  background: var(--accent);
  color: var(--primary);
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
  }
`;

const Featured = () => {
  return (
    <Section>
      <Container>
        <Content>
          <Title
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Odkryj magię latania
          </Title>
          <Text
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Indoor skydiving to nie tylko sport - to niesamowite doświadczenie, 
            które zmieni Twoje postrzeganie granic możliwości. Nasz tunel aerodynamiczny 
            to miejsce, gdzie marzenia o lataniu stają się rzeczywistością. 
            Dołącz do społeczności pasjonatów i odkryj nowy wymiar wolności.
          </Text>
          <Button to="/visualization">
            Zobacz wizualizację lotu
          </Button>
        </Content>
        <ImageWrapper
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image 
            src="https://images.unsplash.com/photo-1578774296842-c45e472b3028?q=80" 
            alt="Indoor skydiving experience" 
          />
        </ImageWrapper>
      </Container>
    </Section>
  );
};

export default Featured; 