/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/assets/3d/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'model/gltf-binary',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/dating',
        destination: 'https://t.mbsrv2.com/254877/3785/0?source=dexvolkov&bo=2753,2754,2755,2756&target=videouploads&po=6456&aff_sub5=SF_006OG000004lmDN',
        permanent: false,
      },
      {
        source: '/deals',
        destination: 'https://arbvault.io?aff=dexv',
        permanent: false,
      },
      {
        source: '/camriches',
        destination: 'https://camriches.ai?aff=dexv',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
