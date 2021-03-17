const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const WebpackNotifierPlugin = require("webpack-notifier");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const ESLintPlugin = require("eslint-webpack-plugin");
//process.traceDeprecation = true;

const config = {
  mode: "development",
  entry: {
    main: "./index.jsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: false,
    minimizer: [
      new CssMinimizerPlugin({
        test: /\.css$/i,
      }),
      new TerserPlugin({
        test: /\.(js|jsx)$/i,
      }),
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./public/index.html",
    }),
    new WebpackNotifierPlugin({ alwaysNotify: false }),
    new ESLintPlugin({ extensions: ["js, jsx"] }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/images/favicon.ico"),
          to: path.resolve(__dirname, "dist/src/images"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[contenthash].css",
    }),
    new Dotenv({
      path: path.resolve(__dirname, "./.env"),
      systemvars: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
      {
        test: /\.(png|jpg|svg|gif|webp)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "",
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  devtool: "eval-source-map",
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "src"),
    hot: true,
    watchContentBase: true,
    compress: true,
    port: 8080,
    publicPath: "/",
    // progress: true,
    open: true,
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.output.filename = "[name].js";
  }

  if (argv.mode === "production") {
    config.optimization.minimize = false;
    config.output.filename = "[contenthash].js";
  }

  return config;
};
