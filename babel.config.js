module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
          alias: {
            '@assets': './src/assets',
            '@atoms': './src/components/atoms',
            '@constants': './src/constants',
            '@navigations': './src/components/navigations',
            '@molecules': './src/components/molecules',
            '@screens': './src/screens',
            '@store': './src/store',
            '@styled': './src/components/styled',
            '@styles': './src/styles',
          },
        },
      ],
    ],
  }
}
