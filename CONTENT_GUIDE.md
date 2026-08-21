# 콘텐츠 추가/수정 가이드

이 사이트는 **Markdown 파일만 추가하면 자동으로 사이트에 반영**되도록
만들어져 있습니다. 코드를 건드릴 필요는 거의 없습니다.

## 폴더 구조

```
content/
  cases/         Portfolio에 나오는 Case (Clinical / Wellness / Sports)
  study/         Study & Research 노트
  growth-log/    Growth Log 기록
  pages/         Home / About / Philosophy / Clinical Reasoning 등 고정 페이지
```

각 폴더에는 `_template.md`라는 템플릿 파일이 있습니다. 새 글은 **이 템플릿을
복사해서 새 파일명으로 저장**한 뒤 내용을 채우면 됩니다.

## 1. 새 Case 추가하기 (Portfolio)

1. `content/cases/_template.md`를 복사합니다.
2. 파일명을 `날짜-내용.md` 형식으로 바꿉니다.
   예: `2026-09-01-acl-return-to-sport.md`
3. 파일 맨 위 `---` 사이의 정보(frontmatter)를 채웁니다.
   - `category`: `Clinical`, `Wellness`, `Sports` 중 하나
   - `tags`: 자유롭게 추가 가능 (예: `[Stroke, Gait]`)
   - `draft: true`가 있으면 사이트에 보이지 않습니다. 공개할 준비가 되면
     이 줄을 지우거나 `false`로 바꾸세요.
4. 아래 섹션(Subjective, Objective, Assessment, Clinical Reasoning,
   Intervention, Re-assessment, Reflection, Evidence)은 **해당 Case에서
   의미 있는 항목만 채우면 됩니다.** 필요 없는 줄은 지워도 됩니다.
5. 저장하면 끝입니다. Portfolio 목록, 필터(Category/Age Group/Tag), 검색에
   자동으로 반영됩니다.

## 2. 새 Study Note 추가하기

`content/study/_template.md`를 복사해서 같은 방식으로 채웁니다.

## 3. 새 Growth Log 추가하기

`content/growth-log/_template.md`를 복사해서 같은 방식으로 채웁니다.
`year` 값을 기준으로 타임라인에 묶여서 보여집니다.

## 4. 새 Category 추가하기 (예: 나중에 4번째 대상자 분류가 필요할 때)

`lib/config.ts` 파일의 `CATEGORIES` 배열에 이름을 추가하고,
`CATEGORY_DESCRIPTIONS`, `CATEGORY_COLORS`에도 짝을 맞춰 추가하면 됩니다.
Tag는 frontmatter에 자유롭게 적으면 되므로 코드 수정이 필요 없습니다.

## 5. 로컬에서 확인하기

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속.

## 6. 정적 사이트로 빌드하기 (필요할 때만)

```bash
npm run build
```

`out/` 폴더에 정적 HTML 파일이 생성됩니다. 이 폴더를 GitHub Pages, Vercel,
Netlify 등 무료 호스팅에 올리면 실제 웹사이트로 배포할 수 있습니다. 지금
당장 배포가 필요 없다면 `npm run dev`로 로컬에서만 사용해도 충분합니다.

## 주의사항

- `_template.md` 파일은 실제 글이 아니라 템플릿이므로 목록에 나타나지
  않습니다 (`draft: true` 처리됨). 삭제하지 마세요 — 계속 복사해서
  사용합니다.
- 파일명은 영문/숫자/하이픈(-)으로 만드는 것을 권장합니다 (URL 주소가 됨).
- frontmatter의 들여쓰기와 `---` 구분선은 그대로 유지해야 합니다.
