/** @type {import('next').NextConfig} */

const allowedUrls = ['plus.unsplash.com', 'images.unsplash.com']

const nextConfig = {
  images: {
    remotePatterns: allowedUrls?.map((url) => ({
      protocol: 'https',
      hostname: url,
    })),
  },
}

export default nextConfig
