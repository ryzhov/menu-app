
const cssRule = mode => ({
    test: /\.less$/,
    use: [
        {
            loader: 'production' === mode ? require('mini-css-extract-plugin').loader : 'style-loader',
            options: 'production' === mode ? undefined : {sourceMap: true},
        },
        {
            loader: 'css-loader', options: {sourceMap: true} // translates CSS into CommonJS
        },
        {
            loader: 'less-loader', options: {sourceMap: true}  // compiles Less to CSS
        }
    ]
});

const htmlRule = {
    test: /\.html$/,
    use: {
        loader: 'html-loader',
        options: {
            minimize: true
        }
    }
};

const jsRule = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: ['babel-loader'],
};

const tsRule = mode => ({
    test: /\.ts$/,
    exclude: /node_modules/,
    use: [
        {
            loader: 'ng-annotate-loader',
            options: {
                ngAnnotate: 'ng-annotate-patched',
                sourcemap: 'production' !== mode,
            },
        },
        {
            loader: 'ts-loader',
        }
    ]
});

const imageRule = {
    test: /\.(png|svg|jpg|gif)$/,
    use: [
        {
            loader: 'url-loader',
            options: {
                name: 'images/[name].[hash].[ext]',
                limit: 4096,
            }
        }
    ]
};

const fontRule = {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: '[name].[hash].[ext]',
                outputPath: 'fonts',
                publicPath: '/fonts',
            }
        }
    ]
};

module.exports.getRules = mode => [cssRule(mode), htmlRule, jsRule, imageRule, fontRule, tsRule(mode)];
