const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');



module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    output: { // output build
        path: path.resolve(__dirname, "dist"),
        filename: "js/bundle.js"
    },
    devServer: {
        contentBase: "./src"
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        }),
        new CopyWebpackPlugin({
            patterns: [{
                    from: 'src/img',
                    to: 'img'
                },
                {
                    from: 'src/icon',
                    to: 'icon'
                },
                {
                    from: 'src/pages',
                    to: 'pages'
                },
                {
                    from: 'src/nav.html',
                    to: 'nav.html'
                },
                {
                    from: 'src/manifest.json',
                    to: 'manifest.json'
                }
            ]
        }),
        new WorkboxPlugin.InjectManifest({
            swSrc: "./src/sw.js",
            swDest: "sw.js"
        })
    ],
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|jpg|gif|svg)$/i,
                use: [{
                    //using file-loader
                    loader: 'file-loader',
                    options: {
                        name: "[name].[ext]",
                        outputPath: "img/"
                    }
                }]
            },
        ]
    }
}