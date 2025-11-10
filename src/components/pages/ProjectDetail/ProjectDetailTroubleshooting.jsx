import {
  Content,
  Section,
  SectionTitle,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  Description,
  FeatureList,
  FeatureItem,
  TechStack,
  TechBadge,
  TroubleShootingList,
  TroubleShootingItem,
  TroubleTitle,
  TroubleContent,
  TroubleLabel,
} from './ProjectDetail.styles';

/**
 * 트러블슈팅 위주 프로젝트 상세 페이지 컴포넌트
 * 기본 features + troubleshooting 표시
 */
function ProjectDetailTroubleshooting({ project }) {
  return (
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

      {project.troubleShooting && project.troubleShooting.length > 0 && (
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
                {trouble.impact && (
                  <>
                    <TroubleLabel>Impact</TroubleLabel>
                    <TroubleContent>{trouble.impact}</TroubleContent>
                  </>
                )}
              </TroubleShootingItem>
            ))}
          </TroubleShootingList>
        </Section>
      )}

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
  );
}

export default ProjectDetailTroubleshooting;
