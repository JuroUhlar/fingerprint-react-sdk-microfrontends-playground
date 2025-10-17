const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const { EnvironmentPlugin } = require('webpack');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '.env') });

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
    clean: true,
    uniqueName: 'host',
  },
  devServer: {
    port: 3000,
    static: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        appOne: 'appOne@http://localhost:3001/remoteEntry.js',
        appTwo: 'appTwo@http://localhost:3002/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: false },
        'react-dom': { singleton: true, eager: true, requiredVersion: false },
        '@fingerprintjs/fingerprintjs-pro-react': { singleton: true, eager: true, requiredVersion: false },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new EnvironmentPlugin({
      FPJS_PUBLIC_API_KEY: 'your-public-api-key',
      FPJS_REGION: 'us',
    }),
  ],
};
