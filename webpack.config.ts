// import 'webpack-dev-server';
// import * as webpack from 'webpack';
// import { resolve } from 'node:path';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

// type Mode = 'none' | 'production' | 'development' | undefined;

// const NODE_ENV: Mode = process.env.NODE_ENV as Mode;

// // Добавим require.resolve для полифила
// const cryptoPolyfill = require.resolve("crypto-browserify");

// const config: webpack.Configuration = {
//   entry: { index: resolve(__dirname, './src/index.tsx') },
//   resolve: {
//     extensions: ['.js', '.ts', '.jsx', '.tsx'],
//   },
//   output: {
//     path: resolve(__dirname, 'dist'),
//     filename: '[name].[hash].js',
//     clean: true,
//     environment: {
//       arrowFunction: false,
//     },
//     publicPath: NODE_ENV === 'production' ? '/expense-tracking-app/' : '/',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(t|j)sx?$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//         },
//       },
//       {
//         test: /\.css$/i,
//         exclude: /node_modules/,
//         use: [MiniCssExtractPlugin.loader, 'css-loader'],
//       },
//       {
//         test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
//         type: 'asset/resource',
//         generator: {
//           filename: 'images/[name][ext]',
//         },
//       },
//       {
//         // Добавим правило для полифила
//         test: /\.m?js/,
//         resolve: {
//           fullySpecified: false,
//         },
//         use: {
//           loader: 'babel-loader',
//           options: {
//             plugins: [cryptoPolyfill], // Подключение полифила
//           },
//         },
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: 'index.html',
//     }),
//     new HtmlWebpackPlugin({
//       template: 'index.html',
//       filename: '404.html',
//     }),
//     new MiniCssExtractPlugin(),
//   ],
//   optimization: {
//         minimizer: [`...`, new CssMinimizerPlugin()],
//   },
//   devServer: {
//     compress: true,
//     port: 9000,
//     watchFiles: ['index.html'],
//     historyApiFallback: true,
//   },
// };

// export default config;

import 'webpack-dev-server';
import * as webpack from 'webpack';
import { resolve } from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import 'dotenv/config';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

type Mode = 'none' | 'production' | 'development' | undefined;

const NODE_ENV: Mode = process.env.NODE_ENV as Mode;

// const PREFIX = NODE_ENV === "production" ? "/expense-tracking-app" : "";

const config: webpack.Configuration = {
  entry: { index: resolve(__dirname, './src/index.tsx') },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    fallback: {
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
    },
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    clean: true,
    environment: {
      arrowFunction: false,
    },
    publicPath: NODE_ENV === 'production' ? '/expense-tracking-app/' : '/',
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: '404.html',
    }),
    // new webpack.DefinePlugin({
    //   PRODUCTION: NODE_ENV === "production",
    //   PREFIX: JSON.stringify(PREFIX),
    // }),
    new MiniCssExtractPlugin(),
    new NodePolyfillPlugin(),
  ],
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  devServer: {
    compress: true,
    port: 9000,
    watchFiles: ['index.html'],
    historyApiFallback: true,
  },
};

export default config;
