var webpack = require('webpack');
// In webpack.config.js

/* Inject header into dist index file */
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});
module.exports = {
    entry: [
      'webpack/hot/only-dev-server',
      "./app/index.js"
    ],
    output: {
      filename: "index_bundle.js",
      path: __dirname + '/dist'    },
    module: {
      loaders: [
         {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},

        // {test: /\.coffee$/, exclude: /node_modules/, loader: "coffee-loader"},
        // { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
        // { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
        { test: /\.css$/, loader: "style!css" }
      ]
        /*
         loader needs to be composed of three things.
         1. file type to run the specific transformation on.
         For example, we don't want to run CSS transformations on a JavaScript file and vice versa.
         2. Which directories should be included or excluded from being transformed. An example here is we don't want to run our
         transformations on anything in our node_modules folder, so we'd have the node_modules path as an excluded value.
         The last thing is the specific loader we want to run. Let's take a look at what this looks like. */
    },
    plugins: [
      // new webpack.NoErrorsPlugin()
      HTMLWebpackPluginConfig
    ],
    node: {
      fs: "empty"
    }

};
