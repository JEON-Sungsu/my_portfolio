import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const ProjectsSection = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.gray};
  scroll-margin-top: ${({ theme }) => theme.spacing.xxl};
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`

const Tab = styled.button`
  position: relative;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ $active, theme }) =>
    $active ? theme.fontWeight.bold : theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.text};
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transition: transform ${({ theme }) => theme.transition.fast};
  }

  &:hover {
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
  }
`

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`

const ProjectCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.md};
  transition: transform ${({ theme }) => theme.transition.medium},
    box-shadow ${({ theme }) => theme.transition.medium};
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadow.xl};
  }
`

const Placeholder = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${({ theme }) => theme.fontSize.xl};
`

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`

const ProjectTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const ProjectDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.6;
`

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`

const TechBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.xs};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`

function Projects() {
  const [activeTab, setActiveTab] = useState('company')
  const navigate = useNavigate()

  const projects = [
    {
      id: 1,
      title: 'Tableorder',
      type: 'company',
      company: 'MonthlyKitchen',
      description: '주문 관리 시스템 개발 프로젝트입니다.',
      techStack: ['React', 'TypeScript', 'Redux'],
    },
    {
      id: 2,
      title: 'Project 2',
      type: 'company',
      company: '회사명',
      description: '회사 프로젝트 설명이 들어갈 자리입니다.',
      techStack: ['React', 'Redux', 'Node.js'],
    },
    {
      id: 3,
      title: 'Personal Project 1',
      type: 'personal',
      description: '개인 프로젝트 예시입니다.',
      techStack: ['React', 'TypeScript', 'GraphQL'],
    },
    {
      id: 4,
      title: 'Personal Project 2',
      type: 'personal',
      description: '또 다른 개인 프로젝트입니다.',
      techStack: ['Vue', 'Vite', 'Pinia'],
    },
  ]

  const filteredProjects = projects.filter(
    (project) => project.type === activeTab
  )

  const handleProjectClick = (projectId) => {
    // 현재 스크롤 위치 저장
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

        <TabsContainer>
          <Tab
            $active={activeTab === 'company'}
            onClick={() => setActiveTab('company')}
          >
            Company
          </Tab>
          <Tab
            $active={activeTab === 'personal'}
            onClick={() => setActiveTab('personal')}
          >
            Personal
          </Tab>
        </TabsContainer>

        <ProjectGrid>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleProjectClick(project.id)}
            >
              <Placeholder>Thumbnail</Placeholder>
              <CardContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TechStack>
                  {project.techStack.map((tech) => (
                    <TechBadge key={tech}>{tech}</TechBadge>
                  ))}
                </TechStack>
              </CardContent>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </Container>
    </ProjectsSection>
  )
}

export default Projects
