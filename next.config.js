/** @type {import('next').NextConfig} */
const nextConfig = {
  // --- Изображения ---
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cinemaguide.skillbox.cc',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
    ],
    qualities: [75, 80, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 дней
    unoptimized: false,
    formats: ['image/webp'],
  },

  // --- Экспериментальные фичи ---
  experimental: {
    optimizeCss: true,
    largePageDataBytes: 128 * 1024,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // --- Отключаем заголовок powered by ---
  poweredByHeader: false,

  // --- Без trailing slash ---
  trailingSlash: false,

  // --- Заголовки: улучшаем кеширование ---
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Cache-Control',
            value: process.env.NODE_ENV === 'production'
              ? 'public, max-age=31536000, immutable'
              : 'no-cache',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, immutable',
          },
        ],
      },
    ];
  },
  
  productionBrowserSourceMaps: false,

  // --- Dev-индикаторы ---
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
};

export default nextConfig;