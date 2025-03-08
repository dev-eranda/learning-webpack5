const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    kiwi: './src/kiwi.js',
  },
  output: {
    // use "contenthash" for browser caching | md5 cache
    // [name] use the entry point name as bundle name "bundle.abc123.js => kiwi.abc123.js"
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/static/', // for express server read from this path [href=/static/style.123.css] and js
    // clean: {
    //     dry: true,
    //     keep: /\.css/  // keep all css file
    // }  // clean dist/ only support Webpack higher than 5.20
  },
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all', // optimize all bundle .js file with libraries. (reduce sizes)
      minSize: 3000, // separate 3KB lower libraries to separate bundle. ex: react
    },
  },
  module: {
    rules: [
      {
        // this rule for .png .jpg .svg
        // if image size grater than 3KB type: asset/resources.
        // if image size less than 3KB type: asset/inline.  (use base64)
        // default inline asset size is 8KB we customized here it to 3KB
        test: /\.(png|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024, // 3 Kilobytes
          },
        },
      },
      {
        test: /\.txt/, // this rule for all .txt (asset/source)
        type: 'asset/source',
      },
      {
        test: /\.css$/, // this rule for all .css
        use: [
          MiniCssExtractPlugin.loader, // changed "style-loader" to "MiniCssExtractPlugin.loader" for min-css
          'css-loader',
        ],
      },
      {
        test: /\.scss$/, // this rule for all .sass
        use: [
          MiniCssExtractPlugin.loader, // changed "style-loader" to "MiniCssExtractPlugin.loader" for min-css
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/, // Matches JavaScript & JSX files
        exclude: '/node_modules/', // Ignores node_modules for performance
        use: {
          loader: 'babel-loader', // Uses Babel to transpile JS/JSX, Babel automatically picks up .babelrc
        },
      },
      {
        test: /\.hbs/, // handle .hbs template file to create index.html
        use: ['handlebars-loader'],
      },
    ],
  },
  plugins: [
    // use for reduce the bundle.js size (minification).
    // By default production config.production.config include TerserPlugin.
    // new TerserPlugin(),

    new MiniCssExtractPlugin({
      // default can use any name  main, styles
      // [name] use the css file name as bundle name
      filename: '[name].[contenthash].css', // use "contenthash" for browser caching | md5 cache
    }), // extract css into a separate bundle

    new CleanWebpackPlugin(), // clean dist/ falder when run the "npm run build"

    // new CleanWebpackPlugin({
    //     cleanOnceBeforeBuildPatterns: [  // this clean all the file include "build"
    //         '**/*',
    //         path.join(process.cwd(), 'build/**/*'),
    //     ]
    // }),

    //genarate multiple HTML pages
    new HtmlWebpackPlugin({
      filename: 'index.html', // genarated file name
      chunks: ['index'], // add entry point name to which page genarate as a HTML , this is array
      title: 'Index', // custom title
      template: 'page-template.hbs', //custom template
      description: 'index-page', //custom meta description
      // minify: false // if you want disable html minify
    }), // genarate new html file inside dist/

    new HtmlWebpackPlugin({
      filename: 'kiwi.html',
      chunks: ['kiwi'],
      title: 'Kiwi',
      template: 'page-template.hbs',
      description: 'kiwi-page',
      // minify: false
    }),
  ],
};
