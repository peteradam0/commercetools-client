import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['pages', 'utils'],
  },
  transpilePackages: ['@commercetools-uikit', '@commercetools-frontend'],
  compiler: {
    styledComponents: true,
  },
}

export default nextConfig
