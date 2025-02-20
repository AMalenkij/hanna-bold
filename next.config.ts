const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Полное отключение оптимизации Next.js
    domains: ["res.cloudinary.com"], // Разрешаем загрузку с Cloudinary
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "14mb",
    },
  },
};

module.exports = withNextIntl(nextConfig);
