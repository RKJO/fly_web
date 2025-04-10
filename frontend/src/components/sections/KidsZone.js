import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaRegClock, FaRegCalendarAlt, FaRegStar, FaChild } from 'react-icons/fa';
import kidsImage from '../../assets/img/kids.jpeg';

const Section = styled.section`
  min-height: ${props => props.fullPage ? '100vh' : 'auto'};
  padding: ${props => props.fullPage ? '120px 20px' : '80px 20px'};
  background: var(--primary);
  color: var(--text);
  position: relative;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  font-size: 4rem;
  margin-bottom: 4rem;
  text-align: left;
  font-weight: 700;
  background: linear-gradient(45deg, var(--accent), #fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 1200px) {
    font-size: 3.5rem;
    margin-bottom: 3rem;
  }

  @media (max-width: 968px) {
    font-size: 3rem;
    margin-bottom: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media (max-width: 1200px) {
    gap: 3rem;
  }

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    gap: 1.5rem;
  }
`;

const Content = styled.div`
  color: var(--text);
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  height: 600px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);

  @media (max-width: 1200px) {
    height: 500px;
  }

  @media (max-width: 968px) {
    height: 400px;
    margin-top: 2rem;
  }

  @media (max-width: 480px) {
    height: 300px;
    margin-top: 1.5rem;
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

const InfoSection = styled.div`
  margin: 3rem 0;
`;

const InfoTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--accent);
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const InfoIcon = styled.div`
  font-size: 2rem;
  color: var(--accent);
`;

const InfoCardTitle = styled.h4`
  font-size: 1.5rem;
  color: #fff;

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const InfoText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Schedule = styled.div`
  margin-top: 3rem;
`;

const ScheduleTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--accent);
`;

const ScheduleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const ScheduleCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 15px;

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const ScheduleDay = styled.h4`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
  }
`;

const ScheduleTime = styled.p`
  font-size: 1.1rem;
  color: var(--accent);
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const KidsZone = ({ fullPage = false }) => {
  return (
    <Section id="kids" fullPage={fullPage} data-scroll-section>
      <Container>
        <Title
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {fullPage ? 'Zajęcia dla dzieci' : 'Dla najmłodszych'}
        </Title>
        
        <Grid>
          <Content>
            <InfoText>
              Zapraszamy dzieci w wieku od 7 do 15 lat na niezapomnianą przygodę z indoor skydivingiem! 
              Nasze zajęcia to nie tylko świetna zabawa, ale także rozwój koordynacji, równowagi i pewności siebie.
            </InfoText>

            <InfoSection>
              <InfoTitle>Co oferujemy?</InfoTitle>
              <InfoGrid>
                <InfoCard>
                  <InfoIcon><FaChild /></InfoIcon>
                  <InfoCardTitle>Grupy wiekowe</InfoCardTitle>
                  <InfoText>7-10 lat (początkujący), 11-15 lat (zaawansowani)</InfoText>
                </InfoCard>
                <InfoCard>
                  <InfoIcon><FaRegStar /></InfoIcon>
                  <InfoCardTitle>Program</InfoCardTitle>
                  <InfoText>Nauka podstaw, techniki lotu, bezpieczeństwo</InfoText>
                </InfoCard>
                <InfoCard>
                  <InfoIcon><FaRegClock /></InfoIcon>
                  <InfoCardTitle>Czas trwania</InfoCardTitle>
                  <InfoText>60 minut (w tym 15 minut lotu)</InfoText>
                </InfoCard>
                <InfoCard>
                  <InfoIcon><FaRegCalendarAlt /></InfoIcon>
                  <InfoCardTitle>Częstotliwość</InfoCardTitle>
                  <InfoText>1-2 razy w tygodniu</InfoText>
                </InfoCard>
              </InfoGrid>
            </InfoSection>

            {fullPage && (
              <Schedule>
                <ScheduleTitle>Harmonogram zajęć</ScheduleTitle>
                <ScheduleGrid>
                  <ScheduleCard>
                    <ScheduleDay>Poniedziałek - Środa</ScheduleDay>
                    <ScheduleTime>16:00 - 17:00 (7-10 lat)</ScheduleTime>
                    <ScheduleTime>17:30 - 18:30 (11-15 lat)</ScheduleTime>
                  </ScheduleCard>
                  <ScheduleCard>
                    <ScheduleDay>Sobota</ScheduleDay>
                    <ScheduleTime>10:00 - 11:00 (7-10 lat)</ScheduleTime>
                    <ScheduleTime>11:30 - 12:30 (11-15 lat)</ScheduleTime>
                  </ScheduleCard>
                </ScheduleGrid>
              </Schedule>
            )}
          </Content>

          <ImageWrapper
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image 
              src={kidsImage} 
              alt="Dziecko podczas lotu w tunelu aerodynamicznym" 
            />
          </ImageWrapper>
        </Grid>

        {fullPage && (
          <InfoSection>
            <InfoTitle>Cennik</InfoTitle>
            <InfoGrid>
              <InfoCard>
                <InfoCardTitle>Pojedyncze zajęcia</InfoCardTitle>
                <InfoText>
                  - 150 zł / 60 min (15 min lotu)<br />
                  - Sprzęt w cenie<br />
                  - Instruktor dedykowany
                </InfoText>
              </InfoCard>
              <InfoCard>
                <InfoCardTitle>Karnet miesięczny</InfoCardTitle>
                <InfoText>
                  - 500 zł / 4 zajęcia<br />
                  - Sprzęt w cenie<br />
                  - Stała grupa i instruktor
                </InfoText>
              </InfoCard>
            </InfoGrid>
          </InfoSection>
        )}
      </Container>
    </Section>
  );
};

export default KidsZone; 