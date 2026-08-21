# Clinical Reasoning Growth Portfolio

물리치료과 학생의 임상추론 성장 포트폴리오 웹사이트입니다. Markdown 파일로
Case / Study / Growth Log를 계속 추가하고, 웹사이트 코드는 거의 건드리지
않도록 만들어졌습니다.

## 시작하기

```bash
npm install
npm run dev
```

`http://localhost:3000` 에서 확인할 수 있습니다.

## 새 콘텐츠 추가하기

[CONTENT_GUIDE.md](./CONTENT_GUIDE.md)를 참고하세요. Case, Study Note,
Growth Log를 추가하는 방법이 정리되어 있습니다.

## 배포 (선택)

```bash
npm run build
```

`out/` 폴더에 정적 사이트가 생성됩니다. Vercel, GitHub Pages, Netlify 등에
올리면 무료로 배포할 수 있습니다. 지금 배포가 필요 없다면 `npm run dev`로
로컬에서만 사용해도 됩니다.
