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
  padding-top: calc(80px + ${({ theme }) => theme.spacing.xl});
  padding-bottom: ${({ theme }) => theme.spacing.xxxl};
  text-align: center;
  scroll-margin-top: ${({ theme }) => theme.spacing.xl};
`;

const ProfileImageWrapper = styled(motion.div)`
  position: relative;
  width: 200px;
  height: 200px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: ${({ theme }) => theme.borderRadius.round};
    background: ${({ theme }) => theme.gradients.primary};
    z-index: -1;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  object-fit: cover;
`;

const Title = styled(motion.h1)`
  font-size: ${({ theme }) => theme.fontSize.xxxxl};
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.2;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.xxxl};
  }
`;

const Highlight = styled.span`
  background: ${({ theme }) => theme.gradients.text};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Description = styled(motion.p)`
  max-width: 700px;
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
`;

const ExperienceSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ExperienceTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

const TechStack = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;
`;

const TechIcon = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  transition: all ${({ theme }) => theme.transition.fast};
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
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
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ProfileImageWrapper variants={itemVariants}>
          <ProfileImage src='/images/my_profile.png' alt='Profile' />
        </ProfileImageWrapper>

        <Title variants={itemVariants}>
          안녕하세요.
          <br />
          <Highlight>Frontend Developer</Highlight>
          <br />
          전성수 입니다.
        </Title>

        <Description variants={itemVariants}>
          문제를 단순히 해결하기보다 다시는 발생하지 않게 만드는 구조적인 개선에
          집중합니다.
          <br />
          실제 운영 환경에서 얻은 경험을 바탕으로 안정성과 효율을 함께 높이는
          개발을 지향합니다.
          <br />
          끊임없이 배우고 개선하며 성장하는 과정을 즐깁니다.
        </Description>

        <ExperienceSection variants={itemVariants}>
          <ExperienceTitle>Experience With</ExperienceTitle>
          <TechStack>
            <TechIcon
              src='/images/ic_flutter.webp'
              alt='Flutter'
              title='Flutter'
            />
            <TechIcon src='/images/ic_dart.svg' alt='Dart' title='Dart' />
            <TechIcon src='/images/ic_react.svg' alt='React' title='React' />
            <TechIcon
              src='/images/ic_typescript.png'
              alt='TypeScript'
              title='TypeScript'
            />
            <TechIcon
              src='/images/ic_javascript.svg'
              alt='JavaScript'
              title='JavaScript'
            />
          </TechStack>
        </ExperienceSection>
      </motion.div>
    </HeroSection>
  );
}

export default Hero;
