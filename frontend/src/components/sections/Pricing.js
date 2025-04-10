import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaStar, FaCrown, FaRocket } from 'react-icons/fa';

const PageWrapper = styled.div`
  min-height: 100vh;
  padding-top: 80px;
  background: var(--primary);
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled(motion.h2)`
  font-size: 4rem;
  text-align: center;
  margin-bottom: 60px;
  color: var(--text);
  background: linear-gradient(45deg, var(--accent), #fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 60px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const PricingCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

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

const PopularBadge = styled.div`
  position: absolute;
  top: 35px;
  right: -50px;
  background: var(--accent);
  color: var(--primary);
  padding: 8px 40px;
  transform: rotate(45deg);
  font-weight: bold;
  font-size: 0.9rem;
`;

const PlanName = styled.h3`
  font-size: 2rem;
  color: var(--text);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Price = styled.div`
  font-size: 3.5rem;
  color: var(--accent);
  margin-bottom: 30px;
  font-weight: bold;

  span {
    font-size: 1rem;
    color: var(--text-secondary);
    font-weight: normal;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  svg {
    color: var(--accent);
  }
`;

const Button = styled(motion.button)`
  background: var(--accent);
  color: var(--primary);
  border: none;
  padding: 15px 30px;
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  width: 100%;
  font-weight: bold;

  &:hover {
    transform: scale(1.05);
  }
`;

const Pricing = ({ isSection = false }) => {
  const plans = [
    {
      name: 'Basic',
      icon: <FaRocket />,
      price: '700',
      features: [
        '10 minut w tunelu',
        'Podstawowe szkolenie',
        'Sprzęt w cenie',
        'Certyfikat ukończenia',
        'Wsparcie online'
      ]
    },
    {
      name: 'Popular',
      icon: <FaStar />,
      price: '1000',
      features: [
        '15 minut w tunelu',
        'Zaawansowane szkolenie',
        'Sprzęt w cenie',
        'Certyfikat ukończenia',
        'Wsparcie premium',
        'Dostęp do społeczności'
      ],
      popular: true
    },
    {
      name: 'Regular',
      icon: <FaCrown />,
      price: 'Wycena indywidualna',
      features: [
        'Abonament miesięczny',
        'Regularne treningi',
        'Indywidualny instruktor',
        'Sprzęt w cenie',
        'Certyfikat ukończenia',
        'Wsparcie 24/7',
        'Dostęp do społeczności'
      ]
    }
  ];

  return (
    <PageWrapper data-scroll-section={isSection}>
      <Container>
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
              {plan.popular && <PopularBadge>Najpopularniejszy</PopularBadge>}
              <PlanName>
                {plan.icon} {plan.name}
              </PlanName>
              <Price>
                {plan.price}{plan.price !== 'Wycena indywidualna' ? ' zł' : ''} <span>{plan.price !== 'Wycena indywidualna' ? '/ sesja' : ''}</span>
              </Price>
              <Features>
                {plan.features.map((feature, i) => (
                  <Feature key={i}>
                    <FaStar size={12} /> {feature}
                  </Feature>
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
      </Container>
    </PageWrapper>
  );
};

export default Pricing; 