/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },

  async rewrites() {
    return [
      {
        // api 요청
        source: "/api/:path*",
        // 실제 도달하는 api end point
        destination: "http://43.200.244.35/api/:path*",
      },
      {
        // api 요청
        source: "/data/:path*",
        // 실제 도달하는 api end point
        destination: "http://43.200.244.35/data/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
