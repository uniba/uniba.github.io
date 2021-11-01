// Add this to a webpack.config.js file
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    site: ["./source/javascripts/site.js"],
  },
  output: {
    path: path.resolve(__dirname, ".tmp/dist"),
    filename: "[name].js",
  },
  module: {
    rules: [],
  },
};
