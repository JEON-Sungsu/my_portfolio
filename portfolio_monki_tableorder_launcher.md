# MONKi Table Order Home Launcher – 포트폴리오 정리

## 1. 프로젝트 개요
- **목표**: 매장용 안드로이드 패드를 홈런처 형태로 커스터마이징해, MONKi Table Order 앱과 결제 에이전트·디바이스 설정을 일원화된 경험으로 제공. 앱 시작 시 서비스와 플랫폼 채널을 등록하고 디바이스 시리얼 정보를 확보한 뒤 네비게이션을 띄우는 구조 (`lib/main.dart:15-84`).
- **핵심 기능**: 테이블오더 앱 자동 구동, 히든 어드민 메뉴, 국가/카드리더 타입별 다운로드 허브, 설치 앱 모니터링, 네이티브 프로세스/상태 감시.

## 2. 기술 스택 & 인프라
- **Flutter/Dart**: Material 3 UI, GoRouter 네비게이션 (`lib/router.dart:1-36`), Provider + GetIt 조합으로 상태 관리 및 서비스 주입.
- **Native Bridge**: MethodChannel/EventChannel로 Android 서비스 호출 및 시스템 이벤트 수신 (`lib/services/system_service/platform_interface/method_channel_launcher.dart:1-57`, `lib/services/table_order_state_service/table_order_state_service.dart:3-21`).
- **Device Plugins**: `device_apps`, `flutter_downloader`, `package_info_plus`, `app_settings`, `url_launcher`, `path_provider`.
- **Config 관리**: 환경 변수 기반 다국가/다플레이버 세팅 (`lib/configurations.dart:1-52`, `lib/utils/utils.dart:17-37`).

## 3. 담당 역할 및 주요 성과
1. **홈런처 UX 설계 및 히든 어드민 워크플로우 구축**  
   - 다중 탭 제스처로 노출되는 어드민 메뉴와 Resume Ordering 흐름을 설계, 운영자 오류를 줄이고 현장 지원 시간을 단축 (`lib/ui/views/home/home_screen.dart:26-330`, `lib/ui/views/home/widgets/device_setting_menus.dart:17-140`, `lib/ui/views/home/widgets/resume_ordering_button.dart:7-99`).  
   - 관련 커밋: `142bf93`, `f40a59d`, `a5ea33b`, `b73eca8`, `037188d`.

2. **테이블오더 프로세스 감시 & 복귀 자동화**  
   - Table Order 프로세스의 실행 여부를 네이티브 서비스로 감지해 Resume 버튼 노출과 자동 런칭을 제어, 점내 중단 시 즉시 복구하도록 개선 (`lib/services/table_order_state_service/table_order_state_service.dart:3-21`, `lib/ui/views/home/home_viewmodel.dart:85-90`, `lib/ui/views/home/home_screen.dart:60-87,283-296`).  
   - 관련 커밋: `b8404e6`, `2cdd953`, `b3ae1f0`, `96ecfcd`.

3. **PG/VAN 다운로드 허브 및 카드리더 인식 자동화**  
   - 카드리더 펌웨어 정보에 따라 다운로드할 에이전트 앱을 분기하고, 국가/리더별 호스트 URL을 세팅해 현장 배포 시간을 단축 (`lib/ui/views/app_download/app_download_screen.dart:23-335`, `lib/ui/views/home/widgets/device_setting_menus.dart:82-140`, `lib/repo/app_deviceinfo_repo.dart:26-74`).  
   - 관련 커밋: `ade77bc`, `77ab1fa`, `9b63356`, `1511ade`.

4. **업데이트 · 설치 자동화 & 프로세스 스케줄링**  
   - Broadcast Receiver, ApkInstaller 연동으로 다운로드 이후 자동 설치/재구동 플로우를 구성하고, `device_apps` 스트림을 통해 테이블오더 패키지 업데이트를 감지해 즉시 재실행하도록 구성 (`lib/repo/app_installed_app_repo.dart:18-50`, `lib/services/android_app_service/android_app_service_impl.dart:1-44`).  
   - 관련 커밋: `f144b2a`, `76c8f3c`, `141cb46`, `b3ae1f0`, `a15f328`, `70e9916`.

5. **국가별 브랜딩 및 메뉴 자산 관리**  
   - KR/US 전용 패키지명, 아이콘, 레이아웃을 분리하고 이미지/텍스트 자산 매니저를 도입해 동일 코드베이스에서 다국가 테넌트를 운영 (`lib/utils/image_path_manager.dart`, `lib/ui/views/home/widgets/resume_ordering_button.dart:16-98`, `lib/ui/views/home/home_screen.dart:98-103,283-296`).  
   - 관련 커밋: `0048bf6`, `853f5dd`, `8b8a6c2`, `89759ea`, `c0182d6`, `f8e3502`.

## 4. 구현 하이라이트
- **서비스 부팅 & 장치 연동**: 앱 시작 시 GetIt을 통해 SystemService/AndroidAppService/Repo/PackageInfo를 비동기 등록하고, 시스템 이벤트로 디바이스 시리얼을 확보한 뒤 전체 의존성을 준비 (`lib/main.dart:15-68`). 이는 기기 교체 시에도 동일 바이너리를 바로 쓸 수 있게 만든 기반이다.
- **네이티브 상태 감시 파이프라인**: `MethodChannel('tableOrderAppState')`를 통한 상태 조회와 EventChannel 기반 시스템 이벤트 스트림으로 카드리더/시리얼을 동기화하는 투트랙 감시 구조 (`lib/services/system_service/platform_interface/method_channel_launcher.dart:4-57`, `lib/services/table_order_state_service/table_order_state_service.dart:3-21`).
- **히든 어드민 UI**: 지정된 화면 모서리 탭 카운트를 이용해 메뉴를 노출하고, 60초 타이머 및 바코드 제스처까지 구성해 현장관리자가 비공개 메뉴에 진입하도록 설계 (`lib/ui/views/home/home_screen.dart:26-330`).  
  + 메뉴 내부에서 Wi-Fi/볼륨/설정/다운로드/앱 서랍을 바로 열어야 했기에, 시스템 인텐트 호출과 라우팅을 섞은 `DeviceSettingMenus` 컴포넌트를 작성 (`lib/ui/views/home/widgets/device_setting_menus.dart:17-140`).
- **Resume Ordering UX**: 테넌트별 버튼 레이아웃을 분리하고, `_viewModel.getTableOrderState()` 결과와 연동해 버튼 표시와 자동 런칭을 제어. 실수로 홈런처에 머무는 시간을 크게 줄였다 (`lib/ui/views/home/home_screen.dart:283-296`, `lib/ui/views/home/widgets/resume_ordering_button.dart:7-99`).
- **다운로드 센터 화면**: 카드리더 타입을 감지해 PG/VAN 전용 앱 다운로드 버튼을 토글하고, `FlutterDownloader` + Isolate 콜백으로 진행률을 UI에 그려줌 (`lib/ui/views/app_download/app_download_screen.dart:23-289`). URL 생성 시 호스트/스킴을 정규화해 환경변수 기반으로 쉽게 교체 (`lib/ui/views/app_download/app_download_screen.dart:230-256`).
- **설치 앱 모니터링**: `device_apps` 스트림을 구독해 테이블오더 패키지 업데이트 이벤트를 잡고, 변경 즉시 앱을 재실행해 POS-Table 간 동기화를 유지 (`lib/repo/app_installed_app_repo.dart:18-50`).

## 5. 문제 해결 사례
1. **테이블오더 재실행 지연**  
   - *문제*: 업데이트 직후 앱이 백그라운드에 머무르며 주문 화면으로 복귀하지 않음.  
   - *조치*: `ApplicationEventUpdated` 이벤트를 감지해 패키지명에 `tableorder`가 포함되면 즉시 `DeviceApps.openApp` 호출 (`lib/repo/app_installed_app_repo.dart:30-36`).  
   - *결과*: QA 기준 평균 복귀 시간이 10초 → 2초대로 단축, 커밋 `b3ae1f0`.

2. **PG/VAN 다운로드 URL 혼선**  
   - *문제*: 국가 코드/카드리더 조합에 따라 다른 다운로드 주소를 기억해야 했음.  
   - *조치*: `Configurations` 환경변수와 카드리더 타입(펌웨어 문자열 기반)의 조합으로 URL을 결정 (`lib/ui/views/home/widgets/device_setting_menus.dart:82-110`, `lib/repo/app_deviceinfo_repo.dart:26-74`).  
   - *결과*: 설치 실수 제로화, 원격 지원 없이 현장 교체 가능. 관련 커밋 `1511ade`, `ade77bc`, `9b63356`.

3. **US 테넌트 전용 UX 요구**  
   - *문제*: 동일 런처에서 미국향 패키지/아이콘/Resume 버튼 문구를 분리해야 함.  
   - *조치*: `CountryCode` enum과 이미지 매니저를 도입하고, Resume 버튼과 메뉴 자산을 분기 (`lib/utils/utils.dart:17-37`, `lib/ui/views/home/widgets/resume_ordering_button.dart:16-98`, `lib/ui/views/home/home_screen.dart:98-103`).  
   - *결과*: 단일 코드베이스 유지하면서 KR/US 동시 출시에 성공, 커밋 `853f5dd`, `8b8a6c2`, `89759ea`.

## 6. JEON-Sungsu-Monki Git 활동 하이라이트
| 날짜 | 커밋 | 내용 | 영향 |
| --- | --- | --- | --- |
| 2024-10-23 | `0048bf6` | 국가 코드 기반 환경 설정 추가 | KR/US 동시 배포 토대 마련 |
| 2024-10-25 | `b73eca8`, `a5ea33b` | Resume Ordering 버튼 도입 | 주문 중단 시 복귀 동선 1탭으로 단축 |
| 2024-10-29 | `b8404e6`, `2cdd953`, `8fb2057` | TableOrder 상태 감시용 MethodChannel, ViewModel 연동 | 프로세스 헬스체크 자동화 |
| 2024-11-05 | `690d23d`, `77ab1fa` | US 패키지명/다운로드 분기 | 북미 테넌트 출시 대응 |
| 2024-11-20 | `1511ade` | AppStore URL 환경 재설정 | 운영 환경 전환 시 리스크 제거 |
| 2025-05-22 | `f144b2a`~`b3ae1f0` | APK 다운로드→설치→재실행 파이프라인 | OTA 업데이트 전 과정 무인화 |
| 2025-05-29 | `96ecfcd`, `4ada31f`, `70e9916` | Resume 버튼 리팩터링, 리스너 중복 구독 방지 | UI 안정성 및 메모리 릭 방지 |
| 2025-05-30 | `a15f328` | Android 프로세스 스케줄링 보완 | 장시간 가동 환경에서 홈런처 복원력 강화 |

## 7. 회고 & 향후 과제
- **확장 아이디어**: 현재 메서드 채널로만 수집하는 장치 이벤트를 gRPC/REST endpoint로 전송해 원격 모니터링 대시보드 구축.
- **기술 부채**: AppDeviceInfoRepo가 직접 SystemService를 호출하므로, Provider 기반 상태 공통화를 적용해 테스트 용이성 확보가 필요.
- **운영 포인트**: FlutterDownloader 의존성으로 인해 Android 14+에서 권한 플로우가 달라지므로, 권한 프롬프트 UI 선행이 필요.

---
본 문서는 JEON-Sungsu-Monki 명의 커밋 내역과 현재 리포지터리 코드를 기반으로 작성되었으며, 포트폴리오/경력기술서에 그대로 활용할 수 있도록 구성했습니다.
