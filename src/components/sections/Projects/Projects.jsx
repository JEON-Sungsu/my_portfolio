import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import IconLabel from '../../common/IconLabel/IconLabel'
import Badge from '../../common/Badge/Badge'

const ProjectsSection = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};
  background-color: #1a1a1a;
  scroll-margin-top: ${({ theme }) => theme.spacing.xxl};
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  color: ${({ theme }) => theme.colors.orange};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  text-transform: uppercase;
`

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
`

const ProjectCard = styled(motion.div)`
  width: 100%;
  height: 400px;
  perspective: 1000px;
  cursor: pointer;
`

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;

  ${ProjectCard}:hover & {
    transform: rotateY(180deg);
  }
`

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`

const CardFront = styled(CardFace)`
  background-color: #0a0a0a;
  border: 2px solid #FF6B35;
`

const CardBack = styled(CardFace)`
  background-color: #0a0a0a;
  border: 2px solid #FF6B35;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.xl};
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
`

const CardFrontContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.xl};
  position: relative;
`

const TopRightBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
`

const CenterIcon = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const BottomTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textLight};
  text-align: center;
  width: 100%;
`

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
`

const ProjectImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`

const ProjectTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const BackTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const BackLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
`

const BackText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.white};
  line-height: 1.6;
`

const TechStackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`

const TechBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.xs};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`

function Projects() {
  const navigate = useNavigate()

  const projects = [
    {
      id: 1,
      title: 'Power of HTML',
      subtitle: 'HTML Tutorial',
      techStack: ['HTML5', 'CSS3', 'JavaScript'],
      role: 'Frontend Developer',
      description: 'HTML 기초부터 고급 기술까지 다루는 튜토리얼',
    },
    {
      id: 2,
      title: 'Unlock CSS Magic',
      subtitle: 'CSS Tutorial',
      techStack: ['CSS3', 'SASS', 'Animation'],
      role: 'UI/UX Developer',
      description: 'CSS 스타일링과 애니메이션 기법 학습',
    },
  ]

  const handleProjectClick = (projectId) => {
    sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    navigate(`/project/${projectId}`)
  }

  return (
    <ProjectsSection id="projects">
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
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleProjectClick(project.id)}
            >
              <CardInner>
                <CardFront>
                  {index === 0 ? (
                    <CardFrontContent>
                      <TopRightBadge>
                        <Badge>React</Badge>
                      </TopRightBadge>

                      <CenterIcon>
                        <IconLabel
                          iconPath="/assets/icons/ic_mobile_web.svg"
                          label="Mobile web"
                          size="80px"
                        />
                      </CenterIcon>

                      <BottomTitle>Monki QR Order</BottomTitle>
                    </CardFrontContent>
                  ) : index === 1 ? (
                    <CardFrontContent>
                      <TopRightBadge>
                        <Badge>Flutter</Badge>
                      </TopRightBadge>

                      <CenterIcon>
                        <IconLabel
                          iconPath="/assets/icons/ic_tablet.svg"
                          label="Tablet"
                          size="80px"
                        />
                      </CenterIcon>

                      <BottomTitle>Monki Tableorder</BottomTitle>
                    </CardFrontContent>
                  ) : (
                    <Placeholder>
                      <ProjectTitle>{project.title}</ProjectTitle>
                    </Placeholder>
                  )}
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
  )
}

export default Projects
