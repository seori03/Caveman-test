const isGithubActions = process.env.GITHUB_ACTIONS === "true";
// GitHub Pages에서 https://<user>.github.io/<repo>/ 경로로 서빙되므로
// CI 빌드에서만 basePath를 붙입니다. 로컬 npm run dev/build에는 영향 없음.
const repoName = "Caveman-test";
const basePath = isGithubActions ? `/${repoName}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
};

module.exports = nextConfig;
