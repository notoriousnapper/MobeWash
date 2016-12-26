var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname +'/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

/* Configurations */
/* Three items */
// 1. Where to Start
// 2. What to transform into what
// 3. Where to put the transformed code
module.exports = {
        entry:[
          'webpack/hot/only-dev-server',
          './app/index.js'
        ],
        module: {
            /* Transformations go here */
            /* The regexp says, get all .js files and put it into one file */
            loaders: [
              {test: /\.js$|.jpe?g$|\.gif$|\.png/, exclude: /node_modules/, loader: "babel-loader"}

            ]
        },
        output: {
          filename: "bundle.js",
          path: __dirname + '/public'
        },
        plugins: [HTMLWebpackPluginConfig,
                new CopyWebpackPlugin([
                    {from: 'public',
                     to: 'public' }
                ])
        ],
        node: {
                  fs: "empty"
        }

};
