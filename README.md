### 1. 프로젝트 초기화
```bash
npm init -y
```
이 명령은 package.json 파일을 생성합니다.

### 2. React 및 ReactDOM 설치
React와 ReactDOM을 설치합니다.

```bash
npm install react react-dom
```

### 3. Webpack과 Babel 설치
Webpack, Babel 및 관련 패키지를 설치합니다.

```bash
npm install --save-dev webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react html-webpack-plugin
```

### 4. 프로젝트 구조 설정
프로젝트 폴더를 다음과 같이 구성합니다:

```arduino
my-react-app/
│
├── src/
│   ├── index.jsx  // 엔트리 파일
│   ├── App.jsx    // React 컴포넌트
│
├── dist/          // 빌드 결과물이 저장되는 폴더
│   └── index.html
│
├── package.json
├── webpack.config.js
└── .babelrc
```

### 5. Webpack 설정
webpack.config.js 파일을 생성하고 다음 내용을 추가합니다:

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // 확장자 생략 가능
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './dist/index.html', // HTML 템플릿 경로
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
  },
};
```

### 6. Babel 설정
.babelrc 파일을 생성하고 다음 내용을 추가합니다:

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

### 7. React 코드 작성
src/index.jsx
```javascript
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
src/App.jsx
```

```javascript
import React from 'react';

const App = () => {
  return <h1>Hello, React without CRA!</h1>;
};

export default App;
dist/index.html
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>React without CRA</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

### 8. 스크립트 추가
package.json의 scripts 섹션에 다음 명령어를 추가합니다:

```json
"scripts": {
  "start": "webpack serve --mode development",
  "build": "webpack --mode production"
}
```

### 9. 개발 서버 실행
```bash
npm run start
```
브라우저에서 http://localhost:8080을 열면 React 애플리케이션이 실행됩니다.