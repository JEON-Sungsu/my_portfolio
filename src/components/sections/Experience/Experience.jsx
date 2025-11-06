import styled from 'styled-components';
import { motion } from 'framer-motion';

const ExperienceSection = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xxl}
    ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
  scroll-margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  color: ${({ theme }) => theme.colors.blue};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  text-transform: uppercase;
`;

const Timeline = styled.div`
  position: relative;
`;

const ExperienceItem = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ExperienceContent = styled.div`
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Company = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Position = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textLight};
`;

const Period = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textLight};
  white-space: nowrap;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
`;

function Experience() {
  const experiences = [
    {
      id: 1,
      position: 'Mobile & Frontend Engineer',
      company: 'MonthlyKitchen',
      period: '2024.09 - 재직중',
      description: `Flutter 기반의 Tableorder·Waitlist 등 주요 모바일 서비스를 중심으로 유지보수와 신규 기능 개발을 담당했습니다. 운영 중 발생하는 결제·주문·웨이팅 이슈를 신속하게 분석하고 대응하며, 안정적인 서비스 운영 체계를 구축했습니다. 또한 React 기반의 신규 웹 프로젝트와 백오피스 관리 페이지 유지보수를 함께 담당하며, 프론트엔드 전반의 기술 스택을 유기적으로 다뤘습니다. 이를 통해 개발·운영·배포 전 과정을 폭넓게 경험하며, 서비스 품질과 효율을 함께 개선했습니다.`,
    },
    {
      id: 2,
      position: 'Frontend Engineer',
      company: 'SJSofttech',
      period: '2022.02 - 2023.06',
      description: `금융, 헬스케어, 커머스 도메인의 웹 프론트엔드 개발을 수행했습니다. HTML, CSS, JavaScript, jQuery로 반응형 UI를 구축하며 퍼블리싱 역량을 강화했고, 기획·디자인·서버팀과 협업해 요구사항 정의부터 API 연동, 테스트, 배포까지 전 과정에 참여했습니다. 이후 React와 React Native 기반 프로젝트에 참여하여, 플랫폼 전환 및 코드 품질 개선을 수행했습니다. 이러한 경험을 통해 기획·디자인·서버팀과의 협업 프로세스 전반을 체계적으로 이해하고, 프론트엔드 개발자로서의 실무 역량을 확장했습니다.`,
    },
    {
      id: 3,
      position: 'PM & 웹퍼블리셔',
      company: '국제영화제',
      period: '2019.06 - 2021.11',
      description: `공식 웹사이트의 콘텐츠 운영과 행사 페이지 개편 프로젝트를 담당했습니다. 디자이너·개발자·운영팀 간의 커뮤니케이션 허브로서 일정 조율과 외주 관리 프로세스를 효율화했고, 웹 구조 개편을 통해 사용자 중심의 콘텐츠 경험을 개선했습니다. 이러한 경험은 협업 중심의 커뮤니케이션 능력과 프로젝트 관리 감각을 다지는 계기가 되었습니다.`,
    },
  ];

  return (
    <ExperienceSection id='experience'>
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
  );
}

export default Experience;
