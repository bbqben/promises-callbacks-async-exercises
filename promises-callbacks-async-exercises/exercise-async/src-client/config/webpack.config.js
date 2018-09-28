const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const autoprefixer = require('autoprefixer');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();
const CircularDependencyPlugin = require('circular-dependency-plugin');
// const nodeExternals = require('webpack-node-externals');
const chalk = require('chalk');
const paths = require('./paths');
const DEFAULT_PORT = 3600;

module.exports = ({
    webpackMode
} = {
    webpackMode: 'production'
}) => {
    const mode = webpackMode === 'development' ? 'development' : 'production';
    const isProduction = webpackMode === 'development' ? false : true;

    console.log(`MODE: ${mode}`);

    return {
        mode,

        entry: [paths.indexTs],

        output: {
            path: paths.buildDirectory,
            filename: 'bundle.js',
            //   publicPath: `http://localhost:${DEFAULT_PORT}/`,
            publicPath: `/`,
        },

        devtool: isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map',

        devServer: {
            clientLogLevel: 'error',
            contentBase: paths.buildDirectory,
            historyApiFallback: true,
            hot: true,
            port: DEFAULT_PORT,
            quiet: true,
            overlay: {
                warnings: false,
                errors: true,
            },
        },

        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions. // Enable sourcemaps for debugging webpack's output.
            extensions: ['.ts', '.tsx', '.js', '.json'],
            alias: {
                components: `${paths.appDirectory}/components`,
                models: `${paths.appDirectory}/models`,
                services: `${paths.appDirectory}/services`,
                settings: `${paths.appDirectory}/settings`,
                store: `${paths.appDirectory}/store`,
                utils: `${paths.appDirectory}/utils`,
                vendor: `${paths.appDirectory}/vendor`,
                routes: `${paths.appDirectory}/routes`,
                'mock-data': `${paths.appDirectory}/mock-data`,
            },
        },

        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
                {
                    test: /\.(tsx|js|ts)?$/,
                    loader: 'awesome-typescript-loader',
                    exclude: /(node_modules|bower_components)/,
                    options: {
                        getCustomTransformers: () => ({
                            before: [styledComponentsTransformer],
                        }),
                    },
                },
                {
                    test: /\.ts$/,
                    enforce: 'pre',
                    loader: 'tslint-loader',
                    //   exclude: [/node_modules/],
                    exclude: [paths.nodeModulesDirectory],
                    options: {
                        configFile: paths.tsLint,
                        tsConfig: paths.tsConfig,
                        emitErrors: true,
                    },
                },
                {
                    enforce: 'pre',
                    loader: require.resolve('source-map-loader'),
                    test: /\.(js|jsx|mjs)$/,
                    exclude: [
                        // instead of /\/node_modules\//
                        paths.nodeModulesDirectory,
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        require.resolve('style-loader'),
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                                importLoaders: 1,
                            },
                        },
                        {
                            loader: require.resolve('postcss-loader'),
                            options: {
                                ident: 'postcss',
                                plugins: () => [
                                    require('postcss-flexbugs-fixes'),
                                    autoprefixer({
                                        browsers: [
                                            '>1%',
                                            'last 4 versions',
                                            'Firefox ESR',
                                            'not ie < 9', // React doesn't support IE8 anyway
                                        ],
                                        flexbox: 'no-2009',
                                    }),
                                ],
                            },
                        },
                    ],
                },
            ],
        },

        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new HtmlWebPackPlugin({
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                template: paths.buildIndexHtml,
                inject: true,
            }),
            new FriendlyErrorsWebpackPlugin({
                compilationSuccessInfo: {
                    messages: [`Local: http://localhost:${DEFAULT_PORT}`]
                },
                clearConsole: true,
            }),
            new HardSourceWebpackPlugin({
                cacheDirectory: `${paths.nodeModulesDirectory}/.cache/hard-source/[confighash]`,
                recordsPath: `${paths.nodeModulesDirectory}/.cache/hard-source/[confighash]/records.json`,
                configHash: (webpackConfig) => {
                    return require('node-object-hash')().hash(webpackConfig);
                },
            }),
            //   new TsConfigPathsPlugin({
            //     // configFileName: paths.tsConfig,
            //   }),

            //   new CircularDependencyPlugin({
            //     // exclude detection of files based on a RegExp
            //     exclude: /a\.js|node_modules/,
            //     // add errors to webpack instead of warnings
            //     failOnError: false,
            //     // set the current working directory for displaying module paths
            //     cwd: process.cwd(),
            //   }),
        ],

        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    sourceMap: false,
                    uglifyOptions: {
                        ecma: 5,
                        mangle: {
                            safari10: true,
                        },
                        output: {
                            comments: false,
                            // Turned on because emoji and regex is not minified properly using default
                            // https://github.com/facebookincubator/create-react-app/issues/2488
                            ascii_only: true,
                        },
                    },
                }),
            ],
        },

        node: {
            console: false,
            file: 'empty',
            level: 'empty',
            system: 'empty',
            fs: 'empty',
            module: 'empty',
            child_process: 'empty',
        },

        externals: [
            /* nodeExternals({ whitelist: [] }) */
        ],
    };
};