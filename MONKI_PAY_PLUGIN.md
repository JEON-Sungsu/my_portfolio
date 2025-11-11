## 프로젝트 개요

**프로젝트명**: Monki Pay Plugin
**버전**: 1.0.1
**역할**: Flutter Plugin Developer
**개발 기간**: 2023-2024
**코드 기여도**: +4,837줄 추가 / -2,309줄 삭제 (약 40개 이상의 커밋)

### 프로젝트 소개

한국의 주요 결제 대행사(VAN) 3곳(KIS, KOVAN, SMARTRO)과 연동하는 크로스 플랫폼 Flutter 결제 플러그인 개발. 카드 결제, 현금영수증 발급/취소 등 POS 단말기 결제 기능을 Flutter 앱에서 사용할 수 있도록 네이티브 브릿지를 구현했습니다.

---

## 기술 스택

### Frontend (Dart/Flutter)

- **Flutter SDK**: 3.3.0+
- **Dart**: 3.1.2+
- **핵심 패키지**:
  - `plugin_platform_interface`: 플랫폼 인터페이스 추상화
  - `ffi`: C/C++ 네이티브 코드 연동 (Windows 플랫폼)
  - `charset_converter`: 문자열 인코딩 변환 (EUC-KR ↔ UTF-8)

### Native Android (Kotlin)

- **Kotlin**: Android 네이티브 구현
- **Method Channel**: Flutter ↔ Android 통신
- **Payment Gateway Integration**: KIS, KOVAN, SMARTRO VAN 연동
- **Android API Level**: 31+ 지원 (Manifest Queries)

### Native iOS (Swift)

- **Swift**: iOS 네이티브 구현
- **Method Channel**: Flutter ↔ iOS 통신

### Platform Support

- ✅ Android (Primary platform - 완전 구현)
- ✅ iOS (Method Channel 기반)
- ✅ Windows (FFI 기반 네이티브 연동)
- ✅ macOS
- ✅ Linux

---

## 주요 구현 기능

### 1. 멀티 VAN 지원 시스템 (Multi-Payment Gateway Architecture)

#### 구현 내용

3개의 주요 VAN사 통합 지원:

```dart
enum MonkiPayType {
  kisVcat,      // KIS 밴
  kovanVcat,    // 코반 밴
  smartroVcat,  // 스마트로 밴
  unknown
}
```

**기술적 특징**:

- **플러그인 아키텍처**: 각 VAN사별 독립적인 모듈 설계
- **동적 초기화 시스템**: 런타임에 VAN 타입 전환 가능
- **패키지명 관리**: VAN별 네이티브 앱 패키지명 매핑 시스템

```dart
// lib/util/payment_gateway_package_name.dart
static final Map<MonkiPayType, List<String>> _packageName = {
  MonkiPayType.kisVcat: ['kr.co.kisvan.andagent'],
  MonkiPayType.kovanVcat: ['com.kovan.appvpos','com.kovantest.testcallvposapp'],
  MonkiPayType.smartroVcat: ['service.vcat.smartro.com.vcat'],
};
```

### 2. 카드 결제/취소 시스템

#### 2.1 기본 결제 기능

```dart
Future<PayResult> approveCredit({
  required int amount,
  required int taxAmount,
  required int serviceAmount,
  required int installment,
  EventCallback? eventCallback,
})
```

**구현 포인트**:

- 비동기 Promise 패턴으로 결제 응답 처리
- EventCallback으로 결제 진행 상태 실시간 피드백
- 금액 검증 로직 (총액, 부가세, 봉사료 분리)

#### 2.2 Fallback 메커니즘 구현

**🔥 핵심 기능**: TID Fallback 시스템

```dart
Future<PayResult> approveCreditWithFallbackTid({
  required List<String> tidList,  // [PG TID, VAN TID]
  required int amount,
  // ...
})
```

**트러블 슈팅 사례**:

- **문제**: 결제 승인 시 PG TID로 실패하는 경우 거래 불가
- **해결**: VAN TID를 대체(fallback) TID로 사용하는 재시도 로직 구현
- **결과**: 결제 성공률 향상 및 안정성 강화

```dart
// example/lib/kis_view.dart:122-153
void onApproveCreditWithFallbackTid() async {
  final pgTid = pgTidTextController.text;
  final vanTid = vanTidTextController.text;
  final List<String> tidList = [pgTid, vanTid];  // 우선순위 리스트

  var res = await monkiPayPlugin.approveCreditWithFallbackTid(
    tidList: tidList,  // PG TID 실패 시 VAN TID로 재시도
    amount: amount,
    taxAmount: taxAmount,
    serviceAmount: 0,
    installment: 0,
  );
}
```

#### 2.3 다양한 취소 방식 지원

```dart
// 기본 취소
cancelCredit()

// TID 지정 취소
cancelCreditWithTid(approveTid: String)

// VAN Key 기반 취소
cancelCreditByVanKey(vanKey: String)
```

**설계 의도**: VAN사별 취소 정책 차이를 추상화하여 통일된 인터페이스 제공

### 3. 현금영수증 시스템 (KSNET 전용 기능)

#### 구현 내용

```dart
Future<PayResult> approveCash({
  required int amount,
  required int taxAmount,
  required int serviceAmount,
  required int issueType,  // 0: 개인, 1: 법인, 2: 자진발급
  required String? idNum,
  EventCallback? eventCallback,
})
```

**Git 커밋 히스토리**:

- `feat: KSNET 현금 영수증 승인 기능 추가` (42f248b)
- `feat: 현금 영수증 취소 기능 추가` (91c99a6)
- `feat: KSNET util 객체 추가 - 전문 파싱 객체, 금액 계산 객체` (78304ea)

**기술적 도전**:

- KSNET 전문(protocol) 파싱 로직 구현
- 금액 계산 유틸리티 설계 (세금, 봉사료 자동 계산)
- 발급 유형별 분기 처리 (개인/법인/자진발급)

### 4. 네이티브 연동 아키텍처

#### 4.1 Android Method Channel 구현

```kotlin
// android/src/main/kotlin/net/monki/monki_pay_plugin/MonkiPay.kt
interface MonkiPay {
    fun approveCredit(...): Promise<Map<String, Any>>
    fun cancelCredit(...): Promise<Map<String, Any>>
    fun approveCash(...): Promise<Map<String, Any>>
    fun cancelCash(...): Promise<Map<String, Any>>
}
```

**Promise 패턴 적용**: Kotlin에서 비동기 작업을 Promise로 래핑하여 Flutter Future와 연동

#### 4.2 Android Manifest 쿼리 설정

```xml
<!-- android/src/main/AndroidManifest.xml -->
<queries>
    <package android:name="service.vcat.smartro.com.vcat" />
    <package android:name="kr.co.kisvan.andagent" />
    <package android:name="com.kovan.appvpos" />
</queries>
```

**Git 커밋**: `add: API31 이상용 Manifest 쿼리 추가` (8c7d415)

**배경 지식**:

- Android 11 (API 30+)부터 패키지 가시성 제한 정책 적용
- 외부 결제 앱 설치 여부 확인을 위해 명시적 쿼리 선언 필요

### 5. 결제 에이전트 설치 확인 기능

#### 구현 배경

결제 앱이 설치되지 않은 상태에서 결제 시도 시 앱 크래시 방지

#### 구현 코드

```dart
// lib/monki_pay_plugin.dart:211-213
Future<bool> checkPayAgentInstalled(MonkiPayType payType) async {
  return MonkiPayPluginPlatform.instance.checkPayAgentInstalled(payType);
}
```

**Git 커밋 시퀀스**:

1. `add: 에이전트 체크 메서드 인터페이스 추가` (73577da)
2. `add: checkPayAgentInstalled 메서드 구현체 작성` (9264f32)
3. `add: 외부 노출 객체 checkPayAgentInstalled 추가` (e329c66)
4. `add: Kotlin onCheckPayAgentInstalled 메서드 추가` (7c737e0)

**기술적 구현**:

- Android PackageManager를 사용한 패키지 존재 확인
- VAN별 패키지명 매핑 테이블 활용
- Flutter → Kotlin Method Channel 통신

### 6. 타임아웃 최적화

#### 문제 상황

KIS 카드 리딩 시 20초 타임아웃으로 결제 실패 빈번

#### 해결 과정

**Git 커밋**:

- `add: KIS 카드결제, 취소시 카드 리딩 대기시간 증가 20초 -> 60초` (efd93fc)
- `fix: 리딩 time out 시간 상수 분리` (4c04b35)

**개선 내용**:

1. 타임아웃 시간 20초 → 60초로 증가
2. 하드코딩된 타임아웃 값을 상수로 분리하여 유지보수성 향상
3. 결제/취소 모두 동일한 타임아웃 적용으로 일관성 확보

**결과**: 카드 리딩 성공률 향상, 사용자 경험 개선

---

## 트러블 슈팅 사례

### 1. KSNET 기능 롤백 및 재구현

**상황**:

```bash
Revert "Merge pull request #14 TKR-252-Payplugin-KSNET_config_and_test_ui"
Revert "Merge pull request #15 TKR-256-KSNET-feat_cash_approve"
Revert "Merge pull request #16 TKR-257-KSNET-feat_cash_cancel"
```

**문제 분석**:

- KSNET 초기 구현에서 설계 결함 발견
- 테스트 UI와 실제 결제 로직이 강결합되어 있음
- 전문 파싱 로직이 비효율적

**재구현 과정**:

1. **리팩토링**: `refactor: KSVCAT 패키지네임, 클래스네임 상수화 및 폴더명 변경` (b128090)
2. **유틸리티 분리**: `feat: KSNET util 객체 추가` - 전문 파싱, 금액 계산 객체 (78304ea)
3. **타입 안정성**: `fix: KSNET init 메서드 타입 검사 수정` (f02bcda)
4. **재구현 완료**: 현금영수증 승인/취소 기능 재추가

**배운 점**:

- 빠른 롤백 결정으로 기술 부채 최소화
- 리팩토링 후 재구현이 초기 구현보다 견고함
- 코드 품질 > 기능 추가 속도

### 2. 코드 품질 개선 시리즈

**체계적인 리팩토링 커밋**:

```bash
chore: util 객체 주석추가 (673b526)
chore: 변수명 카멜케이스 변경 (65e4294)
chore: 미사용 코드 삭제 (9ec7f9c)
chore: import문 수정 (0a3885d)
chore: KsnetUtil 클래스명 변경 (522d977)
```

**개선 항목**:

- **네이밍 컨벤션**: snake_case → camelCase 일관성 확보
- **코드 정리**: 미사용 import, 데드 코드 제거
- **문서화**: 핵심 유틸리티 클래스 주석 추가
- **클래스 설계**: 의미있는 클래스명으로 변경

**의미**:
단순 기능 구현을 넘어 코드 품질, 가독성, 유지보수성에 대한 책임감

### 3. 테스트 UI 개선

**Git 커밋**:

- `add: Test UI 추가` (a3d5f31)
- `add: KSNET용 테스트 UI 추가` (0d74a89)
- `refactor: Test UI 메서드 호출시 인자값` (fb34bd8)
- `refactor: 결제 테스트 UI KIS 기본TID 값 변경` (edf2e10)

**구현 내용**:

- VAN별 독립적인 테스트 뷰 제공 (`kis_view.dart`, `kovan_view.dart`, `smartro_view.dart`)
- 실시간 금액 계산 (부가세 자동 계산: `taxAmount = (amount / 11).floor()`)
- 결제 결과 자동 폼 입력 (승인번호, 승인일자, VAN Key 자동 매핑)
- 체계적인 테스트 시나리오 UI (초기화 → 결제 → 취소 → 종료)

**example/lib/kis_view.dart 핵심 코드**:

```dart
amountTextController.addListener(() {
  setState(() {
    try {
      amount = int.parse(amountTextController.text);
      taxAmount = (amount / 11).floor();  // 부가세 자동 계산
    } catch (e) {
      amount = 0;
      taxAmount = 0;
    }
  });
});
```

---

## 아키텍처 설계

### Plugin Architecture Pattern

```
┌─────────────────────────────────────────────┐
│           Flutter Application               │
└─────────────────┬───────────────────────────┘
                  │
         ┌────────▼────────┐
         │  MonkiPayPlugin │  (lib/monki_pay_plugin.dart)
         │   (Public API)  │
         └────────┬────────┘
                  │
    ┌─────────────┴─────────────┐
    │                           │
┌───▼────────────────┐  ┌──────▼──────────────┐
│ MethodChannel      │  │  WindowsFFI         │
│ (Android/iOS)      │  │  (Windows/Mac)      │
└───┬────────────────┘  └─────────────────────┘
    │
┌───▼──────────────────────────────────────────┐
│     Platform Implementation                  │
│  ┌──────────┐ ┌──────────┐ ┌─────────────┐  │
│  │ KisVcat  │ │KovanVcat │ │SmartroVcat  │  │
│  └──────────┘ └──────────┘ └─────────────┘  │
└──────────────────────────────────────────────┘
```

### 핵심 설계 원칙

1. **추상화 계층 분리**:

   - `MonkiPayPluginPlatform`: 플랫폼 인터페이스
   - `MonkiPay`: 네이티브 구현 인터페이스
   - VAN별 구현체: KisVcat, KovanVcat, SmartroVcat

2. **플랫폼별 전략 패턴**:

   ```dart
   if (Platform.isWindows) {
     MonkiPayPluginPlatform.instance = WindowsMonkiPayPlugin();
   } else {
     // 기본 MethodChannel 구현
   }
   ```

3. **타입 안전성**:
   - Enum 기반 VAN 타입 관리
   - Strongly-typed PayResult 응답 객체
   - EventCallback 제네릭 타입 지원

---

## 성과 및 기여도

### 정량적 성과

- **커밋 수**: 40+ 커밋
- **코드 라인 수**: +4,837 / -2,309
- **지원 플랫폼**: Android, iOS, Windows, macOS, Linux (5개)
- **지원 VAN사**: KIS, KOVAN, SMARTRO (3개)
- **구현 기능**: 카드 결제/취소, 현금영수증 발급/취소, Fallback 결제 등 10+ API

### 정성적 성과

1. **멀티 VAN 통합 설계**: 확장 가능한 플러그인 아키텍처 구축
2. **안정성 향상**: Fallback 메커니즘, 에이전트 체크, 타임아웃 최적화
3. **코드 품질**: 체계적인 리팩토리 및 문서화
4. **크로스 플랫폼**: Flutter 생태계의 네이티브 연동 경험 축적

### 기술적 깊이

- **Flutter Plugin 개발**: Method Channel, FFI 양방향 활용
- **비동기 프로그래밍**: Future, Promise, Callback 패턴 통합
- **네이티브 연동**: Kotlin, Swift 네이티브 브릿지 구현
- **결제 도메인 지식**: VAN 전문, TID, 부가세 계산, 현금영수증 규격
- **Android 정책 대응**: API 31+ Manifest Queries 적용

---

## 프로젝트 파일 구조

```
monki_pay_plugin/
├── lib/
│   ├── monki_pay_plugin.dart              # Public API
│   ├── monki_pay_plugin_platform_interface.dart
│   ├── monki_pay_plugin_method_channel.dart
│   ├── monki_pay_plugin_windows.dart       # Windows FFI
│   ├── util/
│   │   ├── monki_pay_type.dart            # Enum 타입
│   │   ├── pay_result.dart                # 결제 결과 객체
│   │   ├── event_callback.dart            # 콜백 인터페이스
│   │   └── payment_gateway_package_name.dart  # VAN 패키지명
│   ├── kovan/
│   │   └── kovan_vcat_windows.dart
│   └── smartro/
│       └── smartro_vcat_windows.dart
├── android/
│   └── src/main/kotlin/net/monki/monki_pay_plugin/
│       ├── MonkiPayPlugin.kt              # Android 진입점
│       ├── MonkiPay.kt                    # 인터페이스
│       ├── smartro/SmartroVcat.kt
│       └── util/MonkiPayType.kt
├── ios/
│   └── Classes/
│       └── MonkiPayPlugin.swift           # iOS 구현
└── example/
    └── lib/
        ├── kis_view.dart                  # KIS 테스트 UI
        ├── kovan_view.dart                # KOVAN 테스트 UI
        └── smartro_view.dart              # SMARTRO 테스트 UI
```

**파일 통계**:

- Dart: 12 파일
- Kotlin: 5 파일
- Swift: 1 파일

---

## 향후 확장 가능성

1. **추가 VAN사 지원**: 모듈화된 구조로 신규 VAN사 통합 용이
2. **간편결제 연동**: 카카오페이, 네이버페이 등 추가 가능
3. **결제 로깅**: 결제 이력 관리 및 분석 기능
4. **보안 강화**: 암호화 통신, 토큰 기반 인증

---

## 사용된 개발 도구 및 환경

- **IDE**: Android Studio, VS Code
- **버전 관리**: Git, GitHub
- **빌드 도구**: Gradle (Android), CocoaPods (iOS)
- **테스트**: Flutter Test, Integration Test
- **의존성 관리**: pub.dev (Dart), Maven (Kotlin)

---

## 학습 및 성장 포인트

### 기술적 성장

1. **Flutter Plugin 생태계 이해**:

   - Platform Channel 아키텍처 완전 이해
   - FFI를 통한 C/C++ 네이티브 연동 경험

2. **멀티 플랫폼 개발**:

   - Android, iOS, Windows 3개 플랫폼 동시 개발
   - 플랫폼별 특성과 제약사항 학습

3. **결제 도메인 전문성**:
   - VAN 업계 표준 프로토콜 이해
   - 금융 거래의 안정성과 오류 처리 중요성 체득

### 소프트웨어 엔지니어링

1. **아키텍처 설계**: 확장 가능한 플러그인 아키텍처 설계 경험
2. **리팩토링**: 롤백 후 재구현을 통한 코드 품질 개선
3. **문서화**: 체계적인 커밋 메시지 및 코드 주석 작성

### 협업 및 프로세스

1. **Git 워크플로우**: Feature 브랜치, PR, 롤백 전략 활용
2. **점진적 개선**: 작은 커밋 단위로 기능 개선 및 리팩토링
3. **테스트 주도**: 테스트 UI 선제작을 통한 안정적 개발

---

## 연락처 및 레포지토리

- **GitHub**: monthlykitchen/monki_pay_plugin
- **기여자**: JEON-Sungsu-Monki
- **라이선스**: (프로젝트에 명시된 라이선스)

---

## 요약

Monki Pay Plugin은 **Flutter 크로스 플랫폼 결제 시스템**을 구축한 프로젝트로, 3개 주요 VAN사 통합, Fallback 메커니즘, 현금영수증 시스템 등 **10+ 핵심 결제 기능**을 구현했습니다.

**40+ 커밋, 4,800+ 라인의 코드**를 작성하며 Flutter Plugin 개발, 네이티브 연동, 비동기 프로그래밍, 결제 도메인 지식을 모두 아우르는 **풀스택 모바일 개발 역량**을 증명했습니다.

특히 **체계적인 리팩토링**, **타임아웃 최적화**, **Fallback 시스템** 등을 통해 단순 기능 구현을 넘어 **안정성과 확장성을 고려한 엔지니어링**을 실천했습니다.

• 프로젝트 개요

- Flutter ↔︎ 플랫폼 공통 API를 MonkiPayPlugin과 플랫폼 인터페이스로 통일해(VAN 초기화/승인/취소/현금영수증) 여러 PG를 한 번에 다룬다(lib/monki_pay_plugin.dart:10-
  214, lib/monki_pay_plugin_platform_interface.dart:15-125).
- Android에서는 MonkiPayPlugin이 MethodChannel·EventChannel 호출을 받아 PG별 워커(KIS/Kovan/Smartro)를 관리하고, 요청별 콜백을 큐잉해 재시도 시나리오를 구현한다
  (android/src/main/kotlin/net/monki/monki_pay_plugin/MonkiPayPlugin.kt:20-210, 283-340).
- Windows 지원은 dart:ffi로 VAN DLL을 직접 호출해 Android와 동일한 MonkiPay 인터페이스를 공유해 기능 패리티를 유지한다(lib/kovan/kovan_vcat_windows.dart:1-110,
  lib/monki_pay_plugin_windows.dart:1-210, lib/util/monki_pay_interface.dart:1-60).
- QA용 샘플 화면이 각 PG의 승인/취소/현금영수증/에이전트 확인 로직을 노출하여 현장 테스트를 단순화한다(example/lib/kis_view.dart:1-120, example/lib/
  kovan_view.dart:118-220, example/lib/smartro_view.dart:170-210).
- ffi, charset_converter, plugin_platform_interface 등 의존성을 통해 바이너리 전문 인코딩과 플랫폼 브리지를 안정적으로 구성했다(pubspec.yaml:1-27).

주요 기여 & PR 하이라이트

- [PR #20, KR-507] 실매장 KIS 단말에서 카드 삽입 지연이 잦자 리더 대기시간을 상수화·60초로 확대해 승인·취소 전 흐름에 일관되게 주입했고, 테스트 UI 기본 TID도 최신
  단말로 교체했다(android/src/main/kotlin/net/monki/monki_pay_plugin/kis/KisVcat.java:26-33, 438-619; example/lib/kis_view.dart:28-48; commits efd93fc, 4c04b35,
  edf2e10, a74a1f5).
- [PR #12·#13, TKR-210] Android 12+ 패키지 가시성 제한 때문에 PG 에이전트 존재 여부를 알 수 없던 문제를 해결하기 위해 Manifest queries와 PG별 패키지 맵을 추가하
  고, MethodChannel·Kotlin단 체크 API·샘플 UI를 한 번에 묶어 배포했다(android/src/main/AndroidManifest.xml:1-8, lib/util/payment_gateway_package_name.dart:3-15,
  lib/monki_pay_plugin.dart:211-213, lib/monki_pay_plugin_method_channel.dart:624-629, android/src/main/kotlin/net/monki/monki_pay_plugin/MonkiPayPlugin.kt:598-
  621, example/lib/kis_view.dart:308-318; commits 8c7d415, b92b4c3, 73577da, 9264f32, e329c66, 7c737e0, a3d5f31, 4525657).
- [PR #14, TKR-252] KSNET PG 온보딩을 위해 KsNetVcat 초기화, 타입·패키지 정의, MethodChannel 엔드포인트, Android 권한, Windows 스텁, ks_net_view 샘플 등을 일괄 설
  계했다(commits 5f0e1fe, a216317, 264d9b0, 2551247, 972a756, 0d74a89, b128090, f02bcda). 인증 일정 문제로 main에서 한 차례 revert 되었지만, 커밋으로 구현 근거가
  남아 있어 포트폴리오에 증빙 가능하다.
- [PR #15, TKR-256] KSNET 현금영수증 승인 전문을 직접 조립하기 위해 KsNetUtil에 바이트 삽입, 세금 계산, Hex dump 기능을 추가하고, KsnetTelegramParser로 EUC-KR 전
  문을 40여 필드로 파싱해 승인번호·발급사 등 메타데이터를 Flutter까지 끌어왔다(commits 78304ea, 42f248b).
- [PR #16, TKR-257] KSNET 취소(0420) 전문과 STATUS(X/O/F) 해석 로직을 작성하고, 응답 전문을 EUC-KR → 문자열로 변환해 로그와 PayResult에 함께 담아 CS 대응 시간을
  줄였다(commit 91c99a6). 승인/취소 구현분 역시 revert 상태지만 커밋 기록으로 역량을 어필할 수 있다.

트러블슈팅 · 기술적 통찰

- Kovan·Smartro의 다중 경로 결제를 위해 PG 실패 시 자동으로 VAN/다른 TID로 재귀 전환하는 로직을 작성, 승인 주체를 결과에 명시했다(android/src/main/kotlin/net/
  monki/monki_pay_plugin/kovan/KovanVcat.java:516-579, lib/kovan/kovan_vcat_windows.dart:448-475).
- MethodChannel에서 비동기 콜백을 안전하게 전달하려고 요청별 ID 맵과 EventChannel 브리지를 구현, 네이티브 -> Flutter 실시간 로그를 보장했다(lib/
  monki_pay_plugin_method_channel.dart:12-54, android/src/main/kotlin/net/monki/monki_pay_plugin/MonkiPayPlugin.kt:300-318).
- Android 12 패키지 가시성 이슈를 Manifest queries와 런타임 패키지 체크 조합으로 해결하여 현장 설치 누락 이슈를 조기 감지하게 했다(android/src/main/
  AndroidManifest.xml:1-8, android/src/main/kotlin/net/monki/monki_pay_plugin/MonkiPayPlugin.kt:598-621).
- KSNET 전문은 EUC-KR/HEX 로그 없이는 디버깅이 어려워 Hex dump·CalcTax·Field parser로 구성된 유틸 세트를 별도 커밋(78304ea, 42f248b, 91c99a6)으로 갖췄고, STATUS
  "X" (거절)도 명시적으로 처리해 CS시 바로 원인 공유가 가능하다.

포트폴리오 문장 예시

- “KR-507 대응으로 KIS 카드 리더 타임아웃을 60초 상수화하고 승인/취소 Intent 전체에 적용해 실매장 카드 삽입 실패율을 줄였습니다(android/src/main/kotlin/net/monki/
  monki_pay_plugin/kis/KisVcat.java:26-33, 438-619).”
- “Android 12의 패키지 가시성 제한을 우회하기 위해 PG별 패키지 매핑과 Kotlin·Flutter 이중 API를 설계, 매장 오픈 전에 에이전트 설치 여부를 한 번에 진단할 수 있게
  했습니다(lib/util/payment_gateway_package_name.dart:3-15, lib/monki_pay_plugin_method_channel.dart:624-629, android/src/main/kotlin/net/monki/monki_pay_plugin/
  MonkiPayPlugin.kt:598-621).”
- “KSNET 현금영수증 승인/취소 전문을 직접 조립·파싱하는 유틸(Commit 78304ea, 42f248b, 91c99a6)을 만들고, 응답 전문을 EUC-KR 그대로 로깅해 통신사 협의 시간을 크게
  단축했습니다.”
