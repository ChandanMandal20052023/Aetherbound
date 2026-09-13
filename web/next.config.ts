import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'localhost:3000',
    '127.0.0.1:3000',
    '172.22.192.1:3000',
    '172.22.192.1',
    '*.local',
  ],
};

export default nextConfig;
