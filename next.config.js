/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    authInterrupts: true,
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons", "chart.js"],
  },
};

// Add bundle analyzer
const withBundleAnalyzer =
  process.env.ANALYZE === "true"
    ? require("@next/bundle-analyzer")({ enabled: true })
    : (config) => config;

module.exports = withBundleAnalyzer(nextConfig);
