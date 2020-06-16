module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            '@api': './src/api',
            '@assets': './src/assets',
            '@atoms': './src/components/atoms',
            '@constants': './src/constants',
            '@molecules': './src/components/molecules',
            '@navigations': './src/components/navigations',
            '@organisms': './src/components/organisms',
            '@screens': './src/screens',
            '@src': './src',
            '@store': './src/store',
            '@styled': './src/components/styled',
            '@styles': './src/styles',
            '@utils': './src/utils',
          },
        },
      ],
    ],
  }
}
