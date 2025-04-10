import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import aboutImage from '../../assets/img/about.jpeg';

const AboutSection = styled.section`
  min-height: 100vh;
  padding: 120px 40px;
  background: var(--secondary);
  position: relative;
  overflow: hidden;

  @media (max-width: 1200px) {
    padding: 100px 30px;
  }

  @media (max-width: 768px) {
    padding: 80px 20px;
  }

  @media (max-width: 480px) {
    padding: 60px 15px;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 1200px) {
    gap: 40px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const TextContent = styled(motion.div)`
  color: var(--text);
`;

const Title = styled(motion.h2)`
  font-size: 4rem;
  margin-bottom: 30px;
  line-height: 1.2;

  @media (max-width: 1200px) {
    font-size: 3.5rem;
    margin-bottom: 25px;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 25px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 20px;
  }
`;

const Stats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 60px;

  @media (max-width: 768px) {
    gap: 20px;
    margin-top: 40px;
  }

  @media (max-width: 480px) {
    gap: 15px;
    margin-top: 30px;
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;
`;

const StatNumber = styled(motion.h3)`
  font-size: 3rem;
  color: var(--accent);
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const StatLabel = styled(motion.p)`
  font-size: 1rem;
  color: var(--text-secondary);

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 600px;
  border-radius: 20px;
  overflow: hidden;

  @media (max-width: 1200px) {
    height: 500px;
  }

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 300px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, var(--accent), transparent);
    opacity: 0.3;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const About = () => {
  return (
    <AboutSection data-scroll-section>
      <Content>
        <TextContent
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Title>O nas</Title>
          <Description>
            Jesteśmy pasjonatami sportu, którzy łączą nowoczesną pasję z edukacją.
            Nasza misja to inspirowanie kolejnych pokoleń proflyerów i entuzjastów skydivingu.
          </Description>
          <Stats>
            <StatItem
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <StatNumber>1000+</StatNumber>
              <StatLabel>Szczęśliwych klientów</StatLabel>
            </StatItem>
            <StatItem
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <StatNumber>50+</StatNumber>
              <StatLabel>Lokacji</StatLabel>
            </StatItem>
            <StatItem
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <StatNumber>100%</StatNumber>
              <StatLabel>Zadowolenia</StatLabel>
            </StatItem>
          </Stats>
        </TextContent>
        <ImageContainer
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img src={aboutImage} alt="O nas" />
        </ImageContainer>
      </Content>
    </AboutSection>
  );
};

export default About; 