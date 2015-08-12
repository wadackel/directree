var path = require("path");


var config = {
  entry: {
    app: "./src/js/app.js"
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: "babel-loader"}
    ]
  }
};


if( !global.isProduction ){
  config.devtool = "#source-map";
}


module.exports = config;