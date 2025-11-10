import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { projectDetail } from '../../../data/projectDetail';
import { getDisplayType } from '../../../utils/projectUtils';
import ProjectDetailTroubleshooting from './ProjectDetailTroubleshooting';
import ProjectDetailFeatures from './ProjectDetailFeatures';
import ProjectDetailFull from './ProjectDetailFull';
import {
  DetailContainer,
  BackButton,
  Hero,
  HeroContent,
  ProjectTitle,
  ProjectSubtitle,
} from './ProjectDetail.styles';

function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const project = projectDetail[slug] || projectDetail['monki-qr-order'];
  const displayType = getDisplayType(project);

  // 타입별 컴포넌트 렌더링
  const renderContent = () => {
    switch (displayType) {
      case 'features':
        return <ProjectDetailFeatures project={project} />;
      case 'full':
        return <ProjectDetailFull project={project} />;
      case 'troubleshooting':
      default:
        return <ProjectDetailTroubleshooting project={project} />;
    }
  };

  return (
    <DetailContainer>
      <BackButton onClick={() => navigate('/')}>
        <FaArrowLeft />
      </BackButton>

      <Hero>
        <HeroContent>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectSubtitle>{project.company}</ProjectSubtitle>
        </HeroContent>
      </Hero>

      {renderContent()}
    </DetailContainer>
  );
}

export default ProjectDetail;
