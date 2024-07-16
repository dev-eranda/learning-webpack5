const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: 'dist/'
    },
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.(ttf)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(png|jpg)$/,
                type: 'asset/resource'
            }
        ]
    }
}