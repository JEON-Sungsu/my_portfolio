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
    description: '안드로이드 태블릿 기반 테이블 주문 앱',
  },
  {
    slug: 'monki-waitlist',
    title: 'Monki Waitlist',
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
    description: '대기자 명단 관리 앱',
  },
];
