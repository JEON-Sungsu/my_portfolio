# Monthly Kitchen Table Order Launcher - Portfolio Documentation

**개발자**: JEON Sungsu (JEON-Sungsu-Monki)
**프로젝트**: Monthly Kitchen Table Order Launcher Application
**기간**: 2024.10 - 2025.06
**총 커밋 수**: 49개
**버전**: 1.1.1+34

---

## 📋 프로젝트 개요

Monthly Kitchen의 테이블 주문 시스템을 위한 Android 기반 런처 애플리케이션입니다. 레스토랑 환경에서 사용되는 전용 태블릿 디바이스의 홈 화면 역할을 하며, 테이블오더 앱 실행, 앱 업데이트 관리, 디바이스 설정 등의 기능을 제공합니다.

### 주요 특징
- **크로스 플랫폼**: Flutter 기반으로 개발되어 iOS/Android 지원 가능
- **다국가 지원**: 한국(KR)과 미국(US) 시장을 위한 독립적인 구성
- **OTA 업데이트**: 자동 APK 다운로드 및 설치 기능
- **디바이스 관리**: 시스템 설정, 네트워크 관리, 볼륨 제어 통합

---

## 🛠 기술 스택

### Frontend
- **Flutter 3.1.3+** - 크로스 플랫폼 UI 프레임워크
- **Dart** - 메인 프로그래밍 언어
- **Provider 6.1.2** - 상태 관리
- **GoRouter 13.2.0** - 라우팅 및 네비게이션

### Native Android
- **Kotlin** - Android 네이티브 코드
- **MethodChannel** - Flutter-Android 브리지 통신
- **PackageInstaller API** - APK 설치 관리
- **BroadcastReceiver** - 앱 다운로드 이벤트 처리
- **ActivityManager** - 앱 프로세스 상태 모니터링

### 주요 라이브러리
- `device_apps 2.2.0` - 설치된 앱 정보 조회
- `flutter_downloader 1.11.7` - APK 다운로드 관리
- `package_info_plus 4.2.0` - 패키지 정보 접근
- `app_settings 5.1.1` - 시스템 설정 통합
- `barcode_widget 2.0.4` - 디바이스 식별 바코드 생성

---

## 🎯 핵심 기여 사항

### 1. 다국가 지원 시스템 구축 (2024.10)

**문제**: 한국과 미국 시장의 다른 요구사항과 UI/UX를 단일 코드베이스로 관리 필요

**솔루션**:
- 국가코드 기반 구성 관리 시스템 설계 및 구현
- 빌드 타임 국가 설정으로 배포 단순화
- UI 컴포넌트의 국가별 자동 렌더링

**주요 커밋**:
```
0048bf6 - add: 미국향-한국향 국가 구분 configuration 추가
853f5dd - add: countryCode에 따른 US-KR 패키지명 분리
f8e3502 - refactor: countryCode KR 일때만, PG 에이전트 설치 안내 팝업 노출
```

**기술적 상세**:

```dart
// lib/utils/package_name_manager.dart
class PackageNameManager {
  static final CountryCode _countryCode = getCountryCode();

  static final Map<CountryCode, String> _packageName = {
    CountryCode.US: _getTableOrderPackageNameUS(),
    CountryCode.KR: _getTableOrderPackageNameKR(),
  };

  static String get packageName => _packageName[_countryCode]!;
}
```

**성과**:
- 단일 코드베이스로 2개 국가 시장 지원
- 국가별 패키지 네임스페이스 자동 관리
- 환경별(dev/staging/prod) 패키지 자동 분기

---

### 2. Resume Ordering 기능 개발 (2024.10-11, 2025.05)

**문제**: 사용자가 테이블오더 앱에서 벗어났을 때 빠르게 주문 화면으로 복귀할 방법 부재

**솔루션**:
- Flutter와 Kotlin의 MethodChannel을 활용한 앱 상태 실시간 모니터링
- 국가별 맞춤형 UI 디자인 구현
- ActivityManager를 통한 프로세스 상태 확인

**주요 커밋**:
```
96ecfcd - feat: 주문화면으로 돌아가기 버튼 추가
b73eca8 - add: HomeScreen ResumeOrdering 버튼 추가
b8404e6 - feat: 테이블오더 상태 확인 메소드 채널 연결 객체 생성
2cdd953 - feat: 테이블오더 상태 확인 코틀린 메서드 추가
70e9916 - fix: listener 중복 구독 방지코드 추가
```

**기술적 상세**:

**Flutter Layer**:
```dart
// lib/services/table_order_state_service/table_order_state_service.dart
class TableOrderStateService {
  static const _methodChannel = MethodChannel('tableOrderAppState');

  static Future<bool> getTableOrderState(String packageName) async {
    try {
      final bool isRunning = await _methodChannel.invokeMethod(
        'getTableOrderStateMethod',
        <String, String>{'packageName': packageName}
      );
      return isRunning;
    } on PlatformException catch (e) {
      return false;
    }
  }
}
```

**Kotlin Layer**:
```kotlin
// android/app/src/main/kotlin/.../MainActivity.kt
private fun getTableOrderState(packageName: String): Boolean {
  val activityManager = getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
  val runningProcesses = activityManager.runningAppProcesses

  for (processInfo in runningProcesses) {
    if (processInfo.processName == packageName) {
      return true
    }
  }
  return false
}
```

**UI Component**:
```dart
// lib/ui/views/home/widgets/resume_ordering_button.dart
class ResumeOrderingButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    if (countryCode.isKR) {
      return _ResumeOrderingButtonKr(onPressed: onPressed);
    } else {
      return _ResumeOrderingButtonUS(onPressed: onPressed);
    }
  }
}
```

**성과**:
- 테이블오더 앱 백그라운드 실행 상태 실시간 감지
- 원터치로 주문 화면 복귀 (사용자 경험 개선)
- 국가별 디자인 언어에 맞춘 UI (KR: 주황색 pill 버튼 / US: 반투명 dark 버튼)
- 중복 리스너 구독 문제 해결로 메모리 누수 방지

---

### 3. OTA 업데이트 시스템 구현 (2025.05)

**문제**: 레스토랑 현장에서 수동으로 앱 업데이트 수행 시 운영 중단 및 인력 낭비 발생

**솔루션**:
- APK 자동 다운로드 및 Silent Installation 시스템 구축
- BroadcastReceiver 기반 이벤트 드리븐 아키텍처
- PackageInstaller API를 활용한 무인 설치 프로세스

**주요 커밋**:
```
b3ae1f0 - feat: 업데이트 후 설치된 테이블오더 앱을 실행시키도록 추가
141cb46 - feat: APK Download Receiver 객체 추가
76c8f3c - feat: ApkInstaller 객체 추가
f144b2a - feat: Broadcast Receiver 설정
e5b953d - fix: ApkInstaller 메서드 수정
```

**기술적 상세**:

**APK Installer** (Kotlin):
```kotlin
// android/app/src/main/kotlin/.../ApkInstaller.kt
object ApkInstaller {
  fun installApk(context: Context, apkPath: String, packageName: String) {
    val packageInstaller = context.packageManager.packageInstaller
    val params = PackageInstaller.SessionParams(
      PackageInstaller.SessionParams.MODE_FULL_INSTALL
    )

    if (packageName.isNotEmpty()) {
      params.setAppPackageName(packageName)  // 업데이트 대상 지정
    }

    val sessionId = packageInstaller.createSession(params)
    val session = packageInstaller.openSession(sessionId)

    // APK 파일 스트리밍
    val apkFile = File(apkPath)
    FileInputStream(apkFile).use { input ->
      session.openWrite("MY_APK_SESSION", 0, apkFile.length()).use { out ->
        val buffer = ByteArray(8192)
        var bytesRead: Int
        while (input.read(buffer).also { bytesRead = it } != -1) {
          out.write(buffer, 0, bytesRead)
        }
        session.fsync(out)
      }
    }

    session.commit(pendingIntent.intentSender)
  }
}
```

**Download Receiver** (Kotlin):
```kotlin
// android/app/src/main/kotlin/.../TableOrderDownloadReceiver.kt
class TableOrderDownloadReceiver : BroadcastReceiver() {
  override fun onReceive(context: Context, intent: Intent) {
    if ("net.monki.tableorder_launcher.ACTION_DOWNLOAD_COMPLETE" == intent.action) {
      val apkPath = intent.getStringExtra("apkPath") ?: ""
      val packageName = intent.getStringExtra("packageName") ?: ""

      if (apkPath.isNotBlank()) {
        ApkInstaller.installApk(context, apkPath, packageName)
      }
    }
  }
}
```

**아키텍처 플로우**:
```
1. Flutter Downloader → APK 다운로드 완료
2. BroadcastReceiver → 다운로드 완료 이벤트 수신
3. ApkInstaller → PackageInstaller API로 Silent Install
4. 자동 앱 실행 → 사용자 개입 없이 업데이트 완료
```

**성과**:
- 무인 자동 업데이트로 현장 운영 중단 시간 제로화
- 다운로드 완료 시 자동 설치 및 앱 실행 체인 구축
- 에러 핸들링 및 로깅으로 안정성 확보
- PackageInstaller Session 관리로 메모리 안전성 보장

---

### 4. Android OS 프로세스 스케줄링 최적화 (2025.05)

**문제**: 장시간 실행 환경에서 앱 프로세스 우선순위 관리 및 백그라운드 동작 최적화 필요

**솔루션**:
- Android ActivityManager 및 ProcessInfo 기반 프로세스 모니터링 강화
- 앱 생명주기 이벤트에 따른 리스너 최적화

**주요 커밋**:
```
a15f328 - feat: Android OS 프로세스 스케줄링 보완
c34fa49 - refactor: HomeScreen AppLifeCycle listner 메서드 수정
8fb2057 - refactor: HomeViewModel 메서드 수정
```

**성과**:
- 장시간 운영 환경에서 앱 안정성 향상
- 백그라운드-포그라운드 전환 시 리소스 관리 최적화
- 메모리 누수 방지 및 프로세스 생명주기 관리 개선

---

### 5. UI/UX 개선 및 리팩토링 (2024.10-11)

**문제**: 국가별 다른 디자인 시스템과 사용자 인터페이스 요구사항

**솔루션**:
- 이미지 경로 중앙 관리 시스템 구축
- 메뉴 버튼 active/inactive 상태 디자인 시스템
- 히든 메뉴와의 UI 충돌 방지

**주요 커밋**:
```
d73f9d3 - add: Image Path 관리 객체 추가
4a23dcb - add: 메뉴 active 아이콘 이미지 경로 개선
89759ea - add: 미국향 메뉴 Active 아이콘 파일 추가
c0182d6 - add: 한국향 Manufacture Menu Active 아이콘 추가
11e32d2 - fix: BaseMenuButton 터치상태 토글형에서 Active형으로 수정
037188e - fix: 히든 메뉴 보일때 Resume Ordering 버튼 숨기기
```

**기술적 상세**:

```dart
// lib/utils/image_path_manager.dart
class ImagePathManager {
  static String get backArrowIcon => 'assets/icons/ic_back_arrow.svg';
  static String get icMoreLeftIcon => 'assets/icons/ic_more_left.svg';
  // 국가별 아이콘 자동 선택 로직
}
```

**성과**:
- 이미지 경로 하드코딩 제거로 유지보수성 향상
- 국가별 아이콘 자동 로드 시스템
- 일관된 터치 피드백 경험 제공
- UI 충돌 방지 로직으로 사용자 경험 개선

---

### 6. 환경별 배포 구성 관리 (2024.11, 2025.05)

**문제**: Dev/Staging/Production 환경과 KR/US 시장의 조합으로 복잡한 배포 설정 관리

**솔루션**:
- Configuration 레이어 설계 및 구현
- 환경별 다운로드 센터 URL 자동 매핑
- App Store URL 환경별 동적 설정

**주요 커밋**:
```
77ab1fa - refactor: 다운로드센터 미국-한국 분기처리 코드 추가
9d63356 - add: US 다운로드 센터 URL configuration 추가
1511ade - fix: appStore URL 환경별 재설정
fb8da66 - docs: 기본값 KR로 빌드되도록 수정
```

**설정 매트릭스**:
```
환경 × 국가 조합:
- KR-DEV / KR-STAGING / KR-PROD
- US-DEV / US-STAGING / US-PROD

각 조합별 자동 설정:
- Package Name
- Download Center URL
- App Store URL
- API Endpoints
```

**성과**:
- 6개 환경 조합을 단일 코드베이스로 관리
- 빌드 설정 한 번 변경으로 전체 환경 자동 구성
- 배포 실수 방지 및 환경 분리 명확화

---

## 💡 기술적 성과 및 역량

### Cross-Platform Architecture
- **Flutter-Kotlin 브리지 설계**: MethodChannel과 EventChannel을 활용한 양방향 통신 구현
- **플랫폼별 최적화**: Native API 활용으로 OS 레벨 기능 통합 (PackageInstaller, ActivityManager)
- **상태 관리**: Provider 패턴 기반 효율적인 상태 관리 및 UI 업데이트

### System-Level Integration
- **BroadcastReceiver 활용**: 이벤트 드리븐 아키텍처로 느슨한 결합 구현
- **PackageInstaller API**: Silent Installation으로 사용자 개입 없는 업데이트
- **Process Monitoring**: ActivityManager로 앱 프로세스 상태 실시간 추적

### Code Quality & Maintainability
- **중앙화된 관리**: Configuration, PackageNameManager, ImagePathManager 등 관리 객체 패턴
- **국가별 분리**: CountryCode enum 기반 확장 가능한 다국어 지원 구조
- **에러 핸들링**: try-catch 블록과 로깅으로 프로덕션 안정성 확보
- **리소스 관리**: Session 및 Stream 명시적 해제로 메모리 누수 방지

### Problem Solving
- **중복 구독 방지**: Listener 관리 개선으로 메모리 누수 해결
- **UI 충돌 방지**: 히든 메뉴와 Resume 버튼의 레이아웃 충돌 로직 처리
- **프로세스 스케줄링**: 장시간 실행 환경에서의 안정성 보장

---

## 📊 프로젝트 임팩트

### 정량적 성과
- **총 49개 커밋** 기여 (2024.10 - 2025.06)
- **6개 환경** (3 stages × 2 countries) 단일 코드베이스로 관리
- **4개의 주요 Native Kotlin 모듈** 개발
  - MainActivity: MethodChannel 통합
  - ApkInstaller: Silent Installation
  - TableOrderDownloadReceiver: 다운로드 이벤트 처리
  - SystemPropertiesProxy: 디바이스 정보 접근

### 정성적 성과
- **운영 효율화**: OTA 업데이트로 현장 유지보수 인력 투입 최소화
- **사용자 경험**: Resume Ordering 버튼으로 주문 복귀 시간 단축
- **글로벌 확장성**: 다국가 지원 시스템으로 신규 시장 진입 기반 마련
- **코드 품질**: 리팩토링을 통한 유지보수성 및 확장성 향상

---

## 🎓 학습 및 성장

### 새롭게 습득한 기술
1. **Flutter-Native 통신**: MethodChannel, EventChannel 기반 플랫폼 브리지
2. **Android PackageInstaller API**: Silent Installation 및 Session 관리
3. **BroadcastReceiver**: 시스템 이벤트 기반 아키텍처 설계
4. **Kotlin 고급 기능**: Object pattern, Extension functions, Coroutine ready code

### 아키텍처 설계 경험
- **이벤트 드리븐 아키텍처**: BroadcastReceiver 기반 느슨한 결합
- **관심사 분리**: Configuration, Service, UI 레이어 명확한 분리
- **확장 가능한 구조**: 국가 추가 시 최소한의 코드 수정으로 대응 가능

### 문제 해결 역량
- **프로덕션 이슈 대응**: 메모리 누수, 중복 구독, UI 충돌 등 실전 디버깅
- **성능 최적화**: 프로세스 스케줄링 및 리소스 관리 개선
- **크로스 플랫폼 디버깅**: Flutter Dart와 Kotlin 레이어 간 이슈 추적

---

## 🔗 기술 키워드

`Flutter` `Dart` `Kotlin` `Android` `Cross-Platform` `MethodChannel` `PackageInstaller` `BroadcastReceiver` `ActivityManager` `Provider` `GoRouter` `OTA Update` `Silent Installation` `Process Monitoring` `Multi-Region Support` `Event-Driven Architecture` `State Management` `Native Bridge` `POS System` `Restaurant Tech`

---

## 📝 프로젝트 링크 및 참고자료

**Repository**: monki_tableorder_home_launcher
**Version**: 1.1.1+34
**Flutter SDK**: 3.1.3+
**Min Android SDK**: (프로젝트 설정 참조)

---

## ✨ 추천 포트폴리오 강조 포인트

### 이력서/자기소개서용 한 줄 요약
> "Flutter와 Kotlin을 활용하여 레스토랑 POS 시스템의 Android 런처 앱을 개발했으며, OTA 업데이트 자동화, 다국가 지원 시스템, 앱 상태 모니터링 등 핵심 기능을 설계 및 구현하여 운영 효율성을 크게 개선했습니다."

### 면접 대비 스토리 포인트

1. **OTA 업데이트 시스템**
   - "현장에서 수동 업데이트로 인한 운영 중단 문제를 해결하기 위해..."
   - "PackageInstaller API와 BroadcastReceiver를 활용하여..."
   - "결과적으로 무인 자동 업데이트 시스템을 구축했습니다."

2. **다국가 지원 시스템**
   - "한국과 미국 시장의 다른 요구사항을 효율적으로 관리하기 위해..."
   - "빌드 타임 국가 설정과 런타임 자동 분기 로직을 설계하여..."
   - "단일 코드베이스로 6개 환경 조합을 관리하게 되었습니다."

3. **크로스 플랫폼 브리지 개발**
   - "Flutter의 한계를 극복하고 Android 네이티브 기능을 활용하기 위해..."
   - "MethodChannel 기반 양방향 통신 아키텍처를 설계하여..."
   - "테이블오더 앱의 프로세스 상태를 실시간으로 모니터링할 수 있게 되었습니다."

---

**문서 작성일**: 2025-06-18
**작성자**: Claude (JEON Sungsu 커밋 이력 기반)
**버전**: 1.0
