const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin")
const tailwindcss = require("tailwindcss");
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve("./src/popup/index.tsx"),
        sidepanel : path.resolve("./src/sidepanel/index.tsx")
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].js",
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[hash].[ext]',
                      outputPath: 'assets',
                      publicPath: 'assets',
                    },
                  },
                ],
              },
            {
              test: /\.tsx?$/,
               use: [
                 {
                  loader: "ts-loader",
                   options: {compilerOptions: { noEmit: false },}
                  }],
               exclude: /node_modules/,
            },
            {
              exclude: /node_modules/,
              test: /\.css$/i,
               use: [
                  "style-loader",
                  "css-loader",
                  {
                    loader : 'postcss-loader',
                    options : {
                        postcssOptions : {
                            indent : 'postcss',
                            plugin : [tailwindcss, autoprefixer]
                        }
                    }
                  }]
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{
              from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js',
              to : "./utils"
            }],
          }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve("public/manifest.json"), to: "./" },
            ],
        }),
        ...getHtmlPlugins(["index", "sidepanel"]),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HTMLPlugin({
                title: "React extension",
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    );
}