/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["typeorm"],
  },
  webpack(config) {
    config.module.rules.push({
      include: /src/,
    });
    return config;
  },
};

export default nextConfig;
