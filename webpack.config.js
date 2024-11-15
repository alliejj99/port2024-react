const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // .js, .jsx 파일 처리
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              process.env.NODE_ENV === 'development' && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.s[ac]ss$/i, // .scss나 .sass 파일 처리
        use: [
          'style-loader', // JS에서 CSS를 DOM에 추가
          'css-loader', // CSS 파일 읽기
          'sass-loader', // SCSS를 CSS로 컴파일
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // 확장자 생략 가능
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './dist/index.html',
    }),
    process.env.NODE_ENV === 'development' && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
    hot: true, // HMR 활성화
  },
};
