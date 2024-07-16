const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',  // use "contenthash" for browser caching | md5 cache | Don't need contenthash in development mode
        path: path.resolve(__dirname, './dist'),
        publicPath: 'dist/', // remove dist/ because we genarate new html file inside the dist/ falder
        // clean: {
        //     dry: true,
        //     keep: /\.css/  // keep all css file
        // }  // clean dist/ only support Webpack higher than 5.20
    },
    mode: 'development',
    // devServer: {
    //     port: 9000,
    //     static: {
    //         directory: path.resolve(__dirname, './dist'),
    //     },
    //     devMiddleware: {
    //         index: 'index.html',
    //         writeToDisk: true, // Webpack dev server will explicitly write the generated files to the dist folder,
    //     }
    // },
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
                        maxSize: 3 * 1024 // 3 Kilobytes 
                    }
                }
            },
            {
                test: /\.txt/, // this rule for all .txt (asset/source)
                type: 'asset/source'
            },
            {
                test: /\.css$/, // this rule for all .css
                use: [
                    'style-loader', 'css-loader'
                ]
            },
            {
                test: /\.scss$/, // this rule for all .sass
                use: [
                    'style-loader', 'css-loader', "sass-loader"
                ]
            },
            {
                test: /\.js$/, // this rule for use " buttonCssClass = 'hello-world-button';" (experimental js features)
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            // {
            //     test: /\.hbs/, // handle .hbs template file to create index.html
            //     use: [
            //         'handlebars-loader'
            //     ]
            // }
        ]
    },
    plugins: [
        // use for reduce the bundle.js size (minification)
        // don't need minification in dev mode
        // new TerserPlugin(),  

        // use "contenthash" for browser caching | md5 cache | 
        // Don't need mini css in dev mode
        // extract css into a separate bundle
        // new MiniCssExtractPlugin({
        //     filename: 'styles.[contenthash].css' 
        // }), 

        // new CleanWebpackPlugin(),  // clean dist/ falder when run the "npm run build"
        // new CleanWebpackPlugin({
        //     cleanOnceBeforeBuildPatterns: [  // this clean all the file include "build"
        //         '**/*',
        //         path.join(process.cwd(), 'build/**/*'),
        //     ]
        // }),
        // new HtmlWebpackPlugin({
        //     filename: 'hello-world.html',
        //     chunks: ['hello-world'],
        //     title: 'Hello world',  // custom title
        //     template: 'src/page-template.hbs',  //custom template
        //     description: "Hello world", //custom meta description
        // }), // genarate new html file inside dist/

        // new HtmlWebpackPlugin({
        //     filename: 'kiwi.html',
        //     chunks: ['kiwi'],
        //     title: 'Kiwi',
        //     template: 'src/page-template.hbs',
        //     description: "Kiwi",
        // }),
    ],
};