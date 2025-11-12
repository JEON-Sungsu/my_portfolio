export const projectDetail = {
  'monki-qr-order': {
    title: 'Monki QR Order',
    company: 'MonthlyKitchen',
    period: '2025.09 - 진행중',
    role: ['Frontend 단독 신규 개발', '기획 & 설계 & 구현 전과정 참여'],
    team: '2명 (FE 1, BE 1)',
    os: 'Web (Mobile, Tablet)',
    deployment: 'ArgoCD, Github Actions',
    displayType: 'features', // 'troubleshooting' | 'features' | 'full'
    description:
      '레스토랑에서 사용하는 QR 코드 비대면 주문 시스템입니다. 테이블의 QR 코드를 스캔하면 모바일 웹으로 접속하여 메뉴 주문이 가능하며, 동일 테이블의 여러 사람이 실시간으로 장바구니를 공유하며 주문할 수 있는 것이 핵심 기능입니다.',
    features: [
      'WebSocket 기반 실시간 장바구니 동기화',
      '다중 사용자 주문 지원 - 일행과 함께 주문시 단일결제, 개별결제 모두 가능',
      'PG 결제 연동 (KICC)',
    ],
    featuresDetail: [
      {
        title: 'WebSocket 기반 실시간 장바구니 동기화',
        description:
          '동일 테이블의 여러 사용자가 동시에 메뉴를 선택하고 장바구니에 담을 수 있는 실시간 동기화 시스템입니다.',
        technicalDetails: [
          'WebSocket 연결을 통한 양방향 실시간 통신 구현',
          'Room 기반 세션 관리로 테이블별 독립적인 장바구니 공간 제공',
          '낙관적 업데이트(Optimistic Update)로 빠른 UI 응답성 확보',
          '연결 끊김 시 자동 재연결 및 상태 복구 로직',
          'Debounce 처리로 불필요한 네트워크 트래픽 최소화',
        ],
      },
      {
        title: '다중 사용자 주문 지원 시스템',
        description:
          '일행과 함께 주문할 때 단일결제와 개별결제 모두 지원하여 다양한 결제 시나리오를 처리합니다.',
        technicalDetails: [
          '장바구니 항목별 소유자 추적 시스템',
          '단일결제: 대표자가 전체 금액 결제',
          '개별결제: 각자 선택한 메뉴만 결제',
          '결제 분할 로직 및 정산 기능',
          '주문 상태 실시간 공유 및 알림',
        ],
      },
      {
        title: 'PG 결제 연동 (KICC)',
        description:
          'KICC PG사와의 안정적인 결제 연동으로 신용카드, 간편결제 등 다양한 결제 수단을 지원합니다.',
        technicalDetails: [
          'KICC PG 결제 모듈 통합',
          '결제 보안 토큰 관리',
          '결제 실패 시 재시도 및 롤백 처리',
          '결제 이력 추적 및 영수증 발행',
          '환불 및 취소 프로세스 구현',
        ],
      },
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
    displayType: 'full', // 'troubleshooting' | 'features' | 'full'
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
    featuresDetail: [
      {
        title: '선불/후불 하이브리드 결제 시스템',
        description:
          '레스토랑 운영 방식에 따라 선불(주문 시 결제) 또는 후불(식사 후 결제)을 유연하게 선택할 수 있는 결제 시스템입니다.',
        technicalDetails: [
          '선불/후불 모드 전환 기능',
          '테이블별 결제 상태 추적',
          '부분 결제 및 분할 결제 지원',
          '결제 실패 시 재시도 및 복구 로직',
        ],
      },
      {
        title: 'MQTT 기반 실시간 주문 관리',
        description:
          'MQTT 프로토콜을 활용하여 주방, 테이블, 관리자 간 실시간 주문 상태를 동기화합니다.',
        technicalDetails: [
          'MQTT Broker를 통한 Pub/Sub 메시징',
          '품절 메뉴 실시간 알림 및 UI 업데이트',
          '주문 상태 변경 즉시 동기화',
          '연결 끊김 대비 재연결 로직',
          'QoS 레벨 조정으로 메시지 신뢰성 확보',
        ],
      },
      {
        title: 'Method Channel 기반 네이티브 플러그인 연동',
        description:
          'Flutter와 네이티브 플랫폼 간 통신으로 결제 단말기, 프린터 등 하드웨어를 제어합니다.',
        technicalDetails: [
          'Flutter ↔ Native 양방향 통신 채널 구축',
          '결제 단말기 SDK 연동',
          '영수증 프린터 ESC/POS 명령 제어',
          '시스템 권한 및 하드웨어 접근 관리',
          '에러 처리 및 예외 상황 핸들링',
        ],
      },
      {
        title: '5개 언어 다국어 지원',
        description:
          '글로벌 레스토랑 체인을 위한 다국어 시스템으로 한국어, 영어, 일본어, 중국어(간체/번체)를 지원합니다.',
        technicalDetails: [
          'i18n 기반 다국어 관리 시스템',
          '언어별 리소스 파일 구조화',
          '실시간 언어 전환 기능',
          '메뉴 이름 및 설명 다국어 DB 연동',
        ],
      },
      {
        title: '사용자 & 관리자 & KDS 통합 시스템',
        description:
          '하나의 앱에서 고객 주문, 관리자 설정, 주방 디스플레이를 모두 처리하는 통합 시스템입니다.',
        technicalDetails: [
          '고객용: 메뉴 주문 및 결제 UI',
          '관리자용: 매출 관리 및 설정 화면',
          'KDS용: 주문 대기열 및 조리 상태 관리',
          '화면 모드 전환 및 권한 검증',
        ],
      },
      {
        title: '쿠폰/포인트 베네핏 시스템',
        description:
          '고객 충성도 프로그램으로 쿠폰 할인과 포인트 적립/사용 기능을 제공합니다.',
        technicalDetails: [
          '쿠폰 유효성 검증 및 적용',
          '포인트 적립/차감 로직',
          '할인 계산 엔진',
          '프로모션 조건 검증',
          '베네핏 이력 추적 및 조회',
        ],
      },
      {
        title: '크로스 플랫폼 지원 (Android, Windows)',
        description:
          'Flutter의 크로스 플랫폼 특성을 활용하여 Android 태블릿과 Windows PC에서 동일한 코드로 실행됩니다.',
        technicalDetails: [
          '플랫폼별 UI 적응형 레이아웃',
          '플랫폼 감지 및 조건부 로직',
          '터치 및 마우스 입력 동시 지원',
          '화면 크기별 반응형 디자인',
        ],
      },
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
          '테이블오더에서 결제를 진행시, 외부 에이전트가 활성화 되면서 앱이 백그라운드로 전환되는 경우가 있었습니다. 이로 인해 VAN 결제 에이전트에서 결제는 완료되었으나 Flutter engine이 멈추고, 비동기로 수신하는 결제정보를 받지 못하는 상황에서, 사용자는 앱이 종료되었다고 생각하여, 기기를 재부팅하는 상황이 발생했고, 결제 데이터가 손실되어 결제는 이뤄졌으나, 주문이 접수되지 못하는 이슈가 발생했습니다.',
        solution:
          'AppLifecycleState를 활용하여 앱이 백그라운드로 전환될 때 Home Launcher 로 Boradcast 통신을 보내고, 이를 수신한 Home Launcher가 앱이 백그라운드로 내려갔음을 알리고, 포그라운드로 전환시킬 수 있는 버튼을 제공하게 하여 유저가 인지할 수 있도록 하였습니다. 이를 통해 백그라운드 전환 상황에서도 앱을 복귀시켜 정상적으로 동작하도록 개선했습니다.',
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
    period: '2025.01 - 2025.02',
    role: ['Flutter Frontend 신규 단독 개발', '설계, 구현, 배포 전과정 담당'],
    team: '2명 (FE 1, BE 1)',
    os: 'Android Tablet',
    deployment: 'OTA Update, Private Store',
    displayType: 'features', // 'troubleshooting' | 'features' | 'full'
    description:
      '레스토랑 대기자 명단 관리를 위한 Flutter 기반 태블릿 앱입니다. MQTT 실시간 통신, OTA 업데이트, Clean Architecture 기반 설계를 통해 안정적이고 확장 가능한 웨이팅 시스템을 구축했습니다.',
    featuresDetail: [
      {
        title: 'MQTT 기반 실시간 대기열 동기화',
        description:
          'MQTT 프로토콜을 활용하여 실시간으로 대기열 상태를 동기화하고, 자동 재연결 및 디바운싱으로 안정적인 통신을 구현했습니다.',
        technicalDetails: [
          'MQTT autoReconnect 및 resubscribeOnAutoReconnect로 안정적인 연결 유지',
          '1초 디바운스 타이머로 중복 알림 방지 및 UI 깜빡임 해결',
        ],
      },
      {
        title: 'OTA(Over-The-Air) 원격 업데이트 시스템',
        description:
          '앱 스토어 없이 원격으로 앱을 업데이트할 수 있는 시스템입니다. 버전 체크부터 다운로드, 설치까지 자동화했습니다.',
        technicalDetails: [
          'PackageInfo로 현재 버전 조회 및 서버 버전과 비교',
          'ota_update 패키지로 APK 다운로드 및 설치',
          '진행 상황 콜백으로 실시간 UI 업데이트 (다운로드 중, 설치 준비 중)',
        ],
      },
      {
        title: 'Clean Architecture 기반 초기 데이터 로딩',
        description:
          '앱 시작 시 필요한 모든 데이터를 체계적으로 로드하는 중앙 집중식 시스템입니다. Data-Domain-UI 레이어를 명확히 분리했습니다.',
        technicalDetails: [
          '데이터 병렬 페칭을 통한 초기 로딩시간 단축',
          '에러 핸들링 중앙화 및 확장성 향상',
        ],
      },
      {
        title: 'MethodChannel 기반 네이티브 디바이스 체크',
        description:
          'Flutter와 네이티브 플랫폼 간 양방향 통신으로 특정 Monki 전용 디바이스에서만 앱 실행을 허용합니다.',
        technicalDetails: [
          'Native Build.MODEL 조회 → 서버 승인 리스트 비교 → 미승인 기기 차단',
          '서버 검증을 통한 승인된 디바이스 목록 관리',
          'SystemService로 네이티브 기능 캡슐화',
        ],
      },
    ],
    techStack: [
      'Flutter',
      'Dart',
      'Riverpod',
      'GetIt',
      'Retrofit',
      'Dio',
      'MQTT',
      'Hive',
      'MethodChannel',
      'OTA Update',
    ],
  },
  'monki-CEO': {
    title: 'Monki CEO App',
    company: 'MonthlyKitchen',
    period: '2025.01 - 2025.02',
    role: [
      'Flutter Frontend 단독 개발',
      'Clean Architecture 기반 앱 설계 및 구현',
      '매장 관리 시스템 구축',
    ],
    team: '2명 (FE 1, BE 1)',
    os: 'Android, iOS (태블릿/모바일)',
    deployment: 'OTA Update',
    displayType: 'features', // 'troubleshooting' | 'features' | 'full'
    description:
      '레스토랑/매장 CEO를 위한 실시간 매장 관리 태블릿/모바일 앱입니다. MQTT 기반 실시간 알림, Pagination 무한 스크롤, OTA 업데이트 등을 통해 효율적인 관리 시스템을 제공합니다.',
    featuresDetail: [
      {
        title: '실시간 이벤트 Queue 관리 시스템',
        description:
          '레스토랑 운영 중 동시다발적으로 발생하는 여러 이벤트(대기 등록, 사용자 취소, 입장처리, 자동 취소)를 Queue 기반으로 순차 처리하여, CEO가 모든 알림을 놓치지 않고 확인할 수 있는 시스템입니다.',
        technicalDetails: [
          'MQTT 메시지, 내부 타이머, 사용자 액션 등 다중 소스 이벤트 통합 관리',
          '이벤트 Queue 자료구조로 동시 발생 알림 순차 처리',
          '알림 간 적절한 딜레이로 사용자 인지 시간 확보',
          '이벤트 발생 순서대로 팝업 알림 표시',
          '알림 손실 없이 모든 이벤트 전달 보장',
        ],
      },
      {
        title: '확장 가능한 아키텍쳐',
        description: '추가적인 기능 확장을 위하여 Clean Architecture 설계',
        technicalDetails: [
          'services → repositories → use cases → view models',
          '의존성 주입만으로도 모듈을 교체할 수 있도록 설계 및 구현',
        ],
      },
      {
        title: '크로스 플랫폼 적응형 아키텍처',
        description:
          '화면 크기에 따른 태블릿/모바일 레이아웃을 자동으로 전환합니다.',
        technicalDetails: [
          'MediaQuery + LayoutBuilder로 기기별 동적 레이아웃 전환',
          'ScreenUtil 기반 디자인 시스템으로 모든 해상도 일관성 유지',
        ],
      },
    ],
    techStack: [
      'Flutter',
      'Dart',
      'Riverpod',
      'GetIt',
      'Retrofit',
      'Dio',
      'Freezed',
      'MQTT',
      'Hive',
      'MethodChannel',
      'OTA Update',
      'ScreenUtil',
    ],
    // troubleShooting: [
    //   {
    //     title: 'MQTT 메시지 수신 후 UI 알림 처리',
    //     problem:
    //       '대기 등록, 사용자 취소, 입장처리, 자동 취소처리 등 여러가지 메세지가 동시다발적으로 발생하는 문제',
    //     solution:
    //       'MQTT 메세지, 내부 타이머, 사용자의 동작등 여러 상황에서 발생하는 알림 메세지를 관리하기 위해, 메세지 관리 객체를 별도 분리하여, Queue를 만들어 순서대로 순차적으로 메세지를 처리 할 수 있도록 하였습니다.',
    //     impact: '이벤트 발생 순서대로 팝업 알림 개선',
    //   },
    //   {
    //     title: 'Pagination 무한 스크롤 중복 데이터 로딩',
    //     problem:
    //       '스크롤을 빠르게 내릴 때 동일한 데이터가 중복으로 로딩되어 서버 부하와 불필요한 네트워크 요청이 발생했습니다.',
    //     solution:
    //       '_isLoadingMore 플래그를 도입하여 로딩 중일 때 추가 요청을 차단하고, ID 기반 중복 데이터 필터링 로직을 추가했습니다. hasActiveListNext 플래그로 더 이상 데이터가 없을 때 요청을 방지했습니다.',
    //     impact: '중복 데이터 로딩 완전 제거, 네트워크 요청 50% 감소',
    //   },
    //   {
    //     title: 'OTA 업데이트 권한 획득 실패 (Android 13+)',
    //     problem:
    //       'Android 13 이상에서 REQUEST_INSTALL_PACKAGES 권한이 런타임 권한으로 변경되어 OTA 업데이트 시 PERMISSION_NOT_GRANTED_ERROR가 발생했습니다.',
    //     solution:
    //       'AppSettings 패키지를 사용해 권한 거부 시 시스템 설정 화면으로 직접 이동하도록 구현했습니다. AppLifecycleState를 모니터링하여 사용자가 권한 승인 후 앱으로 복귀하면 자동으로 업데이트를 재시도하도록 개선했습니다.',
    //     impact:
    //       'Android 13+ 에서 정상적으로 OTA 업데이트 가능, 업데이트 성공률 100%',
    //   },
    // ],
  },
  'monki-home-launcher': {
    title: 'Monki Table Order Home Launcher',
    company: 'MonthlyKitchen',
    period: '2024.10 - 2025.06',
    role: [
      'Flutter Frontend 유지, 보수 및 기능 개선',
      '홈런처 UX 설계 및 히든 어드민 워크플로우 구축',
      'Tableorder 업데이트 자동화 파이프라인 구축',
    ],
    team: '1명 (단독 개발)',
    os: 'Android Tablet',
    deployment: 'OTA Update, Private Store',
    displayType: 'full', // 'troubleshooting' | 'features' | 'full'
    description:
      'Monthly Kitchen의 테이블 주문 시스템을 위한 Android 기반 홈런처 애플리케이션입니다. 매장용 안드로이드 패드를 홈런처 형태로 커스터마이징하여 테이블오더 앱, 결제 에이전트, 디바이스 설정을 일원화된 경험으로 제공합니다. 한국(KR)과 미국(US) 시장을 위한 독립적인 구성으로 다국가 지원 시스템을 구축했습니다.',
    features: [
      '다국가 지원 시스템 (KR/US) - 단일 코드베이스 6개 환경 관리',
      'Resume Ordering - 테이블오더 앱 복귀 자동화',
      'OTA 무인 업데이트 시스템 (다운로드 → 설치 → 재실행 체인)',
      '히든 어드민 메뉴 - 제스처 기반 관리자 모드',
      'PG/VAN 다운로드 허브 - 카드리더 자동 인식 및 에이전트 분기',
      'Flutter-Kotlin 브리지 기반 네이티브 통합',
    ],
    featuresDetail: [
      {
        title: 'OTA 무인 업데이트 시스템',
        description:
          '레스토랑 현장에서 수동 업데이트로 인한 운영 중단을 방지하기 위해 APK 자동 다운로드 및 Silent Installation 시스템을 구축했습니다. BroadcastReceiver 기반 이벤트 드리븐 아키텍처로 다운로드 → 설치 → 재실행 전 과정을 무인 자동화했습니다.',
        technicalDetails: [
          'PackageInstaller API를 활용한 Silent Installation 구현',
          'BroadcastReceiver로 다운로드 완료 이벤트 수신',
          'ApkInstaller 객체로 APK 파일 스트리밍 및 세션 관리',
        ],
      },
      {
        title: '테이블오더 앱 복귀 자동화',
        description:
          '사용자가 테이블오더 앱에서 벗어났을 때 원터치로 빠르게 주문 화면으로 복귀할 수 있는 기능입니다. Flutter MethodChannel과 Kotlin ActivityManager를 활용하여 테이블오더 앱의 프로세스 상태를 실시간으로 모니터링하고, 유저가 앱으로 쉽게 복귀할 수 있도록 구현하였습니다.',
        technicalDetails: [
          'MethodChannel 기반 Flutter ↔ Kotlin 양방향 통신 구현',
          'ActivityManager로 테이블오더 프로세스 실행 여부 실시간 감지',
          '중복 리스너 구독 방지 로직으로 메모리 누수 해결',
          '히든 메뉴와의 UI 충돌 방지 로직',
        ],
      },
      {
        title: '다국가 지원 시스템 구축 (KR/US)',
        description:
          '한국과 미국 시장의 서로 다른 요구사항과 UI/UX를 단일 코드베이스로 관리하는 시스템입니다. 국가코드 기반 구성 관리로 빌드 타임에 국가를 설정하면 패키지명, UI 컴포넌트, 다운로드 센터 URL 등이 자동으로 분기됩니다.',
        technicalDetails: [
          'CountryCode enum 기반 구성 관리 시스템 설계',
          '빌드 타임 국가 설정으로 6개 환경 조합 자동 배포 (Dev/Staging/Prod × KR/US)',
          'PackageNameManager로 국가별 패키지명 자동 분기',
          '동일 코드베이스 유지하면서 KR/US 동시 출시 성공',
        ],
      },
      {
        title: '히든 어드민 메뉴 시스템',
        description:
          '운영자를 위한 숨겨진 관리자 메뉴 시스템입니다. 화면 모서리 다중 탭 제스처로 노출되며, Wi-Fi 설정, 볼륨 조절, 앱 다운로드, 시스템 설정 등을 빠르게 접근할 수 있습니다. 60초 타이머와 바코드 제스처로 보안을 강화했습니다.',
        technicalDetails: [
          '지정된 화면 모서리 탭 카운트로 메뉴 노출 (현장 운영자 전용)',
          '60초 자동 닫힘 타이머 및 바코드 제스처 인증',
          'DeviceSettingMenus 컴포넌트로 시스템 인텐트 호출 및 라우팅 통합',
          'Wi-Fi/볼륨/설정/다운로드/앱 서랍 직접 접근 기능',
        ],
      },
      {
        title: 'PG/VAN 다운로드 허브 및 카드리더 자동 인식',
        description:
          'Sysmtem API를 사용하여 카드리더 펌웨어 정보를 감지하여 적절한 PG/VAN 에이전트 앱을 분기하고, 디바이스별 Private Store 호스트 URL을 자동 설정합니다.',
        technicalDetails: [
          '카드리더 펌웨어 문자열 기반 타입 감지',
          'Configurations 환경변수 + 카드리더 타입 조합으로 다운로드 URL 결정',
          'PG/VAN 전용 앱 다운로드 버튼 동적 토글',
          'URL 생성 시 호스트/스킴 정규화로 환경 교체 용이',
        ],
      },
      {
        title: 'Flutter-Kotlin 브리지 아키텍처',
        description:
          'MethodChannel과 EventChannel을 활용하여 Flutter UI 레이어와 Android 네이티브 레이어를 통합했습니다. 테이블오더 앱 상태 확인, 앱 실행, 디바이스 정보 조회 등 OS 레벨 기능을 Flutter에서 사용할 수 있도록 네이티브 상태 감시 파이프라인을 구축했습니다.',
        technicalDetails: [
          'MethodChannel로 Flutter → Native 통신 구현',
          'EventChannel로 Native → Flutter 시스템 이벤트 스트림',
          'MainActivity에 MethodChannel 통합 및 시스템 서비스 등록',
          'SystemPropertiesProxy로 디바이스 시리얼 정보 접근',
        ],
      },
    ],
    techStack: [
      'Flutter',
      'Dart',
      'Kotlin',
      'Provider',
      'GoRouter',
      'GetIt',
      'MethodChannel',
      'EventChannel',
      'PackageInstaller API',
      'BroadcastReceiver',
      'ActivityManager',
    ],
  },
  'monki-pay-plugin': {
    title: 'Monki Pay Plugin',
    company: 'MonthlyKitchen',
    period: '2024.09 - 2025.11',
    role: ['Plugin 유지, 보수', '신규 VAN 결제 연동 (KSNet, KICC, Smartro)'],
    team: '1명 (단독)',
    os: 'Android',
    deployment: 'Private Plugin',
    displayType: 'full', // 'troubleshooting' | 'features' | 'full'
    description:
      '결제 대행사(VAN) 5곳(KIS, KOVAN, SMARTRO, KICC, KSNet)과 연동과 에이전트 설치 검증을 제공하는 Flutter 플러그인입니다. 카드 결제, 현금영수증 발급/취소 등 결제 기능을 Flutter 앱에서 사용할 수 있도록 네이티브 브릿지를 구현했습니다.',
    featuresDetail: [
      {
        title: '멀티 VAN 지원 시스템 (Multi-Payment Gateway)',
        description:
          '5개의 주요 VAN사 통합 지원으로 다양한 결제 환경에 유연하게 대응합니다.',
        technicalDetails: [
          '플러그인 아키텍처로 각 VAN사별 독립적인 모듈 설계',
          '런타임 VAN 타입 전환 가능한 동적 초기화 시스템',
          'VAN별 네이티브 앱 패키지명 매핑 시스템 구현',
        ],
      },
      {
        title: '현금영수증 시스템 (KSNET 전용)',
        description:
          'KSNET 전문(protocol) 파싱 및 현금영수증 발급/취소 기능을 구현했습니다.',
        technicalDetails: [
          'KSNET 전문 조립 및 EUC-KR 인코딩 처리',
          'KsnetTelegramParser로 40여 필드 파싱',
          '발급 유형별 분기 처리 (개인/법인/자진발급)',
          '금액 계산 유틸리티 설계 (세금, 봉사료 자동 계산)',
        ],
      },
      {
        title: '결제 에이전트 설치 검증 기능',
        description:
          'VAN사의 결제 에이전트가 설치되지 않은 상태에서 결제 시도 시 크래시를 방지합니다.',
        technicalDetails: [
          'Android PackageManager를 사용한 패키지 존재 확인',
          'VAN별 패키지명 매핑 테이블 활용',
          'Android 11 (API 30+) 패키지 가시성 제한 대응 (Manifest Queries)',
        ],
      },
    ],
    troubleShooting: [
      {
        title: '지역화폐 결제',
        problem:
          '지역화폐 또는 민생회복지원금 같은 경우에는, PG 거래로는 승인이 되지 않는 문제',
        solution:
          '결제 시점에서, 상점의 결제정보(TID)를 List로 넘겨받아, PG TID 실패 시 VAN TID로 자동 재시도 로직을 구현하여 PG 우선 사용 가맹점에서도 지역화폐가 결제 가능하도록 구현',
        impact: '지역화폐 결제 실패율 99% 감소',
      },
    ],
    techStack: [
      'Flutter',
      'Dart',
      'Kotlin',
      'Method Channel',
      'plugin_platform_interface',
      'Android API Level 31+',
    ],
  },
  'monki-order': {
    title: 'Monki Order',
    company: 'MonthlyKitchen',
    period: '2024.11 - 현재',
    role: [
      'React Native Frontend 유지, 보수 및 기능 개선',
      'Google Play/App Store 정책 대응',
      '성능 최적화 및 사용자 경험 개선',
    ],
    team: '2명 (FE 1, BE 1)',
    os: 'Android, iOS',
    deployment: 'Play Store, App Store, Fastlane',
    displayType: 'features', // 'troubleshooting' | 'features' | 'full'
    description:
      '먼슬리키친 공유주방 음식 배달 및 픽업 서비스 앱입니다. React Native 0.70 기반 크로스플랫폼 개발로 iOS/Android를 동시 지원하며, 소셜 로그인, MQTT 실시간 주문 추적, 다중 결제 시스템 등 모던 모바일 앱 기술 스택을 활용한 배달 플랫폼입니다.',
    featuresDetail: [
      {
        title: 'MQTT 기반 실시간 주문 추적',
        description:
          'MQTT 프로토콜을 활용하여 주문 접수부터 배달 완료까지 실시간 상태를 추적하고 푸시 알림을 전송합니다.',
        technicalDetails: [
          '주문 상태 변경 시 실시간 UI 업데이트',
          'Firebase Messaging과 연동하여 백그라운드 푸시 알림',
          '연결 끊김 시 자동 재연결 및 메시지 큐 관리',
        ],
      },
      {
        title: '성능 최적화 아키텍처',
        description:
          '대용량 리스트와 이미지 처리 최적화로 부드러운 사용자 경험을 제공합니다.',
        technicalDetails: [
          'lash-list로 대용량 메뉴 리스트 렌더링 최적화',
          'react-native-fast-image로 이미지 캐싱 및 로딩 최적화',
          'React.memo, useMemo, useCallback으로 불필요한 리렌더링 방지',
        ],
      },
      {
        title: 'Fastlane 자동 배포 파이프라인',
        description:
          'iOS/Android 빌드 및 배포 프로세스를 자동화하여 효율적인 릴리즈 관리를 구현했습니다.',
        technicalDetails: [
          'Fastlane으로 Android APK/AAB, iOS IPA 빌드 자동화',
          'Google Play Store, App Store 자동 배포',
          'TestFlight 베타 배포 자동화',
          '환경별 빌드 변형 관리 (Debug/Staging/Release)',
        ],
      },
    ],
    techStack: [
      'React Native 0.70',
      'TypeScript',
      'React Navigation 6.x',
      'TailwindCSS (tailwind-rn)',
      'Firebase (Analytics, Messaging)',
      'Fastlane',
      'MQTT',
      'Sentry',
      'Kakao/Naver/Apple Login',
    ],
  },
};
