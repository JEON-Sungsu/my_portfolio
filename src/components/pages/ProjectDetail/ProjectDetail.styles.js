import styled from 'styled-components';
import { motion } from 'framer-motion';

export const DetailContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export const BackButton = styled.button`
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

export const Hero = styled.div`
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

export const HeroContent = styled.div`
  text-align: center;
`;

export const ProjectTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.xxl};
  }
`;

export const ProjectSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  opacity: 0.9;
`;

export const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.xxl};
`;

export const Section = styled(motion.section)`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const InfoLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textLight};
  text-transform: uppercase;
`;

export const InfoValue = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const FeatureItem = styled.li`
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

export const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TechBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const TroubleShootingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const TroubleShootingItem = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
`;

export const TroubleTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const TroubleContent = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const TroubleLabel = styled.span`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

// Features Detail 전용 스타일
export const FeatureDetailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const FeatureDetailItem = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
`;

export const FeatureDetailTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const FeatureDetailDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const TechnicalDetailsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-left: ${({ theme }) => theme.spacing.md};
`;

export const TechnicalDetailItem = styled.li`
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  padding-left: ${({ theme }) => theme.spacing.md};
  position: relative;

  &::before {
    content: '→';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
