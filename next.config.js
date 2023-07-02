/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions:true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdnb.20m.es'
            },
            {
                protocol: 'https',
                hostname: 'tailus.io'
            }
        ]
    }
}

module.exports = nextConfig
