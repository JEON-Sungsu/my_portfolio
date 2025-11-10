# Monki Waitlist 포트폴리오 메모

## 1. 프로젝트 한눈에

- 매장용 키오스크에서 대기 등록을 처리하고 고객에게 카카오톡 알림을 보내는 Flutter 3.6 기반 앱
- 운영 환경별(Dev/Staging/Prod) API 호스트를 분리하고, OTA 업데이트-버전 체크-장비 검증까지 앱에서 자가 진단
- 실시간 대기열, 약관 동의, 웨이팅 등록 완료까지 하나의 단말에서 진행하도록 전용 UI·UX 구성

## 2. 기술 스택 & 인프라 요약

- **클라이언트**: Flutter, Riverpod, go_router, ScreenUtil, Flutter SVG/Widget from HTML
- **상태/DI**: GetIt으로 도메인/데이터/서비스 의존성 주입, Riverpod ChangeNotifierProvider 조합
- **네트워킹**: Retrofit + Dio(PrettyLogger, 커스텀 인터셉터로 토큰 재발급) + MQTT, OTA Update
- **데이터**: Hive(로컬 토큰/계정 저장), Freezed/Json Serializable(응답 모델), PackageInfo+FlutterUdid(단말 정보)
- **네이티브 연동**: MethodChannel 기반 Device Model 조회, AppSettings 패키지로 권한 화면 이동, Wakelock/Orientation 고정
- **배포**: `configurations-*.json`으로 flavor/host 주입, flutter_native_splash로 화이트라벨 부트 화면 유지

## 3. 아키텍처 하이라이트

- 다층 구조: `lib/data` ↔ `lib/domain` ↔ `lib/ui` 로 API/Repository/UseCase/VM가 명확히 분리
- `configure_dependencies.dart`에서 API Client → Service → Repository → UseCase → GlobalModel 등록 시나리오를 한곳에서 관리
- 공통 BaseViewModel/AppFuture/AppLoading 조합으로 하나의 로딩 오버레이와 dispose-safe notify 패턴 유지
- go_router + 글로벌 navigatorKey로 `Startup → SignIn → Main → (Input → Confirm → Finish)` 플로우 정의, 오류 시 InitFail 화면으로 격리

## 4. 핵심 기능 구현

1. **무중단 OTA & 부팅 셀프체크**: Startup ViewModel에서 버전 비교 → OTA 다운로드 진행률/문구 표현 → 권한 거부 시 설정화면 유도 → 토큰 검증 → 초기 데이터/ MQTT 연결 순으로 체인 구성.
2. **실시간 대기열 동기화**: MQTT 브로커에 연결하고 토픽별 auto reconnect + clean session + will message 설정, NotificationHandler에서 debounce 처리로 연속 취소 이벤트 흡수.
3. **약관·동의 플로우**: Confirm 단계에서 필수/선택 약관 상태를 관리하고, 필요시 HTML로 내려온 약관을 팝업에서 바로 랜더링.
4. **키오스크 전용 입력 UX**: 번호 패드, 안내 문구, 히든 터치바(디버그/로그아웃)까지 모두 커스텀 위젯으로 제작, ScreenUtil로 해상도 대응.
5. **안정적인 인증/저장소**: Dio 인터셉터에서 401 감지 시 Refresh 토큰 흐름을 단일 지점에서 처리하고, Hive에 토큰·로그인 정보 저장/삭제를 일관되게 유지.
6. **장애 대응 UI**: 초기 데이터 수신 실패 시 종료/재시도 옵션이 있는 전용 화면으로 이동해 현장 대응 시간을 단축.

## 5. 트러블 슈팅 & PR 사례

- **WAIT-68 OTA Update**: `ota_update` 패키지와 Progress UI를 붙이며 퍼미션 거부 시 OS 설정 이동까지 자동화. 예외 처리 후 상태 문구/퍼센트 업데이트를 명확히 표기해 점포 스태프가 대처 가능하도록 함.
- **WAIT-67 Device Version API**: 서버 버전 정책과 앱 버전 파서를 분리하고, PackageInfoPlus에서 받아온 버전을 커스텀 포맷으로 비교해 엣지 케이스를 줄임.
- **WAIT-65 Monki Device Check**: Flutter → 네이티브 MethodChannel을 만들어 장비 모델명(MK\*) 확인 후, 비인가 기기는 초기화 단계에서 차단.
- **WAIT-64 Initial Data 리팩토링**: 초기 데이터 API 응답 구조 변경에 맞춰 Domain/Model을 재조직하고, MQTT 연결과 Store/Setting 업데이트 순서를 안정화.
- **WAIT-59 Terms API & 팝업**: 약관 리스트/상세를 서버 주도형으로 바꾸고, 동의 UI·팝업을 재작성해 법무 변경을 코드 수정 없이 반영 가능하게 개선.
- **WAIT-58/54 입력 플로우 개선**: 번호 패드/폰 포맷팅/validation, 등록 완료 후 타이머·리셋 로직을 다듬어 매장 직원介입 없이 손님이 다음 단계로 이동하도록 만듦.
- **WAIT-74 UI 핫픽스**: 약관/폰번호 텍스트의 간격, 배경 색상, lineHeight를 조정해 가독성과 브랜딩 통일성을 확보.
- **WAIT-72/70 업데이트 UX**: OTA 준비/다운로드/설치 단계를 ProgressBar로 시각화하고, 필요 시 앱 설정으로 이동하는 CTA를 추가해 현장 업데이트 완료율을 끌어올림.

## 6. 포트폴리오에 쓸 수 있는 문장 예시

1. "키오스크 전용 Flutter 앱에 OTA 업데이트 파이프라인을 이식해, 앱이 스스로 버전 검증→다운로드→권한 유도→재시동까지 처리하도록 구현했습니다."
2. "MQTT 브로커에 auto-reconnect + debounce 처리를 더해, 실시간 대기팀·설정 변화를 지연 없이 UI에 반영하고 API 오류도 글로벌 상태로 수집했습니다."
3. "약관, 전화번호 입력, 숨겨진 로그아웃 영역 등 모든 터치 포인트를 커스텀 위젯화해 QA 요청(세만틱스 라벨, 폰트, 간격)을 빠르게 반영했습니다."

# Monki Waitlist - Portfolio Documentation

## 프로젝트 개요

**Monki Waitlist**는 Monthly Kitchen의 웨이팅 관리 시스템을 위한 Flutter 기반 태블릿 애플리케이션입니다. 실시간 대기열 관리, MQTT 기반 실시간 통신, OTA 업데이트 등의 핵심 기능을 제공합니다.

- **프로젝트 버전**: 1.0.7+1
- **플랫폼**: Android, iOS (태블릿 최적화, 가로 모드 전용)
- **개발 기간**: 2024년 ~ 현재
- **팀 규모**: Monthly Kitchen 개발팀

---

## 기술 스택

### Core Framework

- **Flutter 3.6.0**: 크로스 플랫폼 모바일 애플리케이션 프레임워크
- **Dart SDK ^3.6.0**: 프로그래밍 언어

### 상태 관리 및 아키텍처

- **flutter_riverpod ^2.6.1**: 선언적 상태 관리
- **GetIt ^8.0.3**: 의존성 주입 (Dependency Injection)
- **Clean Architecture**: Repository Pattern, UseCase Pattern 적용

### 네트워크 및 API

- **Dio ^5.7.0**: HTTP 클라이언트
- **Retrofit ^4.4.2**: Type-safe REST API 클라이언트 생성기
- **pretty_dio_logger ^1.4.0**: API 요청/응답 로깅
- **json_annotation ^4.9.0 & json_serializable ^6.9.2**: JSON 직렬화

### 실시간 통신

- **mqtt_client ^10.0.0**: MQTT 프로토콜 기반 실시간 메시징
- 실시간 대기열 상태 업데이트
- 웨이팅 설정 변경 푸시 알림

### 로컬 데이터베이스

- **Hive ^2.2.3**: 경량 NoSQL 로컬 데이터베이스
- 인증 토큰 안전 저장
- 로컬 캐싱

### 코드 생성 및 불변성

- **Freezed ^2.5.8**: 불변 데이터 클래스 자동 생성
- **freezed_annotation ^2.4.4**: Freezed 어노테이션
- **build_runner ^2.4.14**: 코드 생성 도구

### UI/UX

- **flutter_screenutil ^5.9.3**: 반응형 UI 크기 조정
- **flutter_svg ^2.0.16**: SVG 이미지 렌더링
- **go_router ^14.6.3**: 선언적 라우팅
- **flutter_widget_from_html ^0.15.3**: HTML 렌더링 (약관 표시)
- **Pretendard Font**: 커스텀 한글 폰트 (100~900 weight 지원)

### 디바이스 및 플랫폼

- **flutter_udid ^3.0.0**: 디바이스 고유 식별자
- **package_info_plus ^8.3.0**: 앱 버전 정보 관리
- **wakelock_plus ^1.2.10**: 화면 항상 켜짐 유지
- **app_settings ^5.2.0**: 시스템 설정 앱으로 이동
- **plugin_platform_interface ^2.1.8**: 네이티브 플랫폼 통신 인터페이스

### OTA 업데이트

- **ota_update ^6.0.0**: Over-The-Air 앱 업데이트
- 자동 버전 체크 및 업데이트 다운로드

### 개발 도구

- **flutter_lints ^5.0.0**: Lint 규칙
- **Logger ^2.5.0**: 구조화된 로깅
- **crypto ^3.0.6**: 암호화 유틸리티

---

## 아키텍처 설계

### Clean Architecture 구조

```
lib/
├── data/                      # Data Layer
│   ├── auth/                  # 인증 Repository
│   ├── guest/                 # 게스트 Repository
│   ├── waiting_setting/       # 웨이팅 설정 Repository
│   ├── store/                 # 매장 Repository
│   ├── terms/                 # 약관 Repository
│   ├── app_version/           # 앱 버전 Repository
│   └── initial/               # 초기 데이터 Repository
│
├── domain/                    # Domain Layer (Use Cases)
│   └── [각 도메인별 Use Case]
│
├── services/                  # Service Layer
│   ├── monki_api_service/     # REST API 서비스
│   │   ├── auth/              # 인증 API
│   │   ├── guests/            # 게스트 API
│   │   ├── waiting_setting/   # 웨이팅 설정 API
│   │   ├── store/             # 매장 API
│   │   ├── terms/             # 약관 API
│   │   ├── app_version/       # 앱 버전 API
│   │   └── initial/           # 초기 데이터 API
│   │
│   ├── monki_mqtt_service/    # MQTT 실시간 통신
│   ├── database_service/      # Hive 로컬 DB
│   ├── app_update_service/    # OTA 업데이트
│   └── system_service/        # 네이티브 플랫폼 통신
│
├── ui/                        # Presentation Layer
│   ├── startup/               # 시작 화면
│   ├── sign_in/               # 로그인
│   ├── main/                  # 메인 대기열 화면
│   ├── input_guest_count/     # 인원 수 입력
│   ├── waiting_confirm/       # 웨이팅 확인
│   ├── waiting_finish/        # 웨이팅 완료
│   └── routes/                # 라우팅 설정
│
├── models/                    # Global State Models
│   ├── app_auth.dart          # 인증 상태
│   ├── app_guests.dart        # 게스트 상태
│   ├── app_waiting_setting.dart  # 웨이팅 설정 상태
│   ├── app_store.dart         # 매장 상태
│   ├── app_loading.dart       # 로딩 상태
│   ├── app_api_error.dart     # API 에러 상태
│   └── app_initial_data.dart  # 초기 데이터
│
├── widgets/                   # 재사용 가능한 위젯
│   ├── monki_button.dart
│   ├── monki_text_form_field.dart
│   ├── monki_number_pad.dart
│   ├── monki_check_box.dart
│   ├── monki_alert_dialog.dart
│   ├── monki_loading_spinner.dart
│   └── monki_stepper.dart
│
└── di/                        # Dependency Injection
    └── configure_dependencies.dart
```

### 의존성 주입 패턴

GetIt을 활용한 Service Locator 패턴 구현:

```dart
// lib/di/configure_dependencies.dart:60-234

- API Client Layer: Retrofit 기반 타입 안전 API 클라이언트
- Service Layer: 비즈니스 로직 처리
- Repository Layer: 데이터 추상화
- Global Models: 앱 전역 상태 관리
- Singleton 패턴으로 리소스 효율성 확보
```

### 네이티브 플랫폼 통신

MethodChannel을 통한 Flutter-Native 양방향 통신:

**Flutter Side** (lib/services/system_service/platform_interface/waiting_platform_interface.dart:1-21):

```dart
abstract class WaitingPlatform extends PlatformInterface {
  Future<String?> getDeviceModel();  // 디바이스 모델명 조회
}
```

**Android Native Side** (android/app/src/main/kotlin/net/monki/tableorder/waitlist/MainActivity.kt:10-37):

```kotlin
class MainActivity: FlutterActivity() {
    private val METHOD_CHANNEL = "tableorder.waitlist.net/system"

    // getDeviceModel(): Build.MODEL 반환
}
```

---

## 주요 기능 구현

### 1. MQTT 기반 실시간 통신 시스템

**목적**: 웨이팅 상태 변경을 실시간으로 태블릿에 반영

**구현 내용** (lib/services/monki_mqtt_service/monki_mqtt_service_impl.dart:1-100):

- **자동 재연결**: autoReconnect, resubscribeOnAutoReconnect 활성화
- **연결 타임아웃**: 30초 (기본값 5초에서 증가)
- **Keep-Alive**: 20초 주기
- **보안 연결**: TLS/SSL 지원
- **Last Will & Testament**: 예기치 못한 종료 시 서버에 offline 상태 전달

```dart
client!.connectionMessage = MqttConnectMessage()
  ..withWillTopic(_willTopic)
  ..withWillMessage(json.encode({
    'storeNo': storeNo,
    'deviceId': deviceId,
    'status': 'offline',
  }))
```

**메시지 핸들링** (lib/services/monki_mqtt_service/mqtt_notification_handler.dart):

1. **userWaitingStatusChanged**: 전체 대기 팀 수 업데이트
2. **userWaitingSettingChanged**: 웨이팅 설정 변경 (인원 수 입력 여부, 예상 대기 시간 표시 등)

**디바운싱 구현**:

```dart
// lib/services/monki_mqtt_service/mqtt_notification_handler.dart:46-68
// 웨이팅 취소가 다중 발생할 수 있어 1초 디바운스 적용
Timer? _debounceTimer;

_debounceTimer?.cancel();
_debounceTimer = Timer(Duration(milliseconds: 1000), () async {
  // 마지막 호출만 실행
});
```

**관련 커밋**:

- `16751153c5b1090db3da4ef8ea473e0944846c6b` - MQTT 콜백 구현
- `fix: initMqtt 인자값 수정, 미사용 필드값 삭제 및 불필요 리쓰너 삭제`

### 2. OTA (Over-The-Air) 업데이트 시스템

**목적**: 앱 스토어 없이 원격으로 앱 업데이트 배포

**구현 단계**:

1. **앱 버전 체크** (lib/services/app_update_service/):

   - PackageInfo로 현재 버전 조회
   - 서버 API로 최신 버전 확인
   - 버전 파싱 및 비교 유틸리티 구현

2. **다운로드 및 설치**:

   - ota_update 패키지로 APK 다운로드
   - 진행 상황 콜백으로 UI 업데이트
   - Android 설정 (AndroidManifest.xml, build.gradle)

3. **업데이트 UI** (lib/ui/startup/):
   - UpdateProgressBar 컴포넌트 구현
   - 단계별 텍스트 표시 (다운로드 중, 설치 준비 중 등)

**상태 관리**:

```dart
// lib/services/app_update_service/ota_update_result.dart
enum OtaUpdateStatus {
  downloading,
  installing,
  success,
  alreadyRunningError,
  permissionNotGrantedError,
  internalError,
}
```

**관련 커밋**:

- `62b4f37c5d01727a2be5097435d8b8f8bc17cf30` - OTA 업데이트 기능
- `feat: appUpdateService 구현`
- `feat: UpdateProgressBar 컴포넌트 구현`
- `feat: 버전 생성, 파싱 관련 유틸 메서드 구현`

### 3. 클린 아키텍처 기반 초기 데이터 로딩

**목적**: 앱 시작 시 필요한 모든 데이터를 체계적으로 로드

**리팩토링 전후 비교**:

**Before**: 각 화면에서 개별적으로 데이터 로드
**After**: 중앙 집중식 초기 데이터 로딩 시스템

**구현 구조**:

```
GetInitialDataUseCase (도메인)
    ↓
InitialDataRepository (데이터)
    ↓
InitialDataApiService → InitialDataApiClient (서비스)
    ↓
AppInitialData (글로벌 모델)
```

**로딩 데이터**:

- 매장 정보
- 웨이팅 설정
- MQTT 연결 정보
- 약관 정보

**관련 커밋**:

- `17573603ec9f73010b1956e425a5262b9c1b0b36` - 초기 데이터 셋업 리팩토링
- `feat: AppInitialData 글로벌 모델 추가`
- `feat: GetInitialDataUseCase 추가`

### 4. 디바이스 모델 체크 시스템

**목적**: 특정 Monki 전용 디바이스에서만 앱 실행 허용

**구현 흐름**:

1. **Native 코드로 디바이스 모델 조회**:

   - Android: `Build.MODEL`
   - iOS: UIDevice 정보

2. **MethodChannel 통신**:

   ```dart
   // lib/services/system_service/platform_interface/method_channel_waiting.dart
   final deviceModel = await _methodChannel.invokeMethod('getDeviceModel');
   ```

3. **서버 검증**:

   - GetAppVersionUseCase로 서버에 디바이스 정보 전송
   - 승인된 디바이스 목록과 비교

4. **미승인 디바이스 처리**:
   - 설정 앱 이동 기능 (app_settings 패키지)
   - 에러 메시지 표시

**관련 커밋**:

- `87b27116d1614107ee4be7c1a4718ba3c4a70ccf` - Monki 디바이스 체크 로직
- `feat: Native 코드 구현`
- `feat: SystemService 구현`
- `add: 설정앱으로 이동하기 기능 추가`

### 5. Retrofit 기반 타입 안전 API 클라이언트

**특징**:

- 컴파일 타임 타입 체크
- 자동 JSON 직렬화/역직렬화
- Freezed로 불변 데이터 모델

**예시**:

```dart
// lib/services/monki_api_service/auth/client/auth_api_client.dart
@RestApi()
abstract class AuthApiClient {
  factory AuthApiClient(Dio dio) = _AuthApiClient;

  @POST('/auth/token')
  Future<AuthResponse> getAuthToken(@Body() AuthRequest request);

  @POST('/auth/refresh')
  Future<AuthResponse> refreshAuthToken(@Body() RefreshRequest request);
}
```

**에러 핸들링**:

```dart
// lib/services/common/result/api_result.dart
ApiResult.wrap<T>(() => apiCall())
  .then((result) => result.when(
    success: (data) => handleSuccess(data),
    error: (error) => handleError(error),
  ));
```

### 6. 반응형 UI 시스템

**태블릿 최적화**:

```dart
// lib/main.dart:46-49
ScreenUtilInit(
  designSize: Size(1280, 800),  // 태블릿 가로 모드 기준
  minTextAdapt: true,
  splitScreenMode: true,
)
```

**가로 모드 고정**:

```dart
// lib/main.dart:44-45
SystemChrome.setPreferredOrientations([
  DeviceOrientation.landscapeLeft,
  DeviceOrientation.landscapeRight
]);
SystemChrome.setEnabledSystemUIMode(SystemUiMode.manual, overlays: []);
```

**화면 항상 켜짐**:

```dart
// lib/main.dart:17
await WakelockPlus.enable();
```

---

## 트러블슈팅

### 1. MQTT 연결 불안정 문제

**문제**:

- 네트워크 불안정 시 MQTT 연결 끊김
- 재연결 시 구독 토픽 유실

**해결**:

```dart
// lib/services/monki_mqtt_service/monki_mqtt_service_impl.dart:52-66
client
  ..connectTimeoutPeriod = 30000  // 5s → 30s 증가
  ..autoReconnect = true
  ..resubscribeOnAutoReconnect = true  // 재연결 시 자동 재구독
  ..onAutoReconnect = _willAutoReconnect
  ..onAutoReconnected = _autoReconnected
```

**관련 커밋**:

- `fix: initMqtt 인자값 수정, 미사용 필드값 삭제 및 불필요 리쓰너 삭제`

### 2. 웨이팅 취소 중복 처리 이슈

**문제**:

- 동일 웨이팅에 대한 취소 알림이 다중으로 발생
- UI가 여러 번 갱신되어 깜빡임 발생

**해결**:

```dart
// lib/services/monki_mqtt_service/mqtt_notification_handler.dart:46-68
// 1초 디바운스 타이머 적용
Timer? _debounceTimer;

if (_debounceTimer != null) {
  _debounceTimer?.cancel();  // 이전 타이머 취소
}

_debounceTimer = Timer(Duration(milliseconds: 1000), () async {
  // 마지막 호출만 실행
  _appGuests.updateActiveGuestTeamTotalCount(totalTeamCount: totalTeamCount);
});
```

**결과**: 1초 내 중복 호출은 무시하고 마지막 호출만 처리

### 3. OTA 업데이트 메서드 네이밍 혼란

**문제**:

- `otaUpdateApp`, `updateApp`, `genVersion` 등 일관성 없는 메서드명
- 코드 가독성 저하

**해결**:

```dart
// 리팩토링 전
otaUpdateApp() → updateAppViaOTA()
genVersion() → generateVersion()
StatusResult → OtaUpdateResult
```

**관련 커밋**:

- `fix: otaUpdateApp 메서드 네이밍 수정`
- `fix: genVersion 메서드명 수정 -> generateVersion`
- `refactor: StatusResult 네이밍 수정 -> OtaUpdateResult`

### 4. 초기 데이터 로딩 로직 복잡도 문제

**문제**:

- 각 화면에서 개별적으로 API 호출
- 중복 호출 및 로딩 순서 관리 어려움
- 에러 핸들링 분산

**해결**:

```
리팩토링: 중앙 집중식 초기 데이터 로딩 시스템 구축

1. AppInitialData 글로벌 모델 생성
2. InitialDataRepository 추상화
3. GetInitialDataUseCase로 도메인 로직 분리
4. StartupScreen에서 단일 진입점 제공
```

**이점**:

- 단일 책임 원칙 준수
- 에러 핸들링 중앙화
- 테스트 용이성 향상

**관련 커밋**:

- `17573603ec9f73010b1956e425a5262b9c1b0b36` - 초기 데이터 셋업 리팩토링

### 5. UI 세부 조정 이슈

**문제 및 해결**:

1. **전화번호 표기 가독성**:

   - `fix: 전화번호 표기 Text letterSpacing 추가`
   - letterSpacing 조정으로 숫자 간격 최적화

2. **약관 팝업 디자인**:

   - `fix: 약관 팝업 border 추가`
   - `add: 약관 팝업 Container에 백그라운드 색상 추가`
   - 시각적 구분 강화

3. **MonkiCheckBox 구조 개선**:

   - `fix: MonkiCheckBox 구조 개선`
   - 재사용 가능한 컴포넌트로 리팩토링

4. **ScreenUtil 적용**:
   - 모든 위젯에 ScreenUtil 적용으로 다양한 태블릿 해상도 대응

**관련 커밋**:

- `5334e0520218fc75ac8076b6e1c38cb899c71f03` - UI 수정 PR

### 6. 도메인 폴더 구조 개선

**문제**:

- 초기 폴더 구조가 기능별로 명확히 분리되지 않음
- 의존성 방향이 불명확

**해결**:

```
리팩토링: Clean Architecture 레이어 명확화

lib/
├── data/          # Repository 구현체
├── domain/        # Use Cases
├── services/      # 외부 API, 인프라
└── ui/            # Presentation
```

**관련 커밋**:

- `refactor: domain 폴더링 구조 변경`

---

## 코드 품질 관리

### 코드 생성 자동화

**Build Runner 활용**:

```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

**생성 파일**:

- `*.g.dart`: JSON 직렬화 코드 (json_serializable)
- `*.freezed.dart`: 불변 데이터 클래스 (freezed)
- API 클라이언트 구현체 (retrofit_generator)

### Lint 규칙

- **flutter_lints ^5.0.0** 적용
- 코드 스타일 일관성 유지
- 잠재적 버그 사전 감지

### 로깅 시스템

**구조화된 로깅**:

```dart
// lib/util/app_log_printer.dart
import 'package:logger/logger.dart';

final log = Logger(
  printer: PrettyPrinter(),
);

// 사용 예시
log.i('MQTT message : ${message.notification}');
log.e('MQTT 전체 대기인원수 업데이트 에러 : params are null');
```

---

## 배포 및 버전 관리

### 버전 관리 전략

**현재 버전**: 1.0.7+1

- 메이저.마이너.패치+빌드번호 형식
- Git 브랜치: main, staging, prod 구분

### 환경별 빌드 설정

**Android**:

```
dev, staging, prod 환경별 빌드 타입 구분
각 환경별 서버 엔드포인트 분리
```

**iOS**:

```
Debug-dev, Debug-staging 스킴 구성
```

### CI/CD (추정)

- GitHub Actions 또는 내부 CI 시스템 사용 가능성
- 브랜치별 자동 빌드
- OTA 업데이트 서버로 자동 배포

---

## 성과 및 기대 효과

### 기술적 성과

1. **Clean Architecture 도입**:

   - 테스트 가능한 코드베이스 구축
   - 의존성 역전 원칙으로 유지보수성 향상

2. **실시간 통신 안정성**:

   - MQTT 자동 재연결 및 디바운싱으로 안정적인 실시간 동기화

3. **OTA 업데이트 시스템**:

   - 앱 스토어 리뷰 없이 신속한 업데이트 배포
   - 다운타임 최소화

4. **타입 안전성**:
   - Retrofit + Freezed로 런타임 에러 최소화
   - 컴파일 타임 타입 체크

### 비즈니스 효과

- 태블릿 전용 웨이팅 시스템으로 고객 경험 향상
- 실시간 대기열 정보 제공으로 투명성 증대
- 원격 업데이트로 운영 비용 절감

---

## 향후 개선 방향

### 기술 부채 해소

- 테스트 코드 작성 (Unit, Widget, Integration)
- 에러 핸들링 표준화
- 성능 모니터링 도구 도입 (Firebase Crashlytics, Sentry 등)

### 기능 확장

- 다국어 지원 (i18n)
- 다크 모드 지원
- 접근성 개선 (Accessibility)
- 오프라인 모드 지원

### 아키텍처 개선

- BLoC 패턴 도입 검토
- 모듈화 강화
- 마이크로 프론트엔드 아키텍처 검토

---

## 참고 자료

### 주요 Pull Requests

1. **WAIT-74**: UI 수정 (#28)
2. **WAIT-72**: 설정앱 이동 기능 (#27)
3. **WAIT-70**: 업데이트 UI (#26)
4. **WAIT-68**: OTA 업데이트 (#25)
5. **WAIT-67**: 디바이스 버전 API (#24)
6. **WAIT-65**: Monki 디바이스 체크 로직 (#23)
7. **WAIT-64**: 초기 데이터 리팩토링 (#22)
8. **WAIT-59**: 약관 API (#6)
9. **WAIT-58**: 대기 입력/완료 화면 (#2)
10. **WAIT-57**: 로그아웃 (#4)
11. **WAIT-56**: MQTT 콜백 (#3)
12. **WAIT-54**: 메인 화면 (#1)

### 커밋 컨벤션

- `feat:` 새로운 기능
- `fix:` 버그 수정
- `refactor:` 리팩토링
- `add:` 파일/의존성 추가
- `docs:` 문서 업데이트

---

## 연락처 및 링크

- **프로젝트**: Monthly Kitchen Waitlist System
- **Repository**: monthlykitchen/monki_waitlist (private)
- **현재 브랜치**: prod
- **최종 업데이트**: 2025년

---

**문서 생성일**: 2025-11-10
**작성자**: Claude Code (AI 어시스턴트)
**목적**: 포트폴리오 및 기술 문서화
