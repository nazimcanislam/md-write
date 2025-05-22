const isDev: boolean = process.env.NODE_ENV === 'development';

const withPWA = require("next-pwa")({
  dest: "public",
  disable: isDev,
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  reactStrictMode: true,
});
