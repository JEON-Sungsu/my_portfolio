import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  scroll-margin-top: ${({ theme }) => theme.spacing.xl};
`;

const ProfileImage = styled(motion.img)`
  width: 200px;
  height: 200px;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  object-fit: cover;
`;

const Greeting = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Role = styled(motion.h1)`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.xxl};
  }
`;

const Name = styled(motion.h2)`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const DescriptionContainer = styled(motion.div)`
  text-align: left;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
`;

function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <HeroSection id='hero'>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <ProfileImage
          src='/assets/images/my_profile.png'
          alt='Profile'
          variants={itemVariants}
        />
        <Greeting variants={itemVariants}>안녕하세요,</Greeting>
        <Role variants={itemVariants}>Frontend Developer</Role>
        <Name variants={itemVariants}>전성수입니다</Name>
        <DescriptionContainer variants={itemVariants}>
          <Description>
            문제를 빠르게 고치는 것보다, 왜 그런 문제가 생겼는지 끝까지 추적하고
            구조를 개선하는 일에 집중합니다.
          </Description>
          <Description>
            기술은 도구이지만, 운영의 안정성과 팀의 신뢰를 만드는 데 가장 강력한
            수단이라고 생각합니다.
          </Description>
          <Description>
            작은 개선이 모여 서비스의 품질을 바꾼다고 믿는 개발자입니다.
          </Description>
        </DescriptionContainer>
      </motion.div>
    </HeroSection>
  );
}

export default Hero;
