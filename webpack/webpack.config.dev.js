// webpack.config.dev.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    mode: 'development',
    entry: [
        'webpack-hot-middleware/client?reload=false',
        './web/main.js',
    ],
    devServer: {
        outputPath: __dirname,
    },
    output: {
        path: path.join(__dirname, '../build'),
        filename: '[name].js',
        publicPath: '/',
    },
    externals: {
    // require('jquery') is external and available
    //  on the global var jQuery
        'jquery': 'jQuery',
    },
    plugins: require('./plugins').concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true,
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
        }),
    ]).concat(require('./pages').map((page) => {
        console.log(page);
        return new HtmlWebpackPlugin({
            filename: `${page}.html`, // output
            template: `./web/${page}.html`, // template to use
        });
    })),
    module: {
        rules: require('./loaders')
            .concat([
                {
                    test: /\.scss$/,
                    use: [{
                        loader: 'style-loader', // creates style nodes from JS strings
                    }, {
                        loader: 'css-loader', // translates CSS into CommonJS
                    }, {
                        loader: 'sass-loader', // compiles Sass to CSS
                    }],
                },
            ]),
    },
};
