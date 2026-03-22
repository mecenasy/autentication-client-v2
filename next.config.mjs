import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [process.env.NEXT_PUBLIC_HOST_URL],
  rewrites: () => {
    return [{
      source: '/api/:path*',
      destination: `${process.env.NEXT_PUBLIC_API_HOST_URL}/:path*`,
    }]
  }
};

export default withNextIntl(nextConfig);
