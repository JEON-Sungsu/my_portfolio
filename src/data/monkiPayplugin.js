export const monkiPaypluginData = {
  id: 'monki-pay-plugin',
  title: 'Monki Pay Plugin',
  company: 'MonthlyKitchen',
  period: '2023 - 2024',
  role: [
    'Flutter Plugin Developer',
    '네이티브(Android/iOS) · Windows FFI 브릿지 설계',
    'VAN 연동 아키텍트 (KIS/KOVAN/SMARTRO)',
  ],
  team: '단독 개발',
  os: 'Android, iOS, Windows, macOS, Linux',
  deployment: '사내 패키지 레포 + POS 단말 배포',
  displayType: 'full',
  description:
    '국내 VAN 3사(KIS, KOVAN, SMARTRO)와 연동해 카드/현금영수증 결제, 취소,   MethodChannel·FFI·Manifest Queries를 모두 다루며 POS 단말기 수준의 안정성을 확보했습니다.',
  features: [
    'Multi-VAN 아키텍처 (플러그인 레벨에서 VAN 전환)',
    '카드 결제/취소 + TID Fallback + VAN Key 취소',
    'KSNET 현금영수증 승인/취소 및 전문 파서',
    '에이전트 설치 체크, 타임아웃 최적화, 테스트 UI',
    'Windows FFI · iOS/Android MethodChannel 동시 지원',
  ],
  featuresDetail: [
    {
      title: 'Multi VAN & 플랫폼 인터페이스',
      description:
        'MonkiPayPluginPlatform 추상화와 각 VAN별 구현체로 런타임 전환 가능한 결제 엔진입니다.',
      technicalDetails: [
        'plugin_platform_interface 기반 크로스 플랫폼 추상화',
        'MonkiPayType enum과 패키지 매핑으로 동적 초기화',
        'Windows FFI, Android/iOS MethodChannel을 단일 API로 노출',
      ],
    },
    {
      title: '카드 결제 · Fallback TID · 취소 오케스트레이션',
      description:
        'approveCredit/approveCreditWithFallbackTid/cancelCredit 계열 API로 결제부터 PG/VAN TID 기반 재시도, 다양한 취소 방식을 하나의 인터페이스로 통합했습니다.',
      technicalDetails: [
        'Promise 패턴으로 Kotlin 비동기 → Flutter Future 매핑',
        'Fallback TID 리스트를 받아 PG 실패 시 VAN TID 재시도',
        'cancelCredit, cancelCreditWithTid, cancelCreditByVanKey 등 정책별 대응',
      ],
      problem: 'PG TID 실패 시 거래가 중단되어 현장 결제가 지연되었습니다.',
      solution:
        'Fallback TID 리스트를 받아 순차 재시도 로직을 구현해 PG 실패 시 VAN TID로 자동 전환했습니다.',
      impact: '결제 성공률 현저히 상승, 재시도 수동 작업 제거.',
    },
    {
      title: 'KSNET 현금영수증 파이프라인',
      description:
        'KSNET 전문 파싱/금액 계산 유틸을 별도 모듈로 분리해 현금영수증 승인·취소를 안전하게 처리했습니다.',
      technicalDetails: [
        'Freezed/Json Serializable을 활용한 PayResult 모델',
        'issueType(개인/법인/자진발급) 분기 처리',
        '금액 계산 유틸로 세액/봉사료 자동 계산',
      ],
      problem: '초기 구현이 테스트 UI와 강결합되어 유지보수가 어려웠습니다.',
      solution:
        '대규모 롤백 후 util/폴더 구조를 재설계하고, KSNET 전용 파서·계산 객체로 재구현했습니다.',
      impact: '현금영수증 기능을 재도입하면서도 코드 품질과 안정성을 확보.',
    },
    {
      title: '네이티브 연동 · 패키지 가시성 · 타임아웃 개선',
      description:
        'MethodChannel/FFI 구현과 Manifest Queries·카드 리딩 타임아웃 상수화를 통해 현장 장애를 줄였습니다.',
      technicalDetails: [
        'Android Manifest Queries로 API30+ 패키지 탐색 허용',
        'checkPayAgentInstalled API로 VAN 에이전트 설치 여부 사전 검증',
        'KIS 카드 리딩 타임아웃 20→60초, 상수 분리로 일관성 확보',
      ],
      problem:
        '결제 에이전트 미설치나 짧은 타임아웃으로 인해 크래시/실패가 빈번했습니다.',
      solution:
        '패키지 가시성 쿼리와 설치 체크 API를 추가하고, 타임아웃을 상수화해 시나리오별로 조정했습니다.',
      impact: '결제 크래시 제로화, 리딩 실패율 대폭 감소.',
    },
    {
      title: '테스트 UI & 개발 경험 개선',
      description:
        'VAN별 테스트 UI(kis/kovan/smartro view)를 제공해 실제 단말 없이도 결제→취소→현금영수증 플로우를 재현할 수 있게 했습니다.',
      technicalDetails: [
        '금액 입력 시 부가세 자동 계산, 승인번호 자동 바인딩',
        '테스트 화면에서 모든 API 시나리오 호출 가능',
        'util 주석·네이밍 정리 커밋으로 코드 품질 향상',
      ],
    },
  ],
  techStack: [
    'Flutter 3.3+',
    'Dart 3.1+',
    'plugin_platform_interface',
    'ffi (Windows)',
    'charset_converter',
    'Kotlin',
    'Swift',
    'Retrofit/Dio 기반 시뮬레이션 유틸',
  ],
  metrics: [
    '코드 기여: +4,837 / -2,309 라인 (40+ 커밋)',
    'VAN 3사/플랫폼 5종 동시 지원',
    'Fallback TID 도입 후 결제 성공률 체감 상승',
    '타임아웃 조정으로 카드 리딩 실패율 급감',
  ],
  links: [{ label: '포트폴리오 문서', path: './MONKI_PAY_PLUGIN.md' }],
};
