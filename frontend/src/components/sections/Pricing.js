import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PricingSection = styled.section`
  min-height: 100vh;
  padding: 120px 40px;
  background: var(--primary);
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

const PricingGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PricingCard = styled(motion.div)`
  background: var(--secondary);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, var(--accent), transparent);
    opacity: 0.1;
  }
`;

const PlanName = styled.h3`
  font-size: 2rem;
  color: var(--text);
  margin-bottom: 20px;
`;

const Price = styled.div`
  font-size: 3rem;
  color: var(--accent);
  margin-bottom: 30px;

  span {
    font-size: 1rem;
    color: var(--text-secondary);
  }
`;

const Features = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: 30px;
`;

const Feature = styled.li`
  color: var(--text-secondary);
  margin-bottom: 15px;
  font-size: 1.1rem;
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

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: '99',
      features: [
        '1 godzina w symulatorze',
        'Podstawowe szkolenie',
        'Certyfikat ukończenia',
        'Wsparcie online'
      ]
    },
    {
      name: 'Pro',
      price: '199',
      features: [
        '3 godziny w symulatorze',
        'Zaawansowane szkolenie',
        'Certyfikat ukończenia',
        'Wsparcie premium',
        'Dostęp do społeczności'
      ]
    },
    {
      name: 'Enterprise',
      price: '399',
      features: [
        '10 godzin w symulatorze',
        'Szkolenie VIP',
        'Certyfikat ukończenia',
        'Wsparcie 24/7',
        'Dostęp do społeczności',
        'Mentoring 1:1'
      ]
    }
  ];

  return (
    <PricingSection data-scroll-section>
      <Title
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Wybierz swój plan
      </Title>
      <PricingGrid>
        {plans.map((plan, index) => (
          <PricingCard
            key={plan.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <PlanName>{plan.name}</PlanName>
            <Price>
              {plan.price} zł <span>/ miesiąc</span>
            </Price>
            <Features>
              {plan.features.map((feature, i) => (
                <Feature key={i}>{feature}</Feature>
              ))}
            </Features>
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Wybierz plan
            </Button>
          </PricingCard>
        ))}
      </PricingGrid>
    </PricingSection>
  );
};

export default Pricing; 