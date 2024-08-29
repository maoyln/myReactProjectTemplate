const CracoAntDesignPlugin = require('craco-antd');

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('postcss-preset-env')({
          stage: 0,
        }),
      ],
    },
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@primary-color': '#00aaff', // 天蓝色主题
        },
      },
    },
  ],
};