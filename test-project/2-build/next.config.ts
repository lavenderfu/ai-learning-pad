import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  eslint: {
    // 强制忽略所有 ESLint 报错，直接通过打包
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 强制忽略所有的 Typescript 类型报错，直接通过打包
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
