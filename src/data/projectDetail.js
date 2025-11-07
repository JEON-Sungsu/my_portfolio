export const projectDetail = {
  'monki-qr-order': {
    title: 'Monki QR Order',
    company: 'MonthlyKitchen',
    period: '2023.03 - 2024.01',
    role: 'Frontend Developer',
    team: '4명 (FE 2, BE 2)',
    description:
      '월간주방의 주문 관리 시스템을 개발한 프로젝트입니다. 레스토랑과 주방 간의 효율적인 주문 흐름을 구현하여 운영 효율성을 크게 향상시켰습니다.',
    features: [
      '실시간 주문 처리 및 상태 관리 시스템',
      '주방 디스플레이 시스템(KDS) 구현',
      '주문 통계 및 분석 대시보드',
      '다중 레스토랑 지원을 위한 관리자 패널',
      '모바일 반응형 디자인 적용',
    ],
    techStack: ['React', 'NextJS14', 'Zustand', 'TanstackQuery', 'Websocket'],
    troubleShooting: [
      {
        title: '실시간 주문 데이터 동기화 이슈',
        problem:
          '여러 기기에서 동시에 주문을 처리할 때 데이터 불일치가 발생하여 주문이 중복되거나 누락되는 문제가 발생했습니다.',
        solution:
          'WebSocket 연결을 통한 실시간 양방향 통신을 구현하고, Zustand를 활용한 낙관적 업데이트(Optimistic Update) 패턴을 적용했습니다. 또한 충돌 해결을 위한 버전 관리 시스템을 도입하여 데이터 일관성을 보장했습니다.',
      },
      {
        title: '대량 주문 처리 시 성능 저하',
        problem:
          '피크 시간대에 100개 이상의 주문이 동시에 처리될 때 렌더링 성능이 급격히 저하되어 UI가 멈추는 현상이 발생했습니다.',
        solution:
          'React.memo와 useMemo를 활용한 불필요한 리렌더링 방지, 가상화(Virtualization) 기법을 적용한 주문 리스트 구현, 그리고 Web Worker를 활용한 무거운 계산 작업의 백그라운드 처리로 성능을 개선했습니다.',
      },
    ],
    learnings:
      '대규모 상태 관리의 중요성을 깨달았고, Zustand를 활용한 효율적인 상태 관리 패턴을 학습했습니다. 또한 실시간 데이터 처리를 위한 WebSocket 통신과 최적화 기법을 익혔습니다.',
  },
  'monki-tableorder': {
    title: 'Monki Tableorder',
    company: 'MonthlyKitchen',
    period: '2023.06 - 2024.03',
    role: 'Frontend Developer',
    team: '3명 (FE 1, BE 2)',
    description:
      '안드로이드 태블릿 기반 테이블 주문 앱을 개발한 프로젝트입니다. Flutter를 활용하여 직관적인 UI와 빠른 주문 처리를 구현했습니다.',
    features: [
      '태블릿 최적화 UI/UX 디자인',
      '오프라인 모드 지원',
      '실시간 메뉴 업데이트',
      '주문 히스토리 관리',
      '다국어 지원',
    ],
    techStack: ['Flutter', 'Dart', 'Provider', 'Android'],
    troubleShooting: [
      {
        title: '오프라인 모드 데이터 동기화',
        problem:
          '네트워크 연결이 불안정한 환경에서 오프라인 모드와 온라인 모드 간 데이터 동기화 문제가 발생했습니다.',
        solution:
          'Local Database(SQLite)를 활용한 오프라인 데이터 저장과 네트워크 연결 복구 시 자동 동기화 로직을 구현했습니다. 충돌 해결을 위한 타임스탬프 기반 병합 전략을 적용했습니다.',
      },
    ],
    learnings:
      'Flutter를 활용한 크로스 플랫폼 개발 경험을 쌓았고, Provider를 통한 상태 관리와 오프라인 우선 아키텍처를 학습했습니다.',
  },
  'monki-waitlist': {
    title: 'Monki Waitlist',
    company: 'MonthlyKitchen',
    period: '2024.01 - 2024.06',
    role: 'Frontend Developer',
    team: '2명 (FE 1, BE 1)',
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
    learnings:
      'MQTT 프로토콜을 활용한 경량 실시간 통신 구현 경험을 쌓았고, riverpod을 통한 선언적 상태 관리 패턴을 학습했습니다.',
  },
};
