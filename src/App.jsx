import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

// Common components
import ScrollToTop from './components/common/ScrollToTop';

// Layout components
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';

// Section components
import Hero from './components/sections/Hero/Hero';
import Projects from './components/sections/Projects/Projects';
import Experience from './components/sections/Experience/Experience';
import Contact from './components/sections/Contact/Contact';

// Page components
import ProjectDetail from './components/pages/ProjectDetail/ProjectDetail';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const Main = styled.main`
  width: 100%;
`;

function HomePage() {
  return (
    <>
      <Header />
      <Main>
        <Hero />
        <Projects />
        <Experience />
        <Contact />
      </Main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <Helmet>
        <title>JEON-Sungsu Portfolio</title>
        <meta name='description' content='프론트엔드 개발자 포트폴리오' />
      </Helmet>

      <BrowserRouter>
        <ScrollToTop />
        <AppContainer>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/project/:slug' element={<ProjectDetail />} />
          </Routes>
        </AppContainer>
      </BrowserRouter>
    </>
  );
}

export default App;
