import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = styled.section`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroContent = styled(motion.div)`
  text-align: center;
  z-index: 1;
`;

const Title = styled(motion.h1)`
  font-size: 8vw;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 12vw;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ScrollText = styled.span`
  font-size: 14px;
  color: var(--text-secondary);
`;

const ScrollLine = styled(motion.div)`
  width: 1px;
  height: 60px;
  background: var(--text-secondary);
`;

const Hero = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    
    gsap.fromTo(
      section,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <HeroSection ref={sectionRef}>
      <HeroContent>
        <Title
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Explore the
          <br />
          <span className="text-gradient">Future</span>
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Discover the endless possibilities of virtual reality
        </Subtitle>
      </HeroContent>

      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <ScrollText>Scroll to explore</ScrollText>
        <ScrollLine
          animate={{
            height: [60, 0, 60],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero; 