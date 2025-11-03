import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

const DetailContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const BackButton = styled.button`
  position: fixed;
  top: ${({ theme }) => theme.spacing.xl};
  left: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.grayDark};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};
  z-index: 100;
  box-shadow: ${({ theme }) => theme.shadow.md};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.05);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: absolute;
    top: ${({ theme }) => theme.spacing.lg};
    left: ${({ theme }) => theme.spacing.lg};
  }
`;

const Hero = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 300px;
  }
`;

const HeroContent = styled.div`
  text-align: center;
`;

const ProjectType = styled.div`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProjectTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.xxl};
  }
`;

const ProjectSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  opacity: 0.9;
`;

const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const Section = styled(motion.section)`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const InfoLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textLight};
  text-transform: uppercase;
`;

const InfoValue = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-left: ${({ theme }) => theme.spacing.lg};
  position: relative;

  &::before {
    content: '▪';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const TechBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const TroubleShootingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const TroubleShootingItem = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
`;

const TroubleTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const TroubleContent = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
`;

const TroubleLabel = styled.span`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // TODO: 실제로는 API나 데이터에서 가져오기
  const projectData = {
    1: {
      title: 'Tableorder',
      company: 'MonthlyKitchen',
      type: 'Company Project',
      period: '2023.03 - 2024.01',
      role: 'Frontend Developer',
      team: '4명 (FE 2, BE 2)',
      description:
        '월간주방의 주문 관리 시스템을 개발한 프로젝트입니다. 레스토랑과 주방 간의 효율적인 주문 흐름을 구현하여 운영 효율성을 크게 향상시켰습니다.',
      features: [
        '실시간 주문 처리 및 상태 관리 시스템',
        '주방 디스플레이 시스템(KDS) 구현',
        '주문 통계 및 분석 대시보드',
        '다중 레스토랑 지원을 위한 관리자 패널',
        '모바일 반응형 디자인 적용',
      ],
      techStack: ['React', 'TypeScript', 'Redux', 'Styled-components', 'Framer Motion'],
      troubleShooting: [
        {
          title: '실시간 주문 데이터 동기화 이슈',
          problem:
            '여러 기기에서 동시에 주문을 처리할 때 데이터 불일치가 발생하여 주문이 중복되거나 누락되는 문제가 발생했습니다.',
          solution:
            'WebSocket 연결을 통한 실시간 양방향 통신을 구현하고, Redux를 활용한 낙관적 업데이트(Optimistic Update) 패턴을 적용했습니다. 또한 충돌 해결을 위한 버전 관리 시스템을 도입하여 데이터 일관성을 보장했습니다.',
        },
        {
          title: '대량 주문 처리 시 성능 저하',
          problem:
            '피크 시간대에 100개 이상의 주문이 동시에 처리될 때 렌더링 성능이 급격히 저하되어 UI가 멈추는 현상이 발생했습니다.',
          solution:
            'React.memo와 useMemo를 활용한 불필요한 리렌더링 방지, 가상화(Virtualization) 기법을 적용한 주문 리스트 구현, 그리고 Web Worker를 활용한 무거운 계산 작업의 백그라운드 처리로 성능을 개선했습니다.',
        },
      ],
      learnings:
        '대규모 상태 관리의 중요성을 깨달았고, Redux를 활용한 효율적인 상태 관리 패턴을 학습했습니다. 또한 실시간 데이터 처리를 위한 WebSocket 통신과 최적화 기법을 익혔습니다.',
    },
  };

  const project = projectData[id] || projectData[1];

  return (
    <DetailContainer>
      <BackButton onClick={() => navigate('/')}>
        <FaArrowLeft />
      </BackButton>

      <Hero>
        <HeroContent>
          <ProjectType>{project.type}</ProjectType>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectSubtitle>{project.company}</ProjectSubtitle>
        </HeroContent>
      </Hero>

      <Content>
        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Period</InfoLabel>
              <InfoValue>{project.period}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Role</InfoLabel>
              <InfoValue>{project.role}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Team</InfoLabel>
              <InfoValue>{project.team}</InfoValue>
            </InfoItem>
          </InfoGrid>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <SectionTitle>Overview</SectionTitle>
          <Description>{project.description}</Description>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SectionTitle>Key Features</SectionTitle>
          <FeatureList>
            {project.features.map((feature, index) => (
              <FeatureItem key={index}>{feature}</FeatureItem>
            ))}
          </FeatureList>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SectionTitle>Tech Stack</SectionTitle>
          <TechStack>
            {project.techStack.map((tech) => (
              <TechBadge key={tech}>{tech}</TechBadge>
            ))}
          </TechStack>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SectionTitle>Trouble Shooting</SectionTitle>
          <TroubleShootingList>
            {project.troubleShooting.map((trouble, index) => (
              <TroubleShootingItem key={index}>
                <TroubleTitle>{trouble.title}</TroubleTitle>
                <TroubleLabel>Problem</TroubleLabel>
                <TroubleContent>{trouble.problem}</TroubleContent>
                <TroubleLabel>Solution</TroubleLabel>
                <TroubleContent>{trouble.solution}</TroubleContent>
              </TroubleShootingItem>
            ))}
          </TroubleShootingList>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <SectionTitle>What I Learned</SectionTitle>
          <Description>{project.learnings}</Description>
        </Section>
      </Content>
    </DetailContainer>
  );
}

export default ProjectDetail;
