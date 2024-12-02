const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');

// Check if icons directory exists
const hasIcons = fs.existsSync(path.resolve(__dirname, 'icons'));

// Base patterns for CopyPlugin
const copyPatterns = [
    { from: "manifest.json" },
    { from: "popup/popup.html" },
    { from: "popup/popup.css" },
    { from: "options/options.html" },
    { from: "options/options.css" }
];

// Add icons pattern if directory exists
if (hasIcons) {
    copyPatterns.push({ 
        from: "icons/*.png",
        to: "icons/[name][ext]"
    });
}

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    stats: {
        errorDetails: true
    },
    entry: {
        background: './background.js',
        content: './content.js',
        popup: './popup/popup.js',
        options: './options/options.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            type: 'module'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    chrome: '88'
                                }
                            }]
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: copyPatterns
        }),
    ],
    optimization: {
        minimize: false
    },
    experiments: {
        outputModule: true
    }
}; 