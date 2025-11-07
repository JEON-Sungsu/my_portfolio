import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import IconLabel from '../../common/IconLabel/IconLabel';
import Badge from '../../common/Badge/Badge';
import { projects } from '../../../data/projects';

const ProjectsSection = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xxl}
    ${({ theme }) => theme.spacing.xl};
  background-color: #1a1a1a;
  scroll-margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  color: ${({ theme }) => theme.colors.orange};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  text-transform: uppercase;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  width: 100%;
  height: 400px;
  perspective: 1000px;
  cursor: pointer;
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;

  ${ProjectCard}:hover & {
    transform: rotateY(180deg);
  }
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

const CardFront = styled(CardFace)`
  background-color: #0a0a0a;
  border: 2px solid #ff6b35;
`;

const CardBack = styled(CardFace)`
  background-color: #0a0a0a;
  border: 2px solid #ff6b35;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.xl};
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const CardFrontContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.xl};
  position: relative;
`;

const TopRightBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
`;

const CenterIcon = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

const BottomTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textLight};
  text-align: center;
  width: 100%;
`;

const BackTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const BackLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const BackText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.white};
  line-height: 1.6;
`;

const TechStackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const TechBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.xs};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

function Projects() {
  const navigate = useNavigate();

  const handleProjectClick = (projectSlug) => {
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    navigate(`/project/${projectSlug}`);
  };

  return (
    <ProjectsSection id='projects'>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </SectionTitle>

        <ProjectGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleProjectClick(project.slug)}
            >
              <CardInner>
                <CardFront>
                  <CardFrontContent>
                    <TopRightBadge>
                      <Badge>{project.badge}</Badge>
                    </TopRightBadge>

                    <CenterIcon>
                      {project.icons.map((icon, idx) => (
                        <IconLabel
                          key={idx}
                          iconPath={icon.path}
                          label={icon.label}
                          size={icon.size}
                        />
                      ))}
                    </CenterIcon>

                    <BottomTitle>{project.title}</BottomTitle>
                  </CardFrontContent>
                </CardFront>

                <CardBack>
                  <BackTitle>{project.title}</BackTitle>

                  <div>
                    <BackLabel>Role</BackLabel>
                    <BackText>{project.role}</BackText>
                  </div>

                  <div>
                    <BackLabel>Description</BackLabel>
                    <BackText>{project.description}</BackText>
                  </div>

                  <div>
                    <BackLabel>Tech Stack</BackLabel>
                    <TechStackContainer>
                      {project.techStack.map((tech) => (
                        <TechBadge key={tech}>{tech}</TechBadge>
                      ))}
                    </TechStackContainer>
                  </div>
                </CardBack>
              </CardInner>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </Container>
    </ProjectsSection>
  );
}

export default Projects;
