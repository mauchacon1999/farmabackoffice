import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "seped.drogueriaintercontinental.net",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "www.dronena.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mav.farmaciasaas.com",
        pathname: "/**",
      },
    ],
  },
  env: {
    apiUrl: process.env.API_URL,
    proxy: process.env.PROXY,
  },
  /**
   * Redirect for proxy's.
   *
   * @returns Values rewrites.
   */
  async rewrites() {
    return [
      {
        source: `/${process.env.PROXY}/:path*`,
        destination: `${process.env.API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
