import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const SkillsSection = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};
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
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`

const SkillCategory = styled(motion.div)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const CategoryTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-transform: capitalize;
`

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`

const SkillItem = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
  transition: all ${({ theme }) => theme.transition.medium};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    transform: translateY(-4px);
  }
`

const SkillName = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`

function Skills() {
  // Placeholder data - 나중에 data/skills.js에서 import
  const skills = {
    frontend: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3'],
    styling: ['Styled-components', 'Sass', 'Tailwind CSS'],
    tools: ['Git', 'Webpack', 'Vite', 'Figma'],
  }

  return (
    <SkillsSection id="skills">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Tech Stack
        </SectionTitle>

        {Object.entries(skills).map(([category, items], categoryIndex) => (
          <SkillCategory
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
          >
            <CategoryTitle>{category}</CategoryTitle>
            <SkillGrid>
              {items.map((skill, index) => (
                <SkillItem
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <SkillName>{skill}</SkillName>
                </SkillItem>
              ))}
            </SkillGrid>
          </SkillCategory>
        ))}
      </Container>
    </SkillsSection>
  )
}

export default Skills
