import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['pages', 'utils'],
  },
  transpilePackages: ['@commercetools-uikit', '@commercetools-frontend'],
}

export default nextConfig
