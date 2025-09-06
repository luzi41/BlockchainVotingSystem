/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: "/home/louis/Projekte/BlockchainVotingSystem/election-system/nextFE/bvs",
  },
  reactStrictMode: true,
  //swcMinify: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  output: 'export',
  distDir: 'out',
  // Für externe API Calls (Blockchain) benötigst du keine CSP Einschränkungen
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none'
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig