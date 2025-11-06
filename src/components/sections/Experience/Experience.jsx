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

const Company = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const Position = styled.span`
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
      position: 'Mobile & Frontend Engineer',
      company: 'MonthlyKitchen',
      period: '2024.09 - 재직중',
      description: `Flutter 기반 모바일 서비스 유지보수와 신규 기능 개발을 담당했습니다. 결제 모듈, 테이블오더, 웨이팅 앱 등 프로젝트를 운영하며 실시간 이슈 대응과 안정적인 서비스 운영 경험을 쌓았습니다. 백오피스 React 웹 관리 페이지 유지보수와 신규 프로젝트에도 참여하며 프론트엔드 스택을 확장했고, 배포 자동화와 이슈 관리 프로세스 개선에도 기여했습니다.`,
    },
    {
      id: 2,
      position: 'Frontend Engineer',
      company: 'SJSofttech',
      period: '2022.02 - 2023.06',
      description: `금융, 헬스케어, 커머스 도메인의 웹 프론트엔드 개발을 수행했습니다. HTML, CSS, JavaScript, jQuery로 반응형 UI를 구축하며 퍼블리싱 역량을 강화했고, 기획·디자인·서버팀과 협업해 요구사항 정의부터 API 연동, 테스트, 배포까지 전 과정에 참여했습니다. 이후 React 및 React Native 프로젝트로 프론트엔드 역량을 넓혔습니다.`,
    },
    {
      id: 3,
      position: 'PM & 웹퍼블리셔',
      company: '국제영화제',
      period: '2019.06 - 2021.11',
      description: `웹 퍼블리셔 겸 PM으로 영화제 공식 웹사이트 유지보수와 외주 관리를 담당했습니다. 디자이너, 개발자, 운영팀 간 커뮤니케이션을 조율하며 일정과 협업 프로세스를 최적화했고, 웹사이트 개편과 행사 페이지 운영을 통해 프로젝트 관리와 콘텐츠 운영 경험을 축적했습니다.`,
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
              <ExperienceContent>
                <Header>
                  <div>
                    <Company>
                      {exp.company} <Position>· {exp.position}</Position>
                    </Company>
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
