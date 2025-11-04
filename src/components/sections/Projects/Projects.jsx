import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'

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
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 900px;
  margin: 0 auto;
`

const ProjectCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  transition: transform ${({ theme }) => theme.transition.medium};
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-8px);
  }
`

const Placeholder = styled.div`
  width: 100%;
  height: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

const VisitLink = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.grayDark};
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color ${({ theme }) => theme.transition.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray};
  }
`

const VisitText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: 1px;
`

const VisitIcon = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.white};
`

function Projects() {
  const navigate = useNavigate()

  const projects = [
    {
      id: 1,
      title: 'Power of HTML',
      subtitle: 'HTML Tutorial',
    },
    {
      id: 2,
      title: 'Unlock CSS Magic',
      subtitle: 'CSS Tutorial',
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
              <Placeholder>
                <ProjectTitle>{project.title}</ProjectTitle>
              </Placeholder>
              <VisitLink>
                <VisitText>Click here to visit</VisitText>
                <VisitIcon>↗</VisitIcon>
              </VisitLink>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </Container>
    </ProjectsSection>
  )
}

export default Projects
