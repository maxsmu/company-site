/**
 * @Author: Micheal
 * @Date: 2017-03-27 14:13:13
 * @Last Modified by: Micheal
 * @Last Modified time: 2017-04-10 23:41:23
 * @GitHub: https://github.com/maxsmu
*/
// webpack
const webpack = require('webpack');

// path
const path = require('path');

// yargs 处理命令行参数
const argv = require('yargs')
  .default('env', { sysEnv: '', appName: 'portlet' })
  .argv;

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

// 获取运行环境
const NODE_ENV = process.env.NODE_ENV;

// 根据 build 变量获取应用信息及系统环境等信息
const env = argv.env;

const systemEnv = env.sysEnv;

// 打包后文件名称
const distName = env.appName;


const entry = {

};

// webpack dev、test 基础配置
const webpackBaseConfig = {
  // cheap-module-eval-source-map
  devtool: 'source-map',
  // 打包目录上下文
  context: path.join(__dirname, 'src'),
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
    new webpack.LoaderOptionsPlugin({
      test: /\.js$/,
      options: {
        eslint: {
          configFile: path.join(__dirname, '.eslintrc'),
          emitWarning: true,
          emitError: true,
          formatter: eslintFriendlyFormatter
        },
        context: path.join(__dirname, 'src')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.css$/,
      options: {
        context: path.join(__dirname, 'src'),
        postcss: () => [precss, autoprefixer({ browsers: ['Chrome > 35', 'Firefox > 30', 'Safari > 7'] })]
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(systemEnv)
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
    // dev
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{ loader: 'eslint-loader' }],
        enforce: "pre",
        exclude: /node_modules/,
        include: [path.join(__dirname, 'src')]
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
          // ,
          // options: { presets: [['es2015', { modules: false }]] }
        }],
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.tpl\.html$/,
        use: ['html-loader'],
        query: { interpolate: true },
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, 'src')
      }, {
        test: /\.url\.html$/,
        use: ['file-loader?name=[path][name]-[hash:8].[ext]'],
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
          'file-loader?hash=sha512&digest=hex&name=[hash:8].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.(woff|woff2)(\?t=\d+)?$/,
        use: ['url-loader?limit=10000&mimetype=application/font-woff&prefix=fonts']
      },
      {
        test: /\.ttf(\?t=\d+)?$/,
        use: ['url-loader?limit=10000&mimetype=application/octet-stream&prefix=fonts']
      },
      {
        test: /\.eot(\?t=\d+)?$/,
        use: ['url-loader?limit=10000&mimetype=application/vnd.ms-fontobject&prefix=fonts']
      },
      {
        test: /\.svg(\?t=\d+)?$/,
        use: ['url-loader?limit=10000&mimetype=image/svg+xml&prefix=fonts']
      }
    ]
  }
};
// webpack config
let webpackConfig;
if (NODE_ENV === 'production') {
  // optimize-css-assets-webpack-plugin
  const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

  //  cssnano common  opts
  var cssNanoCommonOpts = {
    discardComments: { removeAll: true },
    discardDuplicates: true,
    discardOverridden: true,
    discardUnused: true,
    minifyGradients: true
  };

  // cssnano
  const cssnano = require('cssnano');

  // clean-webpack-plugin 清空目录
  const CleanPlugin = require('clean-webpack-plugin');
  webpackConfig = Object.assign(webpackBaseConfig, {
    devtool: 'cheap-source-map',
    // 打包目录上下文
    context: path.join(__dirname, 'src'),
    entry: {
      site: ['./app/app.js']
    },
    output: {
      path: path.join(__dirname, distName),
      filename: '[name]-[hash:8].min.js',
      publicPath: '/' + distName + '/'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(systemEnv)
        }
      }),
      new CleanPlugin([distName]),
      new CopyWebpackPlugin([
        {
          from: __dirname + '/src/assets/images/static',
          to: __dirname + '/' + distName + '/assets/images/static'
        }
      ]),
      // 代码压缩
      new webpack.optimize.UglifyJsPlugin({
        include: /\.min\.js$/,
        minimize: true
      }),
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: './index.html',
        inject: false
      }),
      new webpack.LoaderOptionsPlugin({
        test: /\.css$/,
        options: {
          postcss: function() {
            return [precss, autoprefixer({ browsers: ['Chrome > 35', 'Firefox > 30', 'Safari > 7'] })];
          }
        }
      }),
      new ExtractTextPlugin('[name]-[contenthash:8].css'),

      // 处理extract出来的css
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: cssnano,
        cssProcessorOptions: Object.assign({
          core: false
        }, cssNanoCommonOpts),
        canPrint: true
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.min\.css$/g,
        cssProcessor: cssnano,
        cssProcessorOptions: cssNanoCommonOpts,
        canPrint: true
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.NoErrorsPlugin()
    ]
  });
} else {
  webpackConfig = webpackBaseConfig;
}
module.exports = webpackConfig;
