/** @type {import('next').NextConfig} */
console.log(process.env)

const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  // webpack: (config) => {
  //   config.resolve.fallback = { 
  //     fs: false,
  //     path: false,
  //     os: false
  //   }
  //   return config;
  // }
}

const { withExpo } = require('@expo/next-adapter')
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')([
  'solito',
  'dripsy',
  '@dripsy/core',
  'moti',
  '@motify/core',
  '@motify/components',
  'app',
])

module.exports = withPlugins(
  [withTM, [withExpo, { projectRoot: __dirname }]],
  nextConfig
)
