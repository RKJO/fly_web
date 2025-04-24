import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ContactSection = styled.section`
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

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 15px;
  border: 1px solid var(--text-secondary);
  border-radius: 10px;
  background: transparent;
  color: var(--text);
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent);
  }
`;

const TextArea = styled.textarea`
  padding: 15px;
  border: 1px solid var(--text-secondary);
  border-radius: 10px;
  background: transparent;
  color: var(--text);
  font-size: 1rem;
  resize: vertical;
  min-height: 150px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent);
  }
`;

const Button = styled(motion.button)`
  background: var(--accent);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ContactInfo = styled(motion.div)`
  color: var(--text);
`;

const InfoItem = styled(motion.div)`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InfoLabel = styled.span`
  font-size: 1.2rem;
  color: var(--accent);
`;

const InfoValue = styled.span`
  font-size: 1.1rem;
  color: var(--text-secondary);
`;

const Contact = () => {
  return (
    <ContactSection data-scroll-section>
      <Title
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Kontakt
      </Title>
      <Content>
        <ContactForm
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Input type="text" placeholder="Imię" />
          <Input type="email" placeholder="Email" />
          <TextArea placeholder="Wiadomość" />
          <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Wyślij
          </Button>
        </ContactForm>
        <ContactInfo
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <InfoItem>
            <InfoLabel>Email:</InfoLabel>
            <InfoValue>kontakt@fly.com</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Telefon:</InfoLabel>
            <InfoValue>+48 123 456 789</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Adres:</InfoLabel>
            <InfoValue>ul. Lotnicza 1, 00-001 Warszawa</InfoValue>
          </InfoItem>
        </ContactInfo>
      </Content>
    </ContactSection>
  );
};

export default Contact;
