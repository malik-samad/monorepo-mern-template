const path = require("path");
const nodeexternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/server/index.ts",
  mode: "production",
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "../../build/server"),
  },
  devtool: "inline-source-map",
  target: "node",
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
  externals: [nodeexternals()],
};
