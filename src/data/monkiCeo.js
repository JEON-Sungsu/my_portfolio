export const monkiCeoData = {
  id: 'monki-waiting-ceo',
  title: 'Monki Waiting CEO App',
  company: 'MonthlyKitchen',
  period: '2024.01 - 2025.11',
  role: [
    'Flutter Frontend 리드',
    'Clean Architecture/DI 설계 및 유지보수',
    '실시간 대기관리 · OTA · 네이티브 연동 총괄',
  ],
  team: '2명 (FE 1, BE 1)',
  os: 'Android & iOS (Tablet/Mobile 대응)',
  deployment: '사내 OTA + Private Store 배포',
  displayType: 'full',
  description:
    '레스토랑 CEO가 태블릿·모바일에서 실시간 대기 고객 현황을 모니터링하고 조치할 수 있는 Flutter 3.6 기반 앱입니다. MQTT 실시간 통신, OTA 업데이트, Clean Architecture 기반 확장성을 갖춘 엔터프라이즈 앱입니다.',
  features: [
    '큐 기반 실시간 대기고객 관리 (Pagination + MQTT)',
    'MQTT 알림과 OTA 업데이트를 결합한 운영 자동화',
    'MethodChannel 디바이스 검증과 보안 통제',
    '태블릿/모바일 동시 지원 반응형 UI',
    'ApiResult + 글로벌 에러 모델 기반 복구 UX',
  ],
  featuresDetail: [
    {
      title: '실시간 대기고객 관리 엔진',
      description:
        'Cursor 기반 Pagination과 Riverpod 글로벌 상태를 결합해 대기 등록/호출/취소를 실시간 반영했습니다.',
      technicalDetails: [
        'GetActiveGuestList/UpdateGuestStatus UseCase로 ViewModel 의존성 정리',
        'Riverpod ChangeNotifier에서 needNotify 플래그로 선택적 notifyListeners',
        '무한 스크롤 로딩 플래그 + 중복 필터로 동일 데이터 재로딩 차단',
      ],
      problem:
        'MQTT 수신 뒤 UI 반영이 3~5초 지연되고, 무한 스크롤 시 중복 데이터가 쌓였습니다.',
      solution:
        'MQTT 콜백에서 needNotify=true로 즉시 notify하고, loadMore에는 _isLoadingMore와 중복 필터를 추가했습니다.',
      impact:
        '알림 반영 시간이 0.5초 이내로 단축되고, 네트워크 요청을 50% 절감했습니다.',
    },
    {
      title: 'MQTT 기반 실시간 알림 & 복구',
      description:
        '대기 등록/취소/자동취소 이벤트를 MQTT NotificationHandler로 수신하여 목록·카운트를 동기화했습니다.',
      technicalDetails: [
        'ceoWaitingRegistered/ceoWaitingCanceled 토픽별 핸들러',
        '앱이 Foreground 복귀 시 전체 데이터 재동기화',
        '자동 재연결 및 clean session 설정',
      ],
      problem:
        '네트워크 불안정 시 MQTT 메시지가 유실되어 카운트가 맞지 않았습니다.',
      solution:
        '포그라운드 복귀 시 전체 목록을 새로고침하고, MQTT autoReconnect/resubscribe 로직을 강화했습니다.',
      impact: '실시간 카운트 불일치 재현 사례 0건, 운영팀 새로고침 요청 감소.',
    },
    {
      title: 'OTA 무선 업데이트 파이프라인',
      description:
        '앱 시작 시 버전을 비교하고, 권한 안내→다운로드→설치까지 OTA 흐름을 시각화했습니다.',
      technicalDetails: [
        'PackageInfoPlus + AppVersion UseCase로 버전 비교',
        'OtaUpdateService가 진행률/상태 콜백 제공',
        '권한 거부 시 AppSettings 패키지로 설정화면 이동 CTA 노출',
      ],
      problem:
        'Android 13+에서 설치 권한을 얻지 못해 업데이트 실패율이 높았습니다.',
      solution:
        '권한 오류 감지 시 전용 다이얼로그에서 "설정 열기" CTA를 제공하고 재시도 루틴을 추가했습니다.',
      impact: 'OTA 실패율을 한 자릿수로 낮추고 현장 대응 시간을 절감했습니다.',
    },
    {
      title: 'MethodChannel 디바이스 검증 & 보안',
      description:
        'Kotlin/Swift MethodChannel로 모델명을 조회해 승인된 Monki 기기에서만 실행되도록 제한했습니다.',
      technicalDetails: [
        'plugin_platform_interface 기반 WaitingPlatform 추상화',
        'Startup 단계에서 getDeviceModel → 승인 리스트 비교 → 미승인 시 차단',
        'AppSettings 연동으로 설정/권한 안내',
      ],
      problem:
        '외부 디바이스에서 앱을 설치해 테스트하려는 사례가 있었고, 보안 리스크가 우려되었습니다.',
      solution:
        'MethodChannel로 모델명을 조회해 서버 승인 목록과 비교, 미승인 시 안내 화면으로 전환했습니다.',
      impact: '비인가 디바이스 접속 100% 차단, 운영 보안 요건 충족.',
    },
    {
      title: '반응형 태블릿/모바일 UI & 에러 복구 UX',
      description:
        'ScreenUtil 기준 사이즈와 ApiResult 전역 에러 모델로 다양한 디바이스에서도 안정적인 UX를 제공했습니다.',
      technicalDetails: [
        'ScreenUtilInit으로 태블릿(1280×800)/모바일(375×812) 디자인 동시 지원',
        'AppApiError 모델과 전역 Toast로 일관된 에러 피드백',
        'Wakelock/SafeArea/GoRouter로 키오스크급 안정성 확보',
      ],
    },
  ],
  techStack: [
    'Flutter 3.6',
    'Dart 3',
    'Riverpod 2.6',
    'MVVM + Clean Architecture',
    'GetIt (DI)',
    'GoRouter',
    'Retrofit 4.4 / Dio 5.7',
    'MQTT Client 10',
    'Hive 2.2',
    'Freezed / Json Serializable / Build Runner',
    'OTA Update 6.0',
    'ScreenUtil / Flutter SVG / Pretendard Font',
    'Logger / Intl / Crypto',
  ],
  metrics: [
    'MQTT 알림 UI 반영 시간 0.5초 이내 유지',
    '무한 스크롤 중복 요청 50% 감소',
    'OTA 업데이트 성공률 90% 이상',
    '비인가 디바이스 접속 건수 0건',
  ],
  links: [{ label: '포트폴리오 문서', path: './MONKI_CEO.md' }],
};
