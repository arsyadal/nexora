/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org"
      }
    ]
  },
  experimental: {
    optimizePackageImports: ["gsap", "@react-three/fiber", "@react-three/drei"]
  }
};

export default nextConfig;
