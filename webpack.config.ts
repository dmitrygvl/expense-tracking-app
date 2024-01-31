import 'webpack-dev-server';
import * as webpack from 'webpack';
import { resolve } from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import pkg from './package.json';

type Mode = 'none' | 'production' | 'development' | undefined;

const NODE_ENV: Mode = process.env.NODE_ENV as Mode;

const PREFIX = NODE_ENV === 'production' ? `/${pkg.name}` : '';

const config: webpack.Configuration = {
  entry: { index: resolve(__dirname, './src/index.tsx') },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    clean: true,
    environment: {
      arrowFunction: false,
    },
    publicPath: NODE_ENV === 'production' ? `/${pkg.name}/` : '/',
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
    new webpack.DefinePlugin({
      PREFIX: JSON.stringify(PREFIX),
    }),
    new MiniCssExtractPlugin(),
    new FaviconsWebpackPlugin('src/assets/img/favicon.png'),
  ],
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  devServer: {
    compress: true,
    port: 4000,
    watchFiles: ['index.html'],
    historyApiFallback: true,
  },
};

export default config;
