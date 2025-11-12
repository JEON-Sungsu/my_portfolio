export const projects = [
  {
    slug: 'monki-qr-order',
    title: 'Monki QR Order',
    badge: 'React',
    icons: [
      {
        path: '/assets/icons/ic_mobile_web.svg',
        label: 'Mobile web',
        size: '80px',
      },
    ],
    techStack: ['React', 'NextJS14', 'Zustand', 'TanstackQuery', 'Websocket'],
    role: 'Frontend',
    description: 'QR 스캔을 통한 테이블 주문 모바일 웹 시스템',
  },
  {
    slug: 'monki-tableorder',
    title: 'Monki Tableorder',
    badge: 'Flutter',
    icons: [
      {
        path: '/assets/icons/ic_tablet.svg',
        label: 'Tablet',
        size: '80px',
      },
    ],
    techStack: ['Flutter', 'Dart', 'Provider', 'Android'],
    role: 'Frontend',
    description: 'Android Custom Device 기반 테이블 주문 어플리케이션',
  },
  {
    slug: 'monki-CEO',
    title: 'Monki CEO App',
    badge: 'Flutter',
    icons: [
      {
        path: '/assets/icons/ic_mobile.svg',
        label: 'Mobile App',
        size: '80px',
      },
      {
        path: '/assets/icons/ic_tablet.svg',
        label: 'Tablet',
        size: '80px',
      },
    ],
    techStack: ['Flutter', 'Dart', 'riverpod', 'MQTT'],
    role: 'Frontend',
    description: '모바일 매장관리 어플리케이션',
  },
  {
    slug: 'monki-waitlist',
    title: 'Monki Waitlist',
    badge: 'Flutter',
    icons: [
      {
        path: '/assets/icons/ic_tablet.svg',
        label: 'Tablet',
        size: '80px',
      },
    ],
    techStack: ['Flutter', 'Dart', 'riverpod', 'MQTT'],
    role: 'Frontend',
    description: '레스토랑 대기자 등록 어플리케이션',
  },
  {
    slug: 'monki-home-launcher',
    title: 'Monki Home Launcher',
    badge: 'Flutter',
    icons: [
      {
        path: '/assets/icons/ic_tablet.svg',
        label: 'Tablet',
        size: '80px',
      },
    ],
    techStack: ['Flutter', 'Dart', 'MethodChannel'],
    role: 'Frontend',
    description: 'Android Custom Device 홈 어플리케이션',
  },
  {
    slug: 'monki-pay-plugin',
    title: 'Monki Pay Plugin',
    badge: 'Flutter Plugin',
    icons: [
      {
        path: '/assets/icons/ic_code_block.svg',
        label: 'Plugin',
        size: '80px',
      },
    ],
    techStack: ['Flutter', 'Dart', 'MethodChannel', 'Java', 'Kotlin'],
    role: 'Frontend',
    description: '통합 결제 모듈 플러그인',
  },
];
