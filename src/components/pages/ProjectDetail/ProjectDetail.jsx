import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import { projectDetail } from '../../../data/projectDetail';

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
  color: #000000;
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
  height: 250px;
  background: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 200px;
  }
`;

const HeroContent = styled.div`
  text-align: center;
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
    top: 50%;
    transform: translateY(-50%);
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
  const { slug } = useParams();
  const navigate = useNavigate();

  const project = projectDetail[slug] || projectDetail['monki-qr-order'];

  return (
    <DetailContainer>
      <BackButton onClick={() => navigate('/')}>
        <FaArrowLeft />
      </BackButton>

      <Hero>
        <HeroContent>
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
              <InfoLabel>Team</InfoLabel>
              <InfoValue>{project.team}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>OS</InfoLabel>
              <InfoValue>{project.os}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Deployment</InfoLabel>
              <InfoValue>{project.deployment}</InfoValue>
            </InfoItem>
          </InfoGrid>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <SectionTitle>Role</SectionTitle>
          <FeatureList>
            {project.role.map((roleItem, index) => (
              <FeatureItem key={index}>{roleItem}</FeatureItem>
            ))}
          </FeatureList>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SectionTitle>Overview</SectionTitle>
          <Description>{project.description}</Description>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
          transition={{ duration: 0.6, delay: 0.5 }}
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

        {project.learnings && (
          <Section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <SectionTitle>What I Learned</SectionTitle>
            <Description>{project.learnings}</Description>
          </Section>
        )}
      </Content>
    </DetailContainer>
  );
}

export default ProjectDetail;
