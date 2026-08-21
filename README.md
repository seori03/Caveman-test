# Caveman-test

## 서동주 케이스로그 — 임상 성장 플랫폼

기존 취업용 포트폴리오(`claude/physical-therapist-portfolio-wlwzdf` 브랜치)와는 별도로 만든,
병원 임상 케이스와 승마장 라이더 케이스를 SOAP 형식으로 기록하는 개인 성장 플랫폼입니다.
같은 Pretendard 기반 디자인 언어를 이어받되, 병원 트랙은 세이지 그린, 승마장 트랙은
테라코타 컬러로 구분됩니다.

### 페이지 구성

- `index.html` — 플랫폼 소개 + 최근 케이스 + 방법론
- `cases.html` — 케이스 라이브러리 (트랙 × 영역 이중 필터)
- `cases/hospital-cervical-01.html` — 병원 케이스 SOAP 예시
- `cases/equestrian-core-01.html` — 승마장 케이스 SOAP 예시
- `cases/case-template.html` — 새 케이스 작성용 복사 템플릿 (사용법은 파일 내 안내 상자 참고)
- `timeline.html` — 성장 타임라인 (당시 판단 vs 지금의 관점)
- `about.html` — 플랫폼 취지 및 기록 원칙

### 새 케이스 추가하는 법

1. `cases/case-template.html`을 `cases/` 폴더 안에 새 이름으로 복사
2. 승마장 케이스라면 `<body>`와 `.case-hero`에 `track-equestrian` 클래스 추가
3. `fill-me`로 표시된 부분과 S·O·A·P·결과 내용을 채우기
4. `cases.html`에 케이스 카드 추가, 의미 있는 변화라면 `timeline.html`에도 항목 추가
