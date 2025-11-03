# Frontend Developer Portfolio - Design Specification

## 프로젝트 개요

**프로젝트명**: Frontend Developer Portfolio
**기술 스택**: React (CRA/Vite), CSS-in-JS (styled-components or Emotion)
**타입**: 단일 페이지 애플리케이션 (SPA)
**목적**: 프론트엔드 개발자의 포트폴리오 전시

---

## 1. 시스템 아키텍처

### 1.1 기술 선택 근거

```
React (without Next.js)
├─ 이유: 단일 페이지 수준의 정적 컨텐츠
├─ SSR/SSG 불필요
├─ SEO: react-helmet-async로 메타태그 관리
└─ 배포: GitHub Pages, Netlify, Vercel Static
```

### 1.2 프로젝트 구조

```
portfolio/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── assets/
│       ├── images/          # 프로필 이미지, 프로젝트 썸네일
│       └── icons/           # 기술 스택 아이콘
├── src/
│   ├── components/
│   │   ├── common/          # 공통 컴포넌트
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   └── ScrollToTop/
│   │   ├── layout/          # 레이아웃 컴포넌트
│   │   │   ├── Header/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Header.styles.js
│   │   │   │   └── Navigation.jsx
│   │   │   └── Footer/
│   │   │       ├── Footer.jsx
│   │   │       └── Footer.styles.js
│   │   └── sections/        # 섹션별 컴포넌트
│   │       ├── Hero/        # 프로필 + 간단 자기소개
│   │       │   ├── Hero.jsx
│   │       │   ├── Hero.styles.js
│   │       │   └── ProfileImage.jsx
│   │       ├── About/       # 상세 자기소개 (선택)
│   │       │   └── About.jsx
│   │       ├── Projects/
│   │       │   ├── Projects.jsx
│   │       │   ├── ProjectCard.jsx
│   │       │   ├── ProjectModal.jsx (상세보기)
│   │       │   └── Projects.styles.js
│   │       ├── Skills/
│   │       │   ├── Skills.jsx
│   │       │   ├── SkillCategory.jsx
│   │       │   └── Skills.styles.js
│   │       └── Contact/
│   │           ├── Contact.jsx
│   │           ├── ContactForm.jsx
│   │           └── Contact.styles.js
│   ├── data/
│   │   ├── projects.js      # 프로젝트 데이터
│   │   ├── skills.js        # 기술 스택 데이터
│   │   └── profile.js       # 개인 정보
│   ├── hooks/
│   │   ├── useScrollSpy.js  # 현재 섹션 트래킹
│   │   ├── useIntersectionObserver.js  # 스크롤 애니메이션
│   │   └── useTheme.js      # 다크모드 (선택)
│   ├── styles/
│   │   ├── GlobalStyle.js
│   │   ├── theme.js
│   │   └── animations.js
│   ├── utils/
│   │   ├── constants.js
│   │   └── validators.js    # 폼 검증
│   ├── App.jsx
│   ├── App.styles.js
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

---

## 2. 섹션별 설계

### 2.1 Header (고정 네비게이션)

**기능**:
- 스크롤에 따라 투명도 변경 또는 그림자 추가
- 섹션 앵커 네비게이션
- 현재 섹션 하이라이트 (Scroll Spy)
- 모바일: 햄버거 메뉴

**컴포넌트 구조**:
```jsx
<Header sticky transparent={scrollPosition < 100}>
  <Logo />
  <Navigation>
    <NavLink href="#hero">Home</NavLink>
    <NavLink href="#projects">Projects</NavLink>
    <NavLink href="#skills">Skills</NavLink>
    <NavLink href="#contact">Contact</NavLink>
  </Navigation>
  <ThemeToggle /> {/* 선택: 다크모드 */}
</Header>
```

**주요 기능**:
- `useScrollSpy()` 훅으로 현재 섹션 추적
- Smooth scroll 동작
- 모바일 반응형 메뉴

---

### 2.2 Hero Section (프로필 + 간단 자기소개)

**레이아웃**:
```
┌─────────────────────────────────────┐
│                                     │
│         [Profile Image]             │
│                                     │
│         안녕하세요,                  │
│     Frontend Developer              │
│         홍길동입니다                 │
│                                     │
│   [간단한 소개 문구 1-2줄]          │
│                                     │
│   [View Projects ↓] [Contact Me]   │
│                                     │
└─────────────────────────────────────┘
```

**컴포넌트**:
```jsx
<Hero>
  <ProfileImage src="/assets/profile.jpg" alt="profile" />
  <Title>
    <Greeting>안녕하세요,</Greeting>
    <Role>Frontend Developer</Role>
    <Name>홍길동입니다</Name>
  </Title>
  <Description>
    사용자 경험을 최우선으로 생각하는 프론트엔드 개발자입니다.
  </Description>
  <CTAButtons>
    <Button href="#projects">프로젝트 보기</Button>
    <Button variant="outline" href="#contact">연락하기</Button>
  </CTAButtons>
</Hero>
```

**애니메이션**:
- Fade-in + Slide-up 효과
- 타이핑 애니메이션 (선택)

---

### 2.3 Projects Section

**레이아웃**: 그리드 카드 형식 (2-3열)

```
┌─────────────────────────────────────┐
│          My Projects                │
├─────────────┬───────────┬───────────┤
│  [Project1] │ [Project2]│ [Project3]│
│  Thumbnail  │ Thumbnail │ Thumbnail │
│  Title      │ Title     │ Title     │
│  Tech Stack │ Tech Stack│ Tech Stack│
│  [View]     │ [View]    │ [View]    │
└─────────────┴───────────┴───────────┘
```

**데이터 구조** (`data/projects.js`):
```js
export const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "React와 Redux를 활용한 전자상거래 플랫폼",
    thumbnail: "/assets/projects/project1.jpg",
    techStack: ["React", "Redux", "Styled-components", "Firebase"],
    features: [
      "실시간 장바구니 관리",
      "결제 시스템 통합",
      "반응형 디자인"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/username/project",
    detailImages: ["/assets/projects/project1-1.jpg"],
    challenges: "대용량 상품 데이터 최적화 및 성능 개선",
    role: "프론트엔드 개발 (100%)"
  },
  // ... more projects
];
```

**컴포넌트**:
```jsx
<Projects>
  <SectionTitle>Projects</SectionTitle>
  <ProjectGrid>
    {projects.map(project => (
      <ProjectCard key={project.id} project={project}>
        <Thumbnail src={project.thumbnail} />
        <CardContent>
          <Title>{project.title}</Title>
          <TechStack>
            {project.techStack.map(tech => (
              <TechBadge key={tech}>{tech}</TechBadge>
            ))}
          </TechStack>
          <Actions>
            <Button onClick={() => openModal(project)}>상세보기</Button>
            <IconButton href={project.githubUrl}>GitHub</IconButton>
          </Actions>
        </CardContent>
      </ProjectCard>
    ))}
  </ProjectGrid>

  {/* 모달: 프로젝트 상세 정보 */}
  <ProjectModal project={selectedProject} onClose={closeModal} />
</Projects>
```

**기능**:
- 카드 호버 애니메이션
- 모달로 상세 정보 표시
- 기술 스택 필터링 (선택)
- Lazy loading (이미지 최적화)

---

### 2.4 Skills Section

**레이아웃**: 카테고리별 그룹핑

```
┌─────────────────────────────────────┐
│          Tech Stack                 │
├─────────────────────────────────────┤
│  Frontend                           │
│  [React] [Vue] [TypeScript] [...]   │
├─────────────────────────────────────┤
│  Styling                            │
│  [CSS3] [Sass] [Styled-components]  │
├─────────────────────────────────────┤
│  Tools & Others                     │
│  [Git] [Webpack] [Figma] [...]      │
└─────────────────────────────────────┘
```

**데이터 구조** (`data/skills.js`):
```js
export const skills = {
  frontend: [
    { name: "React", level: 90, icon: "/assets/icons/react.svg" },
    { name: "JavaScript", level: 85, icon: "/assets/icons/js.svg" },
    { name: "TypeScript", level: 80, icon: "/assets/icons/ts.svg" },
  ],
  styling: [
    { name: "CSS3", level: 90, icon: "/assets/icons/css.svg" },
    { name: "Styled-components", level: 85 },
    { name: "Tailwind CSS", level: 75 },
  ],
  tools: [
    { name: "Git", level: 85, icon: "/assets/icons/git.svg" },
    { name: "Webpack", level: 70 },
    { name: "Figma", level: 80, icon: "/assets/icons/figma.svg" },
  ]
};
```

**컴포넌트**:
```jsx
<Skills>
  <SectionTitle>Tech Stack</SectionTitle>
  {Object.entries(skills).map(([category, items]) => (
    <SkillCategory key={category} title={category}>
      <SkillGrid>
        {items.map(skill => (
          <SkillItem key={skill.name}>
            {skill.icon && <SkillIcon src={skill.icon} />}
            <SkillName>{skill.name}</SkillName>
            {/* 선택: 숙련도 바 */}
            <SkillBar level={skill.level} />
          </SkillItem>
        ))}
      </SkillGrid>
    </SkillCategory>
  ))}
</Skills>
```

**시각화 옵션**:
1. **아이콘 그리드**: 심플하고 깔끔
2. **프로그레스 바**: 숙련도 시각화
3. **태그 클라우드**: 동적이고 인터랙티브

---

### 2.5 Contact Section

**레이아웃**:
```
┌─────────────────────────────────────┐
│          Get In Touch               │
├──────────────┬──────────────────────┤
│  Contact Form│  Contact Info        │
│  [Name]      │  Email: x@example.com│
│  [Email]     │  GitHub: github.com/x│
│  [Message]   │  LinkedIn: linkedin/x│
│  [Send]      │                      │
└──────────────┴──────────────────────┘
```

**컴포넌트**:
```jsx
<Contact>
  <SectionTitle>Contact Me</SectionTitle>
  <ContactContainer>
    <ContactForm onSubmit={handleSubmit}>
      <Input name="name" placeholder="이름" required />
      <Input name="email" type="email" placeholder="이메일" required />
      <Textarea name="message" placeholder="메시지" required />
      <Button type="submit">보내기</Button>
    </ContactForm>

    <ContactInfo>
      <InfoItem>
        <Icon name="email" />
        <Link href="mailto:your@email.com">your@email.com</Link>
      </InfoItem>
      <InfoItem>
        <Icon name="github" />
        <Link href="https://github.com/username">github.com/username</Link>
      </InfoItem>
      <InfoItem>
        <Icon name="linkedin" />
        <Link href="https://linkedin.com/in/username">LinkedIn Profile</Link>
      </InfoItem>
    </ContactInfo>
  </ContactContainer>
</Contact>
```

**폼 제출 옵션**:
1. **EmailJS**: 클라이언트 사이드 이메일 전송
2. **Formspree**: 무료 폼 백엔드 서비스
3. **Netlify Forms**: Netlify 호스팅 시 내장 기능

---

### 2.6 Footer

**레이아웃**:
```
┌─────────────────────────────────────┐
│  [GitHub] [LinkedIn] [Email]        │
│  © 2024 Your Name. All rights reserved│
└─────────────────────────────────────┘
```

**컴포넌트**:
```jsx
<Footer>
  <SocialLinks>
    <SocialIcon href="https://github.com/username" icon="github" />
    <SocialIcon href="https://linkedin.com/in/username" icon="linkedin" />
    <SocialIcon href="mailto:your@email.com" icon="email" />
  </SocialLinks>
  <Copyright>© 2024 Your Name. All rights reserved.</Copyright>
</Footer>
```

---

## 3. 기술적 구현 사항

### 3.1 상태 관리

**불필요한 이유**:
- 정적 데이터 중심 (projects, skills)
- 컴포넌트 간 공유 상태 최소
- React Context로 충분 (테마, 모달 상태)

**Context 사용 예시**:
```jsx
// ThemeContext (다크모드)
// ModalContext (프로젝트 모달)
```

### 3.2 스타일링 전략

**권장: styled-components**

**이유**:
- 컴포넌트 기반 스타일링
- 동적 스타일링 용이 (props 기반)
- 테마 지원 (다크모드)

**테마 설정**:
```js
// styles/theme.js
export const theme = {
  colors: {
    primary: '#0066CC',
    secondary: '#FF6B6B',
    background: '#FFFFFF',
    text: '#333333',
    gray: '#F5F5F5'
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1440px'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '48px'
  }
};

// 다크모드
export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: '#1A1A1A',
    text: '#E0E0E0'
  }
};
```

### 3.3 애니메이션 전략

**라이브러리**: Framer Motion (권장)

**적용 영역**:
1. **페이지 로드**: 섹션별 순차 Fade-in
2. **스크롤 애니메이션**: Intersection Observer
3. **호버 효과**: 카드, 버튼 인터랙션
4. **모달**: 슬라이드/페이드 전환

**예시**:
```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  <ProjectCard />
</motion.div>
```

### 3.4 반응형 디자인

**Breakpoints**:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**전략**:
- Mobile-first 접근
- Flexbox/Grid 레이아웃
- 이미지: srcset, lazy loading

---

## 4. 성능 최적화

### 4.1 이미지 최적화
- **WebP 포맷** 사용
- **Lazy loading**: react-lazy-load-image-component
- **썸네일**: 최적화된 크기 (300x200px 정도)

### 4.2 코드 스플리팅
```jsx
const ProjectModal = lazy(() => import('./ProjectModal'));
```

### 4.3 SEO
- **react-helmet-async**: 메타 태그 관리
- **sitemap.xml**: 정적 생성
- **robots.txt**: 크롤링 허용

---

## 5. 배포 전략

### 추천 플랫폼

1. **Vercel**:
   - 자동 배포
   - 무료 HTTPS
   - Git 연동

2. **Netlify**:
   - 폼 기능 내장
   - 자동 배포
   - 무료 도메인

3. **GitHub Pages**:
   - 완전 무료
   - `gh-pages` 패키지로 간단 배포

**빌드 최적화**:
```json
{
  "scripts": {
    "build": "react-scripts build",
    "deploy": "npm run build && gh-pages -d build"
  }
}
```

---

## 6. 개발 로드맵

### Phase 1: 기본 구조 (1-2일)
- [x] 프로젝트 세팅 (CRA/Vite)
- [x] 폴더 구조 생성
- [x] 기본 라우팅 및 레이아웃

### Phase 2: 섹션 개발 (3-4일)
- [x] Header + Navigation
- [x] Hero Section
- [x] Projects Section
- [x] Skills Section
- [x] Contact Section
- [x] Footer

### Phase 3: 인터랙션 & 스타일링 (2-3일)
- [x] 애니메이션 적용
- [x] 반응형 디자인
- [x] 다크모드 (선택)

### Phase 4: 최적화 & 배포 (1-2일)
- [x] 성능 최적화
- [x] SEO 설정
- [x] 배포

**총 예상 기간**: 7-11일

---

## 7. 추가 고려사항

### 선택적 기능
1. **다크모드**: 사용자 선호도 저장 (localStorage)
2. **다국어**: i18next (한/영)
3. **블로그**: 간단한 마크다운 기반 블로그 섹션
4. **방문자 통계**: Google Analytics

### 접근성
- **ARIA 라벨**: 스크린 리더 지원
- **키보드 네비게이션**: Tab 순서 관리
- **색상 대비**: WCAG 2.1 AA 기준

---

## 8. 참고 자료

- **디자인 영감**:
  - Dribbble, Behance (포트폴리오 디자인)
  - awwwards.com (인터랙티브 효과)

- **UI 컴포넌트**:
  - Material-UI, Ant Design (참고용)
  - Custom 구현 권장 (차별화)

- **아이콘**:
  - React Icons (react-icons)
  - Font Awesome

---

## 다음 단계

1. **프로젝트 초기화**: CRA 또는 Vite로 React 프로젝트 생성
2. **데이터 준비**: `data/` 폴더에 프로젝트, 스킬 데이터 작성
3. **컴포넌트 개발**: 섹션별로 순차 개발
4. **스타일링**: 테마 및 GlobalStyle 적용
5. **배포**: Vercel/Netlify로 배포 후 도메인 연결

---

**문서 작성일**: 2025-10-28
**버전**: 1.0
