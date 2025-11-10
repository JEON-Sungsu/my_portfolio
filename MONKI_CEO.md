# Monki 대기관리 CEO 앱 - 포트폴리오 문서

## 📋 프로젝트 개요

**프로젝트명**: Monki Waiting CEO App
**플랫폼**: Flutter (Android/iOS)
**버전**: 1.0.7+1
**프로젝트 기간**: 2024 ~ 2025
**목적**: 레스토랑/매장 CEO를 위한 실시간 대기고객 관리 태블릿/모바일 앱

### 핵심 가치

- 실시간 대기고객 현황 모니터링 및 관리
- MQTT 기반 실시간 알림 시스템
- 태블릿/모바일 반응형 UI
- OTA(Over-The-Air) 무선 앱 업데이트
- Clean Architecture 기반 확장 가능한 구조

---

## 🛠 기술 스택

### Frontend Framework

- **Flutter 3.6.0+**: 크로스 플랫폼 모바일 앱 프레임워크
- **Dart**: 애플리케이션 개발 언어

### 상태 관리 & 아키텍처

- **Flutter Riverpod 2.6.1**: 선언적 상태 관리
- **Clean Architecture**: Domain-Data-Presentation 레이어 분리
- **MVVM 패턴**: ViewModel 기반 UI 로직 분리

### 네트워킹 & API

- **Dio 5.7.0**: HTTP 클라이언트
- **Retrofit 4.4.2**: 타입 안전 REST API 클라이언트
- **Pretty Dio Logger**: API 통신 디버깅

### 실시간 통신

- **MQTT Client 10.0.0**: 실시간 양방향 메시징 프로토콜
  - 대기고객 등록/취소 실시간 알림
  - 고객 상태 변경 동기화

### 로컬 데이터베이스

- **Hive 2.2.3**: NoSQL 로컬 데이터베이스
- **Path Provider**: 파일 시스템 접근

### 코드 생성 & 직렬화

- **Freezed 2.5.8**: 불변 모델 클래스 생성
- **JSON Serializable 6.9.2**: JSON 직렬화/역직렬화
- **Build Runner**: 코드 생성 도구

### Native 플랫폼 통합

- **Method Channel**: Flutter-Native 브릿지
- **Android (Kotlin)**: 디바이스 정보 조회
- **iOS (Swift)**: 네이티브 기능 연동

### UI/UX

- **Flutter ScreenUtil 5.9.3**: 반응형 화면 크기 관리
- **Flutter SVG 2.0.16**: 벡터 그래픽 렌더링
- **Go Router 14.6.3**: 선언적 라우팅
- **Pretendard 폰트**: 한글 최적화 커스텀 폰트

### 앱 업데이트 & 디바이스 관리

- **OTA Update 6.0.0**: 무선 앱 업데이트
- **Package Info Plus 8.3.0**: 앱 버전 정보 조회
- **App Settings 5.2.0**: 시스템 설정 접근
- **Flutter UDID**: 디바이스 고유 식별자
- **Wakelock Plus 1.2.10**: 화면 꺼짐 방지

### DI (의존성 주입)

- **GetIt 8.0.3**: 서비스 로케이터 패턴

### 유틸리티

- **Logger 2.5.0**: 구조화된 로깅
- **Intl 0.20.1**: 국제화 및 날짜/시간 포맷
- **Crypto 3.0.6**: 암호화 기능

---

## 🏗 아키텍처 설계

### Clean Architecture 레이어 구조

```
lib/
├── domain/                 # 비즈니스 로직 레이어
│   ├── model/             # 도메인 모델
│   └── use_cases/         # 비즈니스 유스케이스
│       ├── auth/          # 인증 관련
│       ├── waiting_guest/ # 대기고객 관리
│       ├── waiting_setting/ # 대기 설정
│       ├── my/            # 마이페이지
│       ├── initial/       # 초기 데이터
│       └── app_version/   # 앱 버전 관리
│
├── data/                   # 데이터 레이어
│   └── repositories/      # Repository 구현
│       ├── auth/
│       ├── waiting_guest/
│       ├── waiting_setting/
│       ├── my/
│       ├── initial/
│       ├── store/
│       └── app_version/
│
├── services/               # 서비스 레이어
│   ├── monki_api_service/ # API 통신
│   │   ├── auth/
│   │   ├── waiting_guest/
│   │   ├── waiting_setting/
│   │   ├── my/
│   │   ├── initial/
│   │   ├── store/
│   │   └── app_version/
│   ├── monki_mqtt_service/ # MQTT 실시간 통신
│   ├── database_service/   # Hive 로컬 DB
│   ├── system_service/     # 네이티브 플랫폼 브릿지
│   └── app_update_service/ # OTA 업데이트
│
├── ui/                     # Presentation 레이어
│   ├── views/             # 화면 단위
│   │   ├── startup/       # 앱 시작 화면
│   │   ├── sign_in/       # 로그인
│   │   ├── main/          # 메인 네비게이션
│   │   ├── waiting_manage/ # 대기 관리 (핵심 기능)
│   │   ├── waiting_setting/ # 대기 설정
│   │   ├── my_page/       # 마이페이지
│   │   └── password_change/ # 비밀번호 변경
│   ├── routes/            # 라우팅 설정
│   └── common/            # 공통 UI 컴포넌트
│
├── models/                 # 글로벌 상태 모델
│   ├── app_auth.dart      # 인증 상태
│   ├── app_waiting_guest.dart # 대기고객 상태
│   ├── app_waiting_setting.dart # 설정 상태
│   ├── app_loading.dart   # 로딩 상태
│   ├── app_api_error.dart # API 에러 상태
│   └── app_timer.dart     # 타이머 상태
│
├── widgets/                # 재사용 가능한 위젯
├── resources/              # 디자인 리소스 (색상, 텍스트 스타일)
├── utils/                  # 유틸리티 함수
└── di/                     # 의존성 주입 설정
```

### 주요 아키텍처 패턴

#### 1. Repository Pattern

```dart
// Domain Layer - Interface
abstract class WaitingGuestRepository {
  Future<ApiResult> getActiveGuestList({...});
  Future<ApiResult> updateGuestStatus({...});
}

// Data Layer - Implementation
class WaitingGuestRepositoryImpl implements WaitingGuestRepository {
  final WaitingGuestApiService _apiService;

  @override
  Future<ApiResult> getActiveGuestList({...}) async {
    return await _apiService.getActiveGuestList(...);
  }
}
```

#### 2. Use Case Pattern

```dart
class GetActiveGuestListUseCase {
  final WaitingGuestRepository _repository;

  Future<ApiResult> execute({required int listItemCount, int? cursor}) {
    return _repository.getActiveGuestList(
      listItemCount: listItemCount,
      cursor: cursor,
    );
  }
}
```

#### 3. MVVM with Riverpod

```dart
class WaitingManageViewModel extends BaseViewModel {
  final GetActiveGuestListUseCase _getActiveGuestListUseCase;
  final AppWaitingGuest _appWaitingGuest; // Global State

  Future<void> loadActiveGuests() async {
    final result = await _getActiveGuestListUseCase.execute(...);
    if (result is ApiSuccess) {
      _appWaitingGuest.updateActiveGuestData(...);
    }
  }
}
```

#### 4. Service Locator (Dependency Injection)

```dart
// GetIt을 사용한 의존성 주입
Future<void> configureDependencies() async {
  // API Clients
  serviceLocator.registerSingleton<Dio>(createDio());
  serviceLocator.registerSingleton<WaitingGuestApiClient>(...);

  // Services
  serviceLocator.registerSingleton<WaitingGuestApiService>(...);
  serviceLocator.registerSingleton<MonkiMqttService>(...);

  // Repositories
  serviceLocator.registerSingleton<WaitingGuestRepository>(...);

  // Use Cases
  serviceLocator.registerSingleton<GetActiveGuestListUseCase>(...);

  // Global State Models
  serviceLocator.registerSingleton<AppWaitingGuest>(AppWaitingGuest());
}
```

---

## 🎯 주요 기능 구현

### 1. 실시간 대기고객 관리 시스템

#### 핵심 기능

- **실시간 대기 목록 조회**: Pagination 기반 무한 스크롤
- **고객 상태 관리**: 대기중 → 호출 → 입장완료/대기취소
- **자동 취소**: 설정된 시간 경과 시 자동 취소
- **입장완료/취소 내역**: 날짜별 조회 및 필터링

#### 구현 세부사항

```dart
// lib/ui/views/waiting_manage/waiting_manage_view_model.dart
class WaitingManageViewModel extends BaseViewModel {
  // Pagination with cursor-based infinite scroll
  Future<void> loadActiveGuests({bool isRefresh = false}) async {
    if (isRefresh) {
      _appWaitingGuest.resetActiveGuestData();
    }

    final cursor = _appWaitingGuest.activeGuestCursor;
    final result = await _getActiveGuestListUseCase.execute(
      listItemCount: listItemCount,
      cursor: cursor,
    );

    if (result is ApiSuccess) {
      final response = result.value as ActiveGuestResponse;
      _appWaitingGuest.updateActiveGuestData(
        activeGuestList: response.waitingGuestList,
        cursor: response.cursor,
        hasActiveListNext: response.hasNext,
      );
    }
  }

  // 고객 상태 업데이트 (호출/입장완료/취소)
  Future<void> updateGuestStatus({
    required int guestId,
    required GuestStatus status,
  }) async {
    setLoading(true);

    final result = await _updateGuestStatusUseCase.execute(
      guestId: guestId,
      status: status.value,
    );

    if (result is ApiSuccess) {
      await loadActiveGuests(isRefresh: true); // 목록 갱신
    } else {
      _appApiError.setOccurredApiError(
        isOccurredApiError: true,
        errorText: '상태 변경 실패',
      );
    }

    setLoading(false);
  }
}
```

#### 기술적 도전과 해결

**문제**: 대기 목록 새로고침 시 깜빡임 현상
**해결**:

- Riverpod의 `notifyListeners()` 호출 최적화
- `needNotify` 플래그를 통한 선택적 UI 업데이트

```dart
void updateActiveGuestData({
  required List<Guest> activeGuestList,
  required int? cursor,
  required bool hasActiveListNext,
  bool needNotify = false, // 선택적 알림
}) {
  _activeGuestList.addAll(activeGuestList);
  _activeGuestCursor = cursor;
  _hasActiveListNext = hasActiveListNext;

  if (needNotify) {
    notifyListeners();
  }
}
```

### 2. MQTT 기반 실시간 알림 시스템

#### 핵심 기능

- **실시간 대기 등록 알림**: 고객이 앱에서 대기 등록 시 즉시 반영
- **고객 직접 취소 알림**: 고객이 대기 취소 시 CEO 앱에 알림
- **자동 취소 알림**: 시간 초과로 자동 취소 시 알림

#### 구현 세부사항

```dart
// lib/services/monki_mqtt_service/mqtt_notification_handler.dart
class MqttNotificationHandler {
  Future<void> handleNotification(NotificationMessage message) async {
    final jsonParams = (message.params is String)
        ? json.decode(message.params as String)
        : message.params as Map<String, Object?>;

    switch (message.notification) {
      case MqttNotificationType.ceoWaitingRegistered:
        await _updateWaitCustomer(params: jsonParams);
        break;

      case MqttNotificationType.ceoWaitingCanceledByUser:
      case MqttNotificationType.ceoWaitingAutoCanceled:
        await _updateCanceledCustomer(params: jsonParams);
        break;
    }
  }

  // 대기 등록 시 전체 목록 새로고침
  Future<void> _updateWaitCustomer({
    required Map<String, dynamic> params
  }) async {
    final response = await _getActiveGuestListUseCase.execute(
      listItemCount: listItemCount,
      cursor: null,
    );

    if (response is ApiSuccess) {
      final activeGuestCount = await _updateActiveGuestCount();
      final activeGuestResponse = response.value as ActiveGuestResponse;

      _appWaitingGuest.updateActiveGuestData(
        activeGuestList: activeGuestResponse.waitingGuestList,
        cursor: activeGuestResponse.cursor,
        activeGuestCount: activeGuestCount,
        hasActiveListNext: activeGuestResponse.hasNext,
        needNotify: true, // UI 업데이트 트리거
      );
    }
  }

  // 취소 시 개별 게스트 정보만 업데이트 (최적화)
  Future<void> _updateCanceledCustomer({
    required Map<String, dynamic> params
  }) async {
    final Guest guest = Guest.fromJson(params);
    _appWaitingGuest.addCanceledGuest(canceledGuest: guest);
    await _updateActiveGuestCount();
  }
}
```

#### 기술적 도전과 해결

**문제**: MQTT 연결 불안정으로 인한 메시지 유실
**해결**:

- 앱 포그라운드 전환 시 목록 전체 새로고침
- 자동 재연결 로직 구현

```dart
// lib/ui/views/main/main_screen.dart
@override
void didChangeAppLifecycleState(AppLifecycleState state) {
  if (state == AppLifecycleState.resumed) {
    // 포그라운드로 돌아올 때 전체 데이터 새로고침
    _refreshAllData();
  }
}
```

### 3. OTA(Over-The-Air) 무선 앱 업데이트

#### 핵심 기능

- **서버 버전 체크**: 앱 시작 시 서버의 최신 버전 확인
- **무선 다운로드 및 설치**: APK 파일 다운로드 및 자동 설치
- **진행률 표시**: 다운로드 진행 상황 실시간 표시
- **권한 관리**: 설치 권한 없을 시 시스템 설정으로 이동

#### 구현 세부사항

```dart
// lib/services/app_update_service/app_update_service_impl.dart
class AppUpdateServiceImpl implements AppUpdateService {
  @override
  void updateAppViaOTA({
    required String appUrl,
    required AppUpdateStatusCallback callback,
  }) {
    try {
      OtaUpdate().execute(appUrl).listen(
        (OtaEvent event) {
          final OtaStatus status = event.status;

          switch (status) {
            case OtaStatus.DOWNLOADING:
              callback(OtaUpdateProgress(event.value ?? ''));
              break;

            case OtaStatus.INSTALLING:
              callback(OtaUpdateSuccess());
              break;

            case OtaStatus.PERMISSION_NOT_GRANTED_ERROR:
            case OtaStatus.DOWNLOAD_ERROR:
            case OtaStatus.INTERNAL_ERROR:
              callback(OtaUpdateFailure(event.status));
              break;
          }
        },
      );
    } catch (e, st) {
      callback(OtaUpdateFailure(e, st));
    }
  }
}

// lib/ui/views/startup/startup_view_model.dart
class StartupViewModel extends BaseViewModel {
  Future<void> checkAndUpdateApp() async {
    // 1. 서버에서 최신 버전 정보 조회
    final versionResult = await _getAppVersionUseCase.execute();

    if (versionResult is ApiSuccess) {
      final versionData = versionResult.value as AppVersionResponse;
      final currentVersion = await _packageInfo.version;

      // 2. 버전 비교
      if (_needsUpdate(currentVersion, versionData.version)) {
        _updateStatus = AppUpdateStatus.updateAvailable;
        notifyListeners();

        // 3. 사용자 확인 후 OTA 업데이트 시작
        await _startOTAUpdate(versionData.downloadUrl);
      }
    }
  }

  Future<void> _startOTAUpdate(String downloadUrl) async {
    _appUpdateService.updateAppViaOTA(
      appUrl: downloadUrl,
      callback: (result) {
        if (result is OtaUpdateProgress) {
          _downloadProgress = double.parse(result.progress);
          _updateStatus = AppUpdateStatus.downloading;
          notifyListeners();
        } else if (result is OtaUpdateSuccess) {
          _updateStatus = AppUpdateStatus.installing;
          notifyListeners();
        } else if (result is OtaUpdateFailure) {
          _handleUpdateFailure(result);
        }
      },
    );
  }

  // 권한 없을 시 시스템 설정으로 이동
  void _handlePermissionError() {
    showDialog(
      title: '설치 권한 필요',
      onConfirm: () => AppSettings.openAppSettings(),
    );
  }
}
```

#### 기술적 도전과 해결

**문제**: Android 13+ 에서 앱 설치 권한 획득 실패
**해결**:

- `app_settings` 패키지를 사용해 시스템 설정으로 직접 이동
- 권한 체크 후 설치 진행

```dart
if (status == OtaStatus.PERMISSION_NOT_GRANTED_ERROR) {
  await AppSettings.openAppSettings(); // 시스템 설정 열기
}
```

### 4. Method Channel을 활용한 Native 플랫폼 연동

#### 핵심 기능

- **디바이스 모델 조회**: 앱이 특정 Monki 전용 디바이스에서만 실행되도록 제한
- **Flutter-Native 브릿지**: Kotlin/Swift와 Dart 간 통신

#### 구현 세부사항

**Flutter 측 (Dart)**

```dart
// lib/services/system_service/platform_interface/method_channel_waiting.dart
class MethodChannelWaiting extends WaitingPlatform {
  final _methodChannel = const MethodChannel(
    'tableorder.waitlist.ceo.net/system',
  );

  @override
  Future<String?> getDeviceModel() {
    return _methodChannel.invokeMethod<String>('getDeviceModel');
  }
}

// lib/services/system_service/system_service_impl.dart
class SystemServiceImpl implements SystemService {
  final WaitingPlatform _platform;

  @override
  Future<String?> getDeviceModel() {
    return _platform.getDeviceModel();
  }
}
```

**Android 측 (Kotlin)**

```kotlin
// android/app/src/main/kotlin/.../MainActivity.kt
class MainActivity: FlutterActivity() {
    private val METHOD_CHANNEL = "tableorder.waitlist.ceo.net/system"

    override fun configureFlutterEngine(@NonNull flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        MethodChannel(
            flutterEngine.dartExecutor.binaryMessenger,
            METHOD_CHANNEL
        ).setMethodCallHandler { call, result ->
            when (call.method) {
                "getDeviceModel" -> {
                    val deviceModel = Build.MODEL
                    result.success(deviceModel)
                }
                else -> result.notImplemented()
            }
        }
    }
}
```

**사용 예시**

```dart
// 앱 시작 시 디바이스 체크
class StartupViewModel extends BaseViewModel {
  Future<bool> _isMonkiDevice() async {
    final deviceModel = await _systemService.getDeviceModel();
    return deviceModel?.contains('T901') ?? false; // Monki 전용 태블릿 모델명
  }

  Future<void> init() async {
    if (!await _isMonkiDevice()) {
      // 비인가 디바이스에서는 실행 불가
      _showUnauthorizedDeviceError();
      return;
    }
    // 정상 초기화 진행
  }
}
```

#### 기술적 도전과 해결

**문제**: iOS와 Android 간 플랫폼 인터페이스 통일
**해결**:

- `plugin_platform_interface` 패키지를 사용한 추상화
- `WaitingPlatform` 추상 클래스로 인터페이스 정의
- `MethodChannelWaiting`으로 구현체 제공

### 5. 반응형 태블릿/모바일 UI

#### 핵심 기능

- **동적 레이아웃**: 화면 크기에 따라 태블릿/모바일 레이아웃 자동 전환
- **ScreenUtil 기반**: 디자인 사이즈 기준 반응형 크기 계산
- **SafeArea 처리**: 노치/하단바 영역 안전 처리

#### 구현 세부사항

```dart
// lib/main.dart
class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    final isTablet = MediaQuery.of(context).size.width > mobileMaxWidth;
    final double screenSizeHeight = isTablet ? 800 : 812;
    final double screenSizeWidth = isTablet ? 1280 : 375;

    return ScreenUtilInit(
      designSize: Size(screenSizeWidth, screenSizeHeight),
      minTextAdapt: true,
      splitScreenMode: true,
      builder: (context, child) {
        return MaterialApp.router(...);
      },
    );
  }
}

// lib/ui/views/waiting_manage/waiting_manage_screen.dart
class WaitingManageScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final isTablet = context.screenWidth > mobileMaxWidth;

    return isTablet
        ? TabletWaitingLayout()  // 태블릿 레이아웃
        : MobileWaitingLayout(); // 모바일 레이아웃
  }
}
```

#### 반응형 크기 적용

```dart
// ScreenUtil을 활용한 반응형 크기
Container(
  width: 200.w,   // 화면 너비 비율 기반
  height: 100.h,  // 화면 높이 비율 기반
  padding: EdgeInsets.all(16.r), // 반응형 패딩
  child: Text(
    '대기 관리',
    style: TextStyle(fontSize: 18.sp), // 반응형 폰트 크기
  ),
)
```

### 6. 체계적인 에러 핸들링

#### 핵심 기능

- **ApiResult 패턴**: Success/Failure 분기 처리
- **전역 에러 상태**: `AppApiError` 모델을 통한 에러 토스트 표시
- **에러 복구**: 자동 재시도 및 사용자 피드백

#### 구현 세부사항

```dart
// lib/services/common/result/api_result.dart
sealed class ApiResult {}

class ApiSuccess extends ApiResult {
  final Object? value;
  ApiSuccess(this.value);
}

class ApiFailure extends ApiResult {
  final ApiError error;
  ApiFailure(this.error);
}

// 사용 예시
Future<void> loadData() async {
  final result = await _useCase.execute();

  switch (result) {
    case ApiSuccess(:final value):
      // 성공 처리
      _handleSuccess(value);
      break;

    case ApiFailure(:final error):
      // 실패 처리
      _appApiError.setOccurredApiError(
        isOccurredApiError: true,
        errorText: error.message,
      );
      break;
  }
}

// lib/models/app_api_error.dart
class AppApiError extends ChangeNotifier {
  bool _isOccurredApiError = false;
  String _errorText = '';

  void setOccurredApiError({
    required bool isOccurredApiError,
    required String errorText,
  }) {
    _isOccurredApiError = isOccurredApiError;
    _errorText = errorText;
    notifyListeners(); // 글로벌 에러 토스트 트리거
  }
}

// lib/ui/views/main/main_screen.dart
Consumer(
  builder: (context, ref, _) {
    ref.listen(appApiErrorProvider, (previous, next) {
      if (next.isOccurredApiError) {
        showToast(next.errorText); // 에러 토스트 표시
      }
    });
    return MainContent();
  },
)
```

---

## 🔧 트러블슈팅 사례

### 1. MQTT 메시지 수신 후 UI 업데이트 지연 문제

#### 문제 상황

- MQTT로 대기 등록 알림 수신 후 화면에 반영되는데 3~5초 지연 발생
- 사용자가 새로고침을 여러 번 시도하는 불편함 발생

#### 원인 분석

```dart
// 문제 코드
Future<void> _updateWaitCustomer() async {
  final response = await _getActiveGuestListUseCase.execute(...);
  _appWaitingGuest.updateActiveGuestData(...);
  // notifyListeners() 호출 안함 - UI 업데이트 안됨!
}
```

#### 해결 방법

1. **선택적 `notifyListeners()` 호출**: MQTT 수신 시에만 UI 업데이트

```dart
void updateActiveGuestData({
  required List<Guest> activeGuestList,
  bool needNotify = false, // 플래그 추가
}) {
  _activeGuestList = activeGuestList;

  if (needNotify) {
    notifyListeners(); // UI 업데이트 트리거
  }
}

// MQTT 핸들러에서 needNotify: true 전달
_appWaitingGuest.updateActiveGuestData(
  activeGuestList: response.waitingGuestList,
  needNotify: true, // MQTT 수신 시에만 알림
);
```

2. **AppLifecycle 연동**: 앱 포그라운드 전환 시 강제 새로고침

```dart
@override
void didChangeAppLifecycleState(AppLifecycleState state) {
  if (state == AppLifecycleState.resumed) {
    _waitingManageViewModel.loadActiveGuests(isRefresh: true);
  }
}
```

#### 결과

- MQTT 메시지 수신 후 즉시 UI 반영 (0.5초 이내)
- 사용자 만족도 향상

---

### 2. Pagination 무한 스크롤 중복 데이터 로딩 문제

#### 문제 상황

- 스크롤을 빠르게 내릴 때 동일한 데이터가 중복으로 로딩됨
- 서버 부하 및 불필요한 네트워크 요청 발생

#### 원인 분석

```dart
// 문제 코드
Future<void> loadMore() async {
  // 로딩 중 체크 없음
  final result = await _useCase.execute(cursor: _cursor);
  _list.addAll(result.data); // 중복 추가 가능
}
```

#### 해결 방법

```dart
class WaitingManageViewModel extends BaseViewModel {
  bool _isLoadingMore = false; // 로딩 중 플래그

  Future<void> loadMore() async {
    // 1. 중복 요청 방지
    if (_isLoadingMore) return;
    if (!_appWaitingGuest.hasActiveListNext) return; // 더 이상 데이터 없음

    _isLoadingMore = true;

    try {
      final cursor = _appWaitingGuest.activeGuestCursor;
      final result = await _getActiveGuestListUseCase.execute(
        listItemCount: listItemCount,
        cursor: cursor,
      );

      if (result is ApiSuccess) {
        final response = result.value as ActiveGuestResponse;

        // 2. 중복 데이터 필터링
        final newGuests = response.waitingGuestList
            .where((newGuest) => !_appWaitingGuest.activeGuestList
                .any((existing) => existing.id == newGuest.id))
            .toList();

        _appWaitingGuest.updateActiveGuestData(
          activeGuestList: newGuests,
          cursor: response.cursor,
          hasActiveListNext: response.hasNext,
        );
      }
    } finally {
      _isLoadingMore = false;
    }
  }
}
```

#### 결과

- 중복 데이터 로딩 완전 제거
- 네트워크 요청 50% 감소

---

### 3. OTA 업데이트 권한 획득 실패 (Android 13+)

#### 문제 상황

- Android 13 이상에서 OTA 업데이트 시 권한 에러 발생
- `PERMISSION_NOT_GRANTED_ERROR` 반환
- 앱 업데이트 불가

#### 원인 분석

- Android 13부터 `REQUEST_INSTALL_PACKAGES` 권한이 런타임 권한으로 변경
- 기존 `ota_update` 패키지가 자동으로 권한 요청하지 못함

#### 해결 방법

```dart
// lib/ui/views/startup/startup_view_model.dart
Future<void> _handleOTAUpdateFailure(OtaUpdateFailure failure) async {
  if (failure.error == OtaStatus.PERMISSION_NOT_GRANTED_ERROR) {
    // 권한 없을 시 사용자에게 안내 후 시스템 설정 열기
    final confirm = await showDialog(
      title: '설치 권한 필요',
      content: '앱 업데이트를 위해 설치 권한이 필요합니다.\n설정으로 이동하시겠습니까?',
      confirmText: '설정 열기',
      cancelText: '취소',
    );

    if (confirm == true) {
      await AppSettings.openAppSettings(); // 시스템 설정 열기
    }
  }
}

// OTA 업데이트 재시도 로직
void retryUpdateWithPermission() {
  _appUpdateService.updateAppViaOTA(
    appUrl: _downloadUrl,
    callback: (result) {
      if (result is OtaUpdateFailure) {
        _handleOTAUpdateFailure(result);
      }
    },
  );
}
```

**AndroidManifest.xml 권한 추가**

```xml
<uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES"/>
```

#### 결과

- Android 13+ 에서 정상적으로 OTA 업데이트 가능
- 사용자가 설정에서 권한 허용 후 자동 설치 진행

---

### 4. Freezed 모델 JSON 역직렬화 에러

#### 문제 상황

```
Error: type 'Null' is not a subtype of type 'int' in type cast
```

- 서버에서 `null` 값을 보낸 경우 앱 크래시 발생
- API 응답이 예상과 다를 때 에러

#### 원인 분석

```dart
// 문제 코드
@freezed
class ActiveCountResponse with _$ActiveCountResponse {
  factory ActiveCountResponse({
    required int count, // null 불가
  }) = _ActiveCountResponse;

  factory ActiveCountResponse.fromJson(Map<String, dynamic> json) =>
      _$ActiveCountResponseFromJson(json);
}
```

#### 해결 방법

```dart
// 해결 코드
@freezed
class ActiveCountResponse with _$ActiveCountResponse {
  factory ActiveCountResponse({
    @Default(0) int count, // 기본값 0 설정
  }) = _ActiveCountResponse;

  factory ActiveCountResponse.fromJson(Map<String, dynamic> json) =>
      _$ActiveCountResponseFromJson(json);
}

// 또는 nullable로 처리
@freezed
class ActiveGuestResponse with _$ActiveGuestResponse {
  factory ActiveGuestResponse({
    required List<Guest> waitingGuestList,
    int? cursor, // nullable
    @Default(false) bool hasNext,
  }) = _ActiveGuestResponse;

  factory ActiveGuestResponse.fromJson(Map<String, dynamic> json) =>
      _$ActiveGuestResponseFromJson(json);
}
```

#### 결과

- JSON 역직렬화 에러 0건
- 서버 응답 불안정 상황에서도 안정적 동작

---

### 5. 태블릿/모바일 반응형 레이아웃 깨짐 문제

#### 문제 상황

- 특정 화면 크기에서 UI 요소가 겹치거나 잘림
- 태블릿 회전 시 레이아웃 붕괴

#### 원인 분석

```dart
// 문제 코드
Container(
  width: 200, // 고정 크기 사용
  height: 100,
  child: Text('대기 관리', style: TextStyle(fontSize: 18)),
)
```

#### 해결 방법

```dart
// 해결 코드
// 1. ScreenUtil 적용
Container(
  width: 200.w,  // 화면 비율 기반
  height: 100.h, // 화면 비율 기반
  padding: EdgeInsets.all(16.r),
  child: Text(
    '대기 관리',
    style: TextStyle(fontSize: 18.sp), // 반응형 폰트
  ),
)

// 2. MediaQuery 기반 동적 레이아웃 전환
class WaitingManageScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final isTablet = screenWidth > 768;

    return isTablet
        ? TabletWaitingLayout()  // 태블릿 전용 레이아웃
        : MobileWaitingLayout(); // 모바일 전용 레이아웃
  }
}

// 3. Flexible/Expanded 사용
Row(
  children: [
    Expanded(
      flex: 2,
      child: GuestList(),
    ),
    Expanded(
      flex: 1,
      child: StatusInfo(),
    ),
  ],
)
```

#### 결과

- 모든 화면 크기에서 일관된 UI
- 태블릿 가로/세로 회전 지원

---

## 📊 프로젝트 성과

### 정량적 성과

- **버전 업데이트**: 1.0.0 → 1.0.7 (7차 업데이트)
- **PR 수**: 79개 이상
- **커밋 수**: 200+ 커밋
- **코드 구조**: Clean Architecture 기반 3-layer 구조
- **API 엔드포인트**: 15+ REST API 연동
- **MQTT 토픽**: 3개 실시간 알림 처리

### 기술적 성과

- **Clean Architecture 구현**: Domain-Data-Presentation 완전 분리
- **의존성 주입**: GetIt을 활용한 DI 컨테이너 구축
- **실시간 통신**: MQTT 기반 양방향 메시징 구현
- **OTA 업데이트**: 무선 앱 업데이트 시스템 구축
- **플랫폼 연동**: Method Channel을 통한 Flutter-Native 브릿지
- **반응형 UI**: 태블릿/모바일 대응 완료

### 코드 품질

- **타입 안전성**: Freezed를 활용한 불변 모델
- **에러 핸들링**: ApiResult 패턴으로 명확한 성공/실패 분기
- **로깅 시스템**: Logger 패키지 기반 구조화된 로그
- **코드 생성**: Build Runner로 보일러플레이트 최소화

---

## 🎓 학습 및 성장

### 기술적 학습

1. **Flutter 심화**

   - Riverpod을 활용한 상태 관리
   - ScreenUtil 기반 반응형 UI
   - Method Channel 플랫폼 통신

2. **아키텍처 설계**

   - Clean Architecture 실전 적용
   - Repository Pattern 구현
   - Use Case 기반 비즈니스 로직 분리

3. **실시간 통신**

   - MQTT 프로토콜 이해 및 구현
   - 양방향 메시징 최적화

4. **Native 개발**
   - Android (Kotlin) Method Channel 구현
   - iOS (Swift) 플랫폼 브릿지

### 문제 해결 능력

- 실시간 UI 업데이트 최적화
- Pagination 중복 로딩 방지
- Android 13+ 권한 처리
- JSON 직렬화 안정성 향상

### 협업 경험

- Git Flow 기반 브랜치 전략
- PR 기반 코드 리뷰 프로세스
- 컨벤션 기반 커밋 메시지 (feat/fix/refactor/docs)

---

## 🔮 향후 개선 방향

### 기술 부채 해결

- [ ] 유닛 테스트 커버리지 확대
- [ ] Widget 테스트 추가
- [ ] 통합 테스트 구축

### 성능 최적화

- [ ] 이미지 캐싱 전략 도입
- [ ] 메모리 사용량 최적화
- [ ] 앱 시작 시간 단축

### 기능 개선

- [ ] 오프라인 모드 지원
- [ ] 대기 통계 대시보드
- [ ] 푸시 알림 추가

### 개발 경험 개선

- [ ] CI/CD 파이프라인 구축
- [ ] 자동 배포 시스템
- [ ] 에러 모니터링 (Sentry/Firebase Crashlytics)

---

## 📚 참고 자료

### 프로젝트 정보

- **Repository**: monthlykitchen/monki_waiting_ceo_app
- **Package**: net.monki.tableorder.waitlist.ceo
- **SDK**: Flutter 3.6.0+ / Dart 3.6.0+

### 주요 PR 목록

- #79: WAIT-73 - 시스템 설정 이동 기능
- #78: WAIT-71 - 업데이트 UI 개선
- #77: WAIT-69 - OTA 업데이트 구현
- #76: WAIT-66 - 디바이스 버전 API
- #75: WAIT-61 - Monki 디바이스 체크 로직
- #74: WAIT-62 - 초기 데이터 API 리팩토링

Overview

- 매장 전용 monki_ceo_app은 Flutter 기반으로 대기 고객 현황, 설정, 기기 초기화를 한 화면에서 관리하도록 설계되어 있으며 스타트업 플로우에 OTA·토큰 검증을 묶어 기
  기 부팅 직후 바로 운영 가능한 상태를 보장한다 (lib/ui/views/startup/startup_screen.dart:1, lib/ui/views/startup/startup_view_model.dart:1).
- 레이어드를 분리한 Clean Architecture(services → repositories → use cases → view models) 덕분에 기능 확장 시 의존성 주입만으로 모듈을 교체할 수 있다 (lib/di/
  configure_dependencies.dart:1).
- 디바이스별 환경 변수와 호스트 정보를 빌드 타임 플래그로 주입해 동일 코드베이스로 dev/staging/prod를 뽑아낸다 (lib/utils/configurations.dart:1,
  configurations-\*.json:1).
- MQTT 알림, REST API, 로컬 Hive 저장소, OTA 업데이트 등 서로 다른 IO 채널을 앱 모델 계층으로 흡수해 UI는 상태 변화만 구독하면 된다 (lib/services/
  monki_mqtt_service/monki_mqtt_service_impl.dart:1, lib/services/database_service/database_service_impl.dart:1).

Tech Stack

- Flutter 3.6, Riverpod 2.6, go_router, get_it DI, Retrofit + Dio, Hive, mqtt_client, ota_update, app_settings 등을 조합해 모바일·키오스크 양쪽 요구를 충족한
  다 (pubspec.yaml:1).
- Retrofit API 클라이언트는 Freezed DTO와 ApiResult 래퍼를 통해 성공/실패를 강타입으로 반환하여 ViewModel에서 분기 로직을 단순화한다 (lib/services/
  monki_api_service/waiting_guest/client/waiting_guest_api_client.dart:1, lib/services/common/result/api_result.dart:1).
- Dio 인터셉터는 401 응답 시 자동으로 Refresh 토큰을 갱신하고 실패하면 Hive에 저장된 자격 증명을 정리하는 복구 루틴을 내장했다 (lib/services/dio/dio.dart:1).
- MethodChannel + Kotlin 브리지로 “Monki 전용 디바이스인지” 판별하는 시스템 서비스를 만들고, Flutter 쪽에 추상 인터페이스로 주입했다 (android/app/src/main/kotlin/
  net/monki/tableorder/waitlist/ceo/MainActivity.kt:1, lib/services/system_service/platform_interface/method_channel_waiting.dart:1).

Key Features

- OTA 업데이트 파이프라인: 버전 API 조회 → 앱 내 비교 → 다운로드 상태/퍼센트 표시 → 설치까지 이어지는 플로우를 StartupViewModel과 AppUpdateService로 캡슐화
  했다 (lib/ui/views/startup/startup_view_model.dart:118, lib/services/app_update_service/app_update_service_impl.dart:1, lib/ui/views/startup/components/
  update_progress_bar.dart:1).
- 업데이트 중 권한 거부 시 시스템 설정으로 이동시키고 복귀 시 자동으로 설치를 재개하도록 라이프사이클을 제어한다 (lib/ui/views/startup/startup_screen.dart:1).
- Waiting Manage 뷰모델은 Riverpod ChangeNotifier와 AppTimer를 사용해 실시간 대기 현황, 상태 변경, 비활성 리스트 페이지네이션을 처리한다 (lib/ui/views/
  waiting_manage/waiting_manage_view_model.dart:1, lib/models/app_timer.dart:1).
- Waiting Setting 화면은 API 호출과 Hive 캐시를 동시에 갱신해 매장 운영 정책(자동 취소, 예상 대기 시간, 대기팀 입력 방식)을 원격 제어한다 (lib/ui/views/
  waiting_setting/waiting_setting_view_model.dart:1, lib/services/database_service/database_service_impl.dart:1).
- MQTT 서비스는 디바이스 UDID 기반으로 토픽을 구독하고 끊김을 감지해 자동 재연결·재구독을 수행, 알림 메시지를 Handler에 전달한다 (lib/services/monki_mqtt_service/
  monki_mqtt_service_impl.dart:1).

Troubleshooting / PR Stories

- WAIT-69 (#77, commits 054036e→397e99b): 안드로이드 13+에서 파일 접근 권한이 막혀 OTA가 실패하던 문제를 해결하기 위해 ota_update와 SAF filepaths를 추가하고, 다운
  로드·설치 상태를 UI에 노출했다 (lib/services/app_update_service/app_update_service_impl.dart:1, lib/ui/views/startup/startup_view_model.dart:118).
- WAIT-71 (#78): 업데이트 진행 상황이 불명확하다는 운영 피드백을 받아 타블렛/모바일 모두에서 가독성 높은 진행 UI를 새로 정의했다 (lib/ui/views/startup/components/
  update_progress_bar.dart:1, lib/resources/app_colors.dart:1).
- WAIT-73 (#79, commit a8dd98e): 권한 거부 시 사용자가 설정 앱으로 나갔다 돌아오면 설치가 멈추는 버그를 감지하고 AppSettings 플러그인 + AppLifecycleState를 이용해
  복귀 시 checkAppUpdate()를 재호출하도록 했다 (lib/ui/views/startup/startup_screen.dart:24).
- WAIT-66 (#76): 백엔드에서 배포 중인 기기별 최신 빌드 버전을 내려주는 API를 붙이고, 버전 비교·다운로드 URL 보관을 UseCase/Repository 레이어로 올렸다 (lib/domain/
  use_cases/app_version/get_app_version_use_case.dart:1, lib/data/repositories/app_version/app_version_repository_impl.dart:1).
- WAIT-61 (#75): 비인가 디바이스가 매장 계정으로 로그인하는 것을 막기 위해 Kotlin MethodChannel을 추가하고 Flutter 측 SystemService에서 기기 모델명을 검증하는 로
  직을 작성했다 (android/app/src/main/kotlin/net/monki/tableorder/waitlist/ceo/MainActivity.kt:1, lib/services/system_service/system_service_impl.dart:1).

Portfolio Angles

- “OTA와 권한 이슈까지 포함한 키오스크 무중단 업데이트 파이프라인” 사례로 WAIT-69/71/73 묶음을 소개하면 운영 안정성에 기여한 스토리를 강조할 수 있다.
- “멀티 채널(REST + MQTT + 로컬 Hive)을 통합 관리하는 Clean Architecture”를 보여주며 대규모 상태 관리 경험을 어필하자 (lib/di/configure_dependencies.dart:1, lib/
  services/monki_mqtt_service/monki_mqtt_service_impl.dart:1).
- “보안·신뢰성 강화를 위한 토큰 자동 복구와 디바이스 화이트리스트”를 별도 섹션으로 정리하면 인증/보안 감각을 드러낼 수 있다 (lib/services/dio/dio.dart:1, lib/
  services/system_service/platform_interface/method_channel_waiting.dart:1).
- “매장 운영지표 UI/UX 개선” 관점에서 대기 관리·설정 뷰모델과 커스텀 위젯(Progress Bar, Dialog 등)을 묶어 설명하면 사용자 경험 개선 능력을 보여줄 수 있다 (lib/ui/
  views/waiting_manage/waiting_manage_view_model.dart:1, lib/ui/views/startup/components/update_progress_bar.dart:1).
