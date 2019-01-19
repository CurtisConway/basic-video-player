const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: ['./src/basic-video-player.js', './src/basic-video-player.scss'],
    resolve: {
        modules: ['node_modules'],
        symlinks: true
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'basic-video-player.js'
    },
    // devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'basic-video-player.css',
            chunkFilename:'[id].css',
        })
    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime']
                }
            }
        },
        {
            test: /\.scss$/,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                        implementation: require("dart-sass")
                    }
                }
            ]
        }]
    }
};