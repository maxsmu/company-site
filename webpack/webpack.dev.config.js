/**
 * @Author: Micheal
 * @Date: 2017-04-10 22:30:27
 * @Last Modified by: Micheal
 * @Last Modified time: 2017-04-11 00:04:16
 * @GitHub: https://github.com/maxsmu
*/
// webpack
const webpack = require('webpack');
// path
const path = require('path');

// create html （创建html文件）
const HtmlWebpackPlugin = require('html-webpack-plugin');

// extract css 提取css文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// eslint-friendly-formatter
const eslintFriendlyFormatter = require('eslint-friendly-formatter');

// CopyWebpackPlugin 拷贝资源
const CopyWebpackPlugin = require('copy-webpack-plugin');

// autoprefixer
const autoprefixer = require('autoprefixer');

// precss
const precss = require('precss');

module.exports = {
  devtool: 'source-map',// cheap-module-eval-source-map
  context: path.join(__dirname, 'src'),// 打包目录上下文
  entry: {
    site: './app/app.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    hot: true
  },
  resolve: {
    extensions: ['.js', '.scss']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.css$/,
      options: {
        context: path.join(__dirname, 'src'),
        postcss: () => [precss, autoprefixer({ browsers: ['Chrome > 35', 'Firefox > 30', 'Safari > 7'] })]
      }
    }),
    new CopyWebpackPlugin([
      {
        from: __dirname + '/src/assets/images/static',
        to: __dirname + '/build/assets/images/static'
      }
    ]),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './build/index.html',
      inject: false
    }),
    new ExtractTextPlugin({ filename: '[name].css' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    rules: [
      // eslint config
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader',
        options: {
          configFile: '.eslintrc',
          emitWarning: true,
          emitError: true,
          formatter: eslintFriendlyFormatter
        }
      },
      // babel cnfid
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      // html config
      {
        test: /\.tpl\.html$/,
        use: [{
          loader: 'html-loader',
          query: { interpolate: true }
        }],
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.url\.html$/,
        use: [{
          loader: 'file-loader',
          query: {
            name: '[path][name]-[hash:8].[ext]'
          }
        }],
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(sc|c)ss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            query: {
              hash: 'sha512',
              digest: 'hex',
              name: '[hash:8].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            query: {
              bypassOnDebug: true,
              optimizationLevel: 7,
              interlaced: false
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2)(\?t=\d+)?$/,
        use: [{
          loader: 'url-loader',
          query: {
            limit: 10000,
            mimetype: 'application/font-woff',
            prefix: 'fonts'
          }
        }]
      },
      {
        test: /\.ttf(\?t=\d+)?$/,
        use: [{
          loader: 'url-loader',
          query: {
            limit: 10000,
            mimetype: 'application/octet-stream',
            prefix: 'fonts'
          }
        }]
      },
      {
        test: /\.eot(\?t=\d+)?$/,
        use: [{
          loader: 'url-loader',
          query: {
            limit: 10000,
            mimetype: 'application/vnd.ms-fontobject',
            prefix: 'fonts'
          }
        }]
      },
      {
        test: /\.svg(\?t=\d+)?$/,
        use: [{
          loader: 'url-loader',
          query: {
            limit: 10000,
            mimetype: 'image/svg+xml',
            prefix: 'fonts'
          }
        }]
      }
    ]
  }
};
