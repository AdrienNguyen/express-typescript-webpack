const fs = require('fs')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

const paths = require('./config/paths')
const { appNodemodule, appServerTs, appBuild } = paths

var nodeModules = {}

// note the path.resolve(__dirname, ...) part
// without it, eslint-import-resolver-webpack fails
// since eslint might be invoked with different cwd
fs.readdirSync(appNodemodule)
    .filter((x) => ['.bin'].indexOf(x) === -1)
    .forEach((mod) => {
        nodeModules[mod] = `commonjs ${mod}`
    })

module.exports = {
    mode: 'production',
    entry: { server: appServerTs },
    target: 'node',
    externals: nodeModules,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'ts-loader',
                },
            },
        ],
    },
    output: {
        path: appBuild,
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new webpack.ProgressPlugin({
            modulesCount: 5000,
        }),
    ],
    optimization: {
        nodeEnv: 'production',
        minimize: true,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
        // Keep the runtime chunk separated to enable long term caching
        // https://twitter.com/wSokra/status/969679223278505985
        // https://github.com/facebook/create-react-app/issues/5358
        // runtimeChunk: {
        //     name: (entrypoint) => `runtime-${entrypoint.name}`,
        // },
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        // We want terser to parse ecma 8 code. However, we don't want it
                        // to apply any minification steps that turns valid ecma 5 code
                        // into invalid ecma 5 code. This is why the 'compress' and 'output'
                        // sections only apply transformations that are ecma 5 safe
                        // https://github.com/facebook/create-react-app/pull/4234
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        // Disabled because of an issue with Uglify breaking seemingly valid code:
                        // https://github.com/facebook/create-react-app/issues/2376
                        // Pending further investigation:
                        // https://github.com/mishoo/UglifyJS2/issues/2011
                        comparisons: false,
                        // Disabled because of an issue with Terser breaking valid code:
                        // https://github.com/facebook/create-react-app/issues/5250
                        // Pending further investigation:
                        // https://github.com/terser-js/terser/issues/120
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    // Added for profiling in devtools
                    // keep_classnames: isEnvProductionProfile,
                    // keep_fnames: isEnvProductionProfile,
                    output: {
                        comments: true,
                        ecma: 5,
                        // Turned on because emoji and regex is not minified properly using default
                        // https://github.com/facebook/create-react-app/issues/2488
                        // eslint-disable-next-line camelcase
                        ascii_only: true,
                    },
                },
            }),
        ],
    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
}
