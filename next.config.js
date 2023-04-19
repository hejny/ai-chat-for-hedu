const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n,
    reactStrictMode: true,
    // Note: [🎁] Use if using docker in future> output: 'standalone',
    experimental: {
        appDir: true,
    },
    images: {
        /*
        remotePatterns: [
            {
                // [🧑]
                protocol: 'https',
                hostname: 'www.gravatar.com',
                port: '',
                pathname: '/avatar/**',
            },
        ],
        */
    },

    /*
    TODO: [🎋]
    api: {
        bodyParser: {
            sizeLimit: '5mb',
        },
    },
    */
};

module.exports = nextConfig;
