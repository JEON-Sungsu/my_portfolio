import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const ExperienceSection = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
  scroll-margin-top: ${({ theme }) => theme.spacing.xxl};
`

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`

const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  color: ${({ theme }) => theme.colors.blue};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  text-transform: uppercase;
`

const Timeline = styled.div`
  position: relative;
`

const ExperienceItem = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }
`

const CompanyLogo = styled.div`
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  flex-shrink: 0;
`

const ExperienceContent = styled.div`
  flex: 1;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`

const Position = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const Company = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textLight};
`

const Period = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textLight};
  white-space: nowrap;
`

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
`

function Experience() {
  const experiences = [
    {
      id: 1,
      logo: 'G',
      position: 'Lead Software Engineer',
      company: 'Google',
      period: 'Nov 2019 - Present',
      description: `As a Senior Software Engineer at Google, I played a pivotal role in developing innovative solutions for Google's core search algorithms. Collaborating with a dynamic team of engineers, I contributed to the enhancement of search accuracy and efficiency, optimizing user experiences for millions of users worldwide.`,
    },
    {
      id: 2,
      logo: '',
      position: 'Junior Software Engineer',
      company: 'Apple',
      period: 'Jan 2016 - Dec 2017',
      description: `During my tenure at Apple, I held the role of Software Architect, where I played a key role in shaping the architecture of mission-critical software projects. Responsible for designing scalable and efficient systems, I provided technical leadership to a cross-functional team.`,
    },
    {
      id: 3,
      logo: '∞',
      position: 'Software Engineer',
      company: 'Meta',
      period: 'Jan 2017 - Oct 2019',
      description: `At Meta, I served as a Software Engineer, focusing on the design and implementation of backend systems for the social media giant's dynamic platform. Working on projects that involved large-scale data processing and user engagement features, I leveraged my expertise to ensure seamless functionality and scalability.`,
    },
  ]

  return (
    <ExperienceSection id="experience">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Experience
        </SectionTitle>

        <Timeline>
          {experiences.map((exp, index) => (
            <ExperienceItem
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <CompanyLogo>{exp.logo}</CompanyLogo>
              <ExperienceContent>
                <Header>
                  <div>
                    <Position>
                      {exp.position} <Company>at {exp.company}</Company>
                    </Position>
                  </div>
                  <Period>{exp.period}</Period>
                </Header>
                <Description>{exp.description}</Description>
              </ExperienceContent>
            </ExperienceItem>
          ))}
        </Timeline>
      </Container>
    </ExperienceSection>
  )
}

export default Experience
