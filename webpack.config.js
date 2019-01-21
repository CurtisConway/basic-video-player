const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: ['./src/index.js', './src/basic-video-player.scss'],
    resolve: {
        modules: ['node_modules'],
        symlinks: true
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'basic-video-player.js'
    },
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'basic-video-player.css',
            chunkFilename:'[id].css',
        })
    ],
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
                presets: ['@babel/preset-env']
            }
        },
        {
            test: /\.scss$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            require('autoprefixer')
                        ]
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        implementation: require("dart-sass")
                    }
                }
            ]
        }]
    }
};