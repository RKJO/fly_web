import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const KidsZoneSection = styled.section`
  min-height: 100vh;
  padding: 120px 40px;
  background: var(--secondary);
  position: relative;
  overflow: hidden;
`;

const Title = styled(motion.h2)`
  font-size: 4rem;
  text-align: center;
  margin-bottom: 60px;
  color: var(--text);

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const TextContent = styled(motion.div)`
  color: var(--text);
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 30px;
`;

const Features = styled(motion.ul)`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Feature = styled(motion.li)`
  color: var(--text-secondary);
  margin-bottom: 15px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '✈️';
    font-size: 1.5rem;
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 600px;
  border-radius: 20px;
  overflow: hidden;

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

const KidsZone = () => {
  const features = [
    'Bezpieczne środowisko dla dzieci',
    'Edukacyjne gry i zabawy',
    'Profesjonalni instruktorzy',
    'Dostęp do symulatorów',
    'Certyfikaty ukończenia'
  ];

  return (
    <KidsZoneSection data-scroll-section>
      <Title
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Strefa dla dzieci
      </Title>
      <Content>
        <TextContent
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Description>
            Zapraszamy do naszej strefy dla dzieci, gdzie łączymy zabawę z edukacją.
            Twoje dziecko będzie mogło poczuć się jak prawdziwy pilot!
          </Description>
          <Features>
            {features.map((feature, index) => (
              <Feature
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {feature}
              </Feature>
            ))}
          </Features>
        </TextContent>
        <ImageContainer
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img src="/images/kids-zone.jpg" alt="Strefa dla dzieci" />
        </ImageContainer>
      </Content>
    </KidsZoneSection>
  );
};

export default KidsZone; 