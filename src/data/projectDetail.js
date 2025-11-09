export const projectDetail = {
  'monki-qr-order': {
    title: 'Monki QR Order',
    company: 'MonthlyKitchen',
    period: '2025.09 - 진행중',
    role: ['Frontend 단독 신규 개발', '기획 & 설계 & 구현 전과정 참여'],
    team: '2명 (FE 1, BE 1)',
    os: 'Web (Mobile, Tablet)',
    deployment: 'ArgoCD, Github Actions',
    description:
      '레스토랑에서 사용하는 QR 코드 비대면 주문 시스템입니다. 테이블의 QR 코드를 스캔하면 모바일 웹으로 접속하여 메뉴 주문이 가능하며, 동일 테이블의 여러 사람이 실시간으로 장바구니를 공유하며 주문할 수 있는 것이 핵심 기능입니다.',
    features: [
      'WebSocket 기반 실시간 장바구니 동기화',
      '다중 사용자 주문 지원 - 일행과 함께 주문시 단일결제, 개별결제 모두 가능',
      'PG 결제 연동 (KICC)',
    ],
    techStack: [
      'React',
      'NextJS14',
      'Zustand',
      'TanstackQuery',
      'Websocket',
      'TailwindCSS v4',
      'Sentry',
    ],
    troubleShooting: [
      {
        title: '소켓 이벤트 폭주로 인한 프레임 드랍',
        problem:
          '피크 시간대 WS 업데이트가 수십 건/초 발생하며 리렌더링이 과도했습니다.',
        solution:
          '메시지 타입별 핸들러를 모듈화하고 300ms 디바운스, 변경 감지 비교를 추가해 불필요한 상태 업데이트를 차단했습니다.',
        impact: '장바구니 섹션 렌더링 횟수 60% 감소, 프레임 드랍 제로',
      },
      {
        title: 'React Query 캐시 무효화로 초기화 지연',
        problem:
          '기본 staleTime이 짧아 페이지 이동마다 API를 다시 호출했습니다.',
        solution:
          'staleTime/gcTime을 30초/5분으로 조정하고 초기 프리패칭 훅에 선행 호출을 묶어 초기 로딩을 단축했습니다.',
        impact: 'API 호출량 40% 감소, 최초 페인트 체감 1.2초 개선',
      },
    ],
    learnings:
      '대규모 상태 관리의 중요성을 깨달았고, Zustand를 활용한 효율적인 상태 관리 패턴을 학습했습니다. 또한 실시간 데이터 처리를 위한 WebSocket 통신과 최적화 기법을 익혔습니다.',
  },
  'monki-tableorder': {
    title: 'Monki Tableorder',
    company: 'MonthlyKitchen',
    period: '2024.11 - 현재',
    role: [
      'Flutter Frontend 유지보수 및 기능 개선',
      '운영 이슈 대응 및 실시간 hotfix 배포',
    ],
    team: '팀 3명 (FE 3, BE 2)',
    os: 'Android, Windows',
    deployment: 'Jenkins, OTA',
    description:
      '레스토랑용 Flutter 기반 테이블 주문 앱입니다. Android/Windows 크로스 플랫폼을 지원하며, 선불/후불 하이브리드 결제 시스템, MQTT 기반 실시간 주문 관리, 5개 언어 다국어 지원, 주방 디스플레이 시스템(KDS)을 지원합니다.',
    features: [
      '선불/후불 하이브리드 결제 시스템',
      'MQTT 기반 실시간 주문 관리 (품절 알림, 메뉴 상태 동기화)',
      'Method Channel 기반 네이티브 플러그인 연동 (결제, 영수증 프린터, Sysmtem)',
      '5개 언어 다국어 지원 (한국어, 영어, 일본어, 중국어 간체/번체)',
      '사용자 & 관리자 & 주방 디스플레이 시스템(KDS) 통합',
      '쿠폰/포인트 베네핏 시스템 통합',
      '크로스 플랫폼 지원 (Android, Windows)',
    ],
    techStack: [
      'Flutter',
      'Dart',
      'Provider',
      'Method Channel',
      'GetIt',
      'Retrofit',
      'Dio',
      'MVVM',
      'MQTT',
      'Firebase Crashlytics',
      'Sentry',
    ],
    troubleShooting: [
      {
        title: 'Silent update 구현',
        problem:
          '업데이트시 사용자의 개입이 필요하여 다중 기기를 사용하는 레스토랑에서 불편함을 겪었고, 기기별 업데이트 누락이 발생했습니다.',
        solution:
          '기존 OTA 업데이트를 대체하는 silent update를 설계했습니다. 백그라운드에서 업데이트 파일을 다운로드하고, 완료시 Broadcast를 통해 Home Launcher로 재시작을 트리거하는 방식을 구현했습니다.',
        impact:
          '기기별 수동 업데이트 필요성 제거를 통한 사용자 편의성 증대, 업데이트 누락 이슈 100% 해결',
      },
      {
        title: '주문누락 개선',
        problem:
          '테이블오더에서 결제를 진행시, 외부 에이전트가 활성화 되면서 앱이 백그라운드로 전환되는 경우가 있었습니다. 이로 인해 에이전트에서 결제정보를 받지 못해 결제는 완료되었으나, 사용자는 앱이 종료되었다고 생각하여, 기기를 재부팅하는 상황이 발생했고, 테이블오더에서 결제 결과를 수신하지 못하여 주문누락 이슈가 발생했습니다.',
        solution:
          'AppLifecycleState를 활용하여 앱이 백그라운드로 전환될 때 Home Launcher 로 Boradcast 통신을 보내고, 이를 수신한 Home Launcher가 앱을 포그라운드로 복귀시키는 방식을 구현했습니다. 이를 통해 백그라운드 전환 상황에서도 앱이 다시 복귀시켜 정상적으로 동작하도록 개선했습니다.',
        impact: '월 평균 5건의 주문누락 이슈를 평균 1건 이하로 개선',
      },
      {
        title: '실시간 이슈 트래킹',
        problem:
          '기존 Sentry, Firebase Crashlytics 기반 에러 로깅은 상세한 이슈 파악에 한계가 있었습니다. 특히, 결제 관련 이슈는 즉각적인 대응이 필요했으나, 기존 시스템으로는 신속한 파악이 어려웠습니다.',
        solution:
          'CloudWatch Logs를 도입하여 실시간 로그 모니터링 시스템을 구축했습니다. 결제 관련 주요 이벤트를 CloudWatch Logs로 전송하여 신속하게 이슈를 인지하고 대응할 수 있도록 했습니다. 기존 Sentry는 디버깅 및 기타 이슈 처리, Crashlytics는 네이티브 및 크래시 관련 이슈를 트래킹 하도록 각 도구별로 역할을 분리하여 신속하고 다양한 이슈를 분석하고 대응할 수 있는 체계를 마련했습니다. ',
        impact: '실시간 이슈 대응 시간 평균 1시간에서 20분 이내로 단축',
      },
    ],
  },
  'monki-waitlist': {
    title: 'Monki Waitlist',
    company: 'MonthlyKitchen',
    period: '2024.01 - 2024.06',
    role: [
      'Flutter Frontend 개발',
      'MQTT 실시간 대기 순번 알림 시스템 구현',
      'Riverpod 상태 관리 설계',
    ],
    team: '2명 (FE 1, BE 1)',
    os: 'Android, iOS',
    deployment: 'Google Play Store, App Store',
    description:
      '레스토랑 대기자 명단 관리 앱을 개발한 프로젝트입니다. MQTT 프로토콜을 활용하여 실시간 대기 현황 업데이트를 구현했습니다.',
    features: [
      '실시간 대기 순번 알림',
      '예상 대기 시간 자동 계산',
      'SMS/Push 알림 통합',
      '대기자 통계 및 분석',
      '모바일 및 태블릿 동시 지원',
    ],
    techStack: ['Flutter', 'Dart', 'riverpod', 'MQTT'],
    troubleShooting: [
      {
        title: 'MQTT 연결 안정성 이슈',
        problem:
          '네트워크 환경 변화나 앱 백그라운드 전환 시 MQTT 연결이 끊어져 실시간 업데이트가 중단되는 문제가 발생했습니다.',
        solution:
          '자동 재연결 로직과 연결 상태 모니터링을 구현했습니다. 또한 QoS 레벨 조정과 Keep-alive 설정 최적화를 통해 연결 안정성을 크게 향상시켰습니다.',
      },
    ],
  },
};
