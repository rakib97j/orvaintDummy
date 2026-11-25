/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: 'export',
  distDir: 'dist',
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
