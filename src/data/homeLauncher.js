export const homeLauncherData = {
  id: 'monki-tableorder-launcher',
  title: 'Monki Table Order Home Launcher',
  company: 'MonthlyKitchen',
  period: '2024.10 - 2025.06',
  role: [
    'Flutter 런처 단독 개발 및 네이티브 브리지 설계',
    '국가/환경 구성, OTA, 프로세스 감시 전담',
    '현장 운영 자동화 플로우(다운로드 허브 · 어드민 메뉴) 구축',
  ],
  team: '단독 개발 (FE 1, Android 네이티브 협업)',
  os: 'Android Tablet (iOS 대응 구조)',
  deployment: '사내 OTA + Private Store APK',
  displayType: 'full',
  description:
    '레스토랑 전용 태블릿이 부팅 후 가장 먼저 마주하는 홈 런처입니다. 테이블오더 앱을 항상 실행 가능한 상태로 유지하고, OTA 업데이트·디바이스 설정·카드리더 에이전트 설치까지 한 화면에서 제어하도록 설계했습니다.',
  features: [
    'CountryCode + Environment Matrix로 KR/US 런처 자동화',
    'Resume Ordering + ActivityManager 기반 프로세스 감시',
    'flutter_downloader → PackageInstaller OTA 파이프라인',
    '히든 어드민 메뉴와 디바이스 제어 허브',
    '카드리더 타입별 PG/VAN 다운로드 센터',
  ],
  featuresDetail: [
    {
      title: '국가·환경별 런처 구성 자동화',
      description:
        'CountryCode, PackageNameManager, Configurations 레이어를 묶어 KR/US × Dev/Staging/Prod 6개 조합을 한 번의 빌드 스위치로 관리했습니다.',
      technicalDetails: [
        '빌드 타임 CountryCode로 패키지명·아이콘·문구 자동 분기',
        'Download/AppStore URL을 환경 매트릭스로 매핑',
        'ImagePathManager로 국가별 자산 로딩 자동화',
      ],
      problem:
        'KR/US 테넌트와 Dev/Staging/Prod 조합을 매번 수동 변경하면서 배포 실수가 잦았습니다.',
      solution:
        'Configuration 객체에 패키지명·다운로드 URL·API Endpoint를 선언하고 CountryCode + env 조합으로 참조하도록 리팩터링했습니다.',
      impact:
        '6개 조합을 단일 코드베이스로 유지하며 배포 실수를 제거, 신규 테넌트 추가 시 재사용 가능 구조 확보.',
    },
    {
      title: 'Resume Ordering & 프로세스 감시',
      description:
        '테이블오더 앱 상태를 MethodChannel로 실시간 조회하고, 국가별 UI로 Resume 버튼을 분기해 1탭으로 주문 화면을 복귀시켰습니다.',
      technicalDetails: [
        "MethodChannel('tableOrderAppState') + ActivityManager 프로세스 스캔",
        'KR/US별 Resume 버튼 스타일 및 텍스트 분리',
        '히든 메뉴 활성 시 Resume 버튼 자동 숨김으로 UI 충돌 방지',
      ],
      problem:
        '앱이 백그라운드로 내려가면 주문 복귀에 10초 이상 소요되고, 현장 직원이 수동으로 앱을 다시 찾아야 했습니다.',
      solution:
        '네이티브 프로세스 감시 결과를 ViewModel에 반영해 버튼 표시/자동 실행을 제어하고, listener 중복 구독을 차단해 안정성을 높였습니다.',
      impact:
        'QA 기준 주문 복귀 시간이 10초 → 2초대로 단축되고, 프로세스 상태 불일치 이슈를 제거했습니다.',
    },
    {
      title: 'OTA 다운로드→설치→재실행 파이프라인',
      description:
        'flutter_downloader, BroadcastReceiver, ApkInstaller를 체인으로 묶어 APK 다운로드부터 Silent Install, 테이블오더 재실행까지 무인 자동화를 구현했습니다.',
      technicalDetails: [
        '다운로드 완료 브로드캐스트 → ApkInstaller Session commit',
        'PackageInstaller SessionParams로 대상 패키지 지정 업데이트',
        '설치 완료 후 DeviceApps.openApp으로 즉시 재실행',
      ],
      problem:
        '수동 업데이트로 인해 영업 중 앱이 중단되고 현장 인력이 직접 설치해야 했습니다.',
      solution:
        '다운로드 → 설치 → 재실행 이벤트 파이프라인을 네이티브 서비스로 분리하고 오류 로깅/재시도를 추가했습니다.',
      impact:
        '운영 중단 시간 0분, OTA 설치 실패율 감소, 현장 지원 인력 투입 없이 배포 가능.',
    },
    {
      title: '히든 어드민 메뉴 & 디바이스 제어 허브',
      description:
        '멀티 탭 제스처와 타이머를 활용해 매장 관리자만 접근 가능한 어드민 메뉴를 만들고, Wi-Fi/볼륨/설정/다운로드 등 시스템 Intent를 한 곳에서 실행하도록 구성했습니다.',
      technicalDetails: [
        'HomeScreen 히든 제스처 + 60초 타이머, 바코드 제스처',
        'DeviceSettingMenus 컴포넌트로 시스템 인텐트 호출',
        'Resume 버튼과 상태 공유해 UI 충돌/중복 터치 방지',
      ],
      problem:
        '운영자가 디바이스 설정을 바꾸려면 안드로이드 기본 런처로 돌아가야 해 작업 동선이 길었습니다.',
      solution:
        '런처 내부에 히든 어드민 허브를 만들고 필요한 설정 작업을 단일 화면으로 합쳤습니다.',
      impact:
        '운영자 작업 시간이 단축되고, 현장 지원 요청이 감소했습니다.',
    },
    {
      title: 'PG/VAN 카드리더 다운로드 센터',
      description:
        '카드리더 펌웨어를 감지해 PG/VAN 에이전트를 분기 설치하고, 국가/리더별 호스트 URL을 자동 구성해 설치 혼선을 줄였습니다.',
      technicalDetails: [
        'AppDeviceInfoRepo로 리더 타입 감지',
        'CountryCode + 카드리더 조합별 URL 토글',
        '다운로드 진행률을 FlutterDownloader Isolate로 UI에 표시',
      ],
      problem:
        '현장 직원이 카드리더/국가별 다른 다운로드 주소를 기억해야 해 설치 오류가 잦았습니다.',
      solution:
        '다운로드 센터 화면에서 카드리더 타입에 맞는 버튼만 노출하고 URL을 환경 변수로 주입하도록 리팩터링했습니다.',
      impact: '설치 실수 제로화, 원격 지원 없이 리더 교체 가능.',
    },
  ],
  techStack: [
    'Flutter 3.1.3+',
    'Dart 3',
    'Provider 6.1.2',
    'GoRouter 13.2',
    'Kotlin',
    'MethodChannel/EventChannel',
    'PackageInstaller API',
    'BroadcastReceiver',
    'flutter_downloader',
    'device_apps',
    'package_info_plus',
    'app_settings',
    'barcode_widget',
  ],
  metrics: [
    '49 커밋 · 버전 1.1.1+34 (2024.10~2025.06)',
    'KR/US × Dev/Staging/Prod 6개 환경 자동 구성',
    'Resume Ordering 도입 후 주문 복귀 시간 10초 → 2초대',
    'OTA 파이프라인으로 현장 업데이트 중단 시간 0분',
    'MainActivity/ApkInstaller/DownloadReceiver/SystemPropertiesProxy 네이티브 모듈 4종 직접 구현',
  ],
  links: [
    { label: '상세 포트폴리오', path: './portfolio_documentation.md' },
    {
      label: '정리 노트',
      path: './portfolio_monki_tableorder_launcher.md',
    },
  ],
};
