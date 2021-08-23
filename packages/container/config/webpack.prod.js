const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const commonConfig = require('./webpack.common');
// package json only needed for shared packages shortcut
const packageJson = require('../package.json')

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/container/latest/',
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
                auth: `auth@${domain}/auth/latest/remoteEntry.js`
            },
            // for explicit control of shared packages and versions, use shared
            // shared: ['react', 'react-dom']
            shared: packageJson.dependencies,
        }),
    ]
};

module.exports = merge(commonConfig, prodConfig);
