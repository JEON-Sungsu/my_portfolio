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
  FeatureDetailList,
  FeatureDetailItem,
  FeatureDetailTitle,
  FeatureDetailDescription,
  TechnicalDetailsList,
  TechnicalDetailItem,
  TroubleShootingList,
  TroubleShootingItem,
  TroubleTitle,
  TroubleContent,
  TroubleLabel,
} from './ProjectDetail.styles';

/**
 * 전체 정보 표시 프로젝트 상세 페이지 컴포넌트
 * featuresDetail + troubleshooting 모두 표시
 */
function ProjectDetailFull({ project }) {
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

      {project.featuresDetail && project.featuresDetail.length > 0 && (
        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SectionTitle>Key Features</SectionTitle>
          <FeatureDetailList>
            {project.featuresDetail.map((feature, index) => (
              <FeatureDetailItem key={index}>
                <FeatureDetailTitle>{feature.title}</FeatureDetailTitle>
                <FeatureDetailDescription>
                  {feature.description}
                </FeatureDetailDescription>
                {feature.technicalDetails &&
                  feature.technicalDetails.length > 0 && (
                    <TechnicalDetailsList>
                      {feature.technicalDetails.map((detail, detailIndex) => (
                        <TechnicalDetailItem key={detailIndex}>
                          {detail}
                        </TechnicalDetailItem>
                      ))}
                    </TechnicalDetailsList>
                  )}
              </FeatureDetailItem>
            ))}
          </FeatureDetailList>
        </Section>
      )}

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

export default ProjectDetailFull;
