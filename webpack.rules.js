
const cssRule = mode => ({
    test: /\.less$/,
    use: [
        {
            loader: 'production' === mode ? require('mini-css-extract-plugin').loader : 'style-loader',
            options: 'production' === mode ? undefined : {},
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
            loader: 'babel-loader',
        },
        {
            loader: 'ts-loader',
        }
    ]
});

const iconRule = {
    test: /\.(png|gif)$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: 'icons/[name].[ext]',
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

module.exports.getRules = mode => [cssRule(mode), htmlRule, jsRule, iconRule, fontRule, tsRule(mode)];
