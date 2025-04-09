import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPlane, FaCrown, FaUserFriends } from 'react-icons/fa';

const Section = styled.section`
  padding: 100px 0;
  background: var(--primary);
  color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 60px;
  text-align: center;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 60px;
`;

const PricingCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const PopularBadge = styled.div`
  position: absolute;
  top: -15px;
  right: 20px;
  background: var(--accent);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transform: rotate(15deg);
  z-index: 1;
`;

const PlanName = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Price = styled.div`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
  color: var(--accent);
`;

const Features = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 30px 0;
`;

const Feature = styled.li`
  margin: 10px 0;
  font-size: 16px;
`;

const Button = styled(motion.button)`
  background: var(--accent);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  margin-top: auto;

  &:hover {
    background: var(--accent-dark);
  }
`;

const ActivityTiles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 60px;
`;

const ActivityTile = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 15px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ActivityTitle = styled.h4`
  font-size: 18px;
  margin-bottom: 10px;
  color: var(--accent);
`;

const ActivityDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
`;

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      icon: <FaPlane />,
      price: '700',
      features: [
        '10 minut w tunelu',
        'Podstawowe szkolenie',
        'Sprzęt w cenie',
        'Instruktor'
      ]
    },
    {
      name: 'Popular',
      icon: <FaUserFriends />,
      price: '1000',
      features: [
        '15 minut w tunelu',
        'Zaawansowane szkolenie',
        'Sprzęt w cenie',
        'Instruktor',
        'Certyfikat ukończenia',
        'Zdjęcia z lotu'
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
        'Sprzęt w cenie'
      ]
    }
  ];

  const activities = [
    {
      title: 'Szkolenie podstawowe',
      description: 'Poznaj podstawy latania w tunelu aerodynamicznym. Idealne dla początkujących.'
    },
    {
      title: 'Trening zaawansowany',
      description: 'Zaawansowane techniki latania dla doświadczonych flyerów.'
    },
    {
      title: 'Zajęcia grupowe',
      description: 'Treningi w grupie pod okiem doświadczonych instruktorów.'
    },
    {
      title: 'Szkolenie indywidualne',
      description: 'Indywidualne podejście do Twoich potrzeb i celów treningowych.'
    }
  ];

  return (
    <Section id="pricing" data-scroll-section>
      <Container>
        <Title>Wybierz swój plan</Title>
        <PricingGrid>
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {plan.popular && <PopularBadge>Najpopularniejszy</PopularBadge>}
              <PlanName>{plan.name}</PlanName>
              <Price>{plan.price}{plan.price !== 'Wycena indywidualna' ? ' zł' : ''}</Price>
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

        <ActivityTiles>
          {activities.map((activity, index) => (
            <ActivityTile
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ActivityTitle>{activity.title}</ActivityTitle>
              <ActivityDescription>{activity.description}</ActivityDescription>
            </ActivityTile>
          ))}
        </ActivityTiles>
      </Container>
    </Section>
  );
};

export default Pricing; 