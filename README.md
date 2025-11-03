# Frontend Developer Portfolio

프론트엔드 개발자 포트폴리오 웹사이트

## 기술 스택

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Styled-components
- **Animation**: Framer Motion
- **Icons**: React Icons
- **SEO**: React Helmet Async

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 `http://localhost:3000`에서 실행됩니다.

### 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

### 프리뷰

```bash
npm run preview
```

빌드된 프로젝트를 로컬에서 미리 볼 수 있습니다.

## 프로젝트 구조

```
portfolio/
├── public/              # 정적 파일
│   └── assets/         # 이미지, 아이콘 등
├── src/
│   ├── components/     # React 컴포넌트
│   │   ├── common/    # 공통 컴포넌트
│   │   ├── layout/    # 레이아웃 (Header, Footer)
│   │   └── sections/  # 섹션별 컴포넌트
│   ├── data/          # 프로젝트, 스킬 데이터
│   ├── hooks/         # Custom Hooks
│   ├── styles/        # 스타일 설정
│   │   ├── GlobalStyle.js
│   │   └── theme.js
│   ├── utils/         # 유틸리티 함수
│   ├── App.jsx        # 메인 앱 컴포넌트
│   └── index.jsx      # 진입점
├── index.html         # HTML 템플릿
└── vite.config.js     # Vite 설정
```

## 섹션 구성

1. **Header**: 고정 네비게이션 바
2. **Hero**: 프로필 및 메인 소개
3. **Projects**: 프로젝트 포트폴리오
4. **Skills**: 기술 스택
5. **Contact**: 연락처 및 문의 폼
6. **Footer**: 소셜 링크

## 커스터마이징

### 개인 정보 수정

1. **프로필 이미지**: `/public/assets/images/profile.jpg` 추가
2. **개인 정보**: 각 컴포넌트의 텍스트 수정
3. **프로젝트 데이터**: `/src/data/projects.js` 생성 및 수정
4. **기술 스택**: `/src/data/skills.js` 생성 및 수정

### 테마 수정

`src/styles/theme.js`에서 색상, 폰트, 간격 등을 수정할 수 있습니다.

### Contact 폼 연동

Contact 섹션의 폼을 실제로 작동시키려면:

1. **EmailJS**: https://www.emailjs.com/
2. **Formspree**: https://formspree.io/
3. **Netlify Forms**: Netlify 배포 시 자동 활성화

## 배포

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy
```

### GitHub Pages

```bash
npm install --save-dev gh-pages

# package.json에 추가:
# "homepage": "https://yourusername.github.io/portfolio",
# "deploy": "npm run build && gh-pages -d dist"

npm run deploy
```

## 라이선스

MIT License
