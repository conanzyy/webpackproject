const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin= require('vue-loader/lib/plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports = {
  entry: {main: __dirname + "/src/main.js",//已多次提及的唯一入口文件
      vendor: [
          'vue'
          //,'jquery'
      ]
  },
  output: {
    path: __dirname + "/build",//打包后的文件存放的地方
    //filename: "bundle-[hash].js"//打包后输出文件的文件名
	//filename: "bundle.js"//打包后输出文件的文件名
      filename: "[name]-[hash].js"
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
	 hot: true,
	port:4444
 } ,
 resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
            ,'jquery': './js/jquery.min.js'
        }
    },
 module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                  
                },
                exclude: /node_modules/
            },
			{
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "vue-style-loader"
                    }, {
                        loader: "css-loader"
                    }
                ]
            },
			{
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax'
                ],
            },
			{
    test: /\.(png|jpg|gif|svg)$/,
    loader: 'file-loader',
    options: {
        name: '[name].[ext]?[hash]'
    }
},
			{
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
        loaders: {
            'scss': [
                'vue-style-loader',
                'css-loader',
                'sass-loader'
            ],
            'sass': [
                'vue-style-loader',
                'css-loader',
                'sass-loader?indentedSyntax'
            ]
        }
    }
}
        ]
		 
    },
	plugins: [
        //new webpack.BannerPlugin('版权所有，翻版必究'),
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
            template: __dirname + "/src/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
		 new webpack.HotModuleReplacementPlugin(),//热加载插件
        new BundleAnalyzerPlugin({ analyzerPort: 8919 }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['vendor'],
        //     minChunks: Infinity,
        //     filename: 'common.bundle.[chunkhash].js',
        // })
        new webpack.optimize.SplitChunksPlugin({
            chunks: "all",
            minSize: 20000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    }

}


//process.env.NODE_ENV === 'production'
if (true) {
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
     // new webpack.optimize.UglifyJsPlugin(),
    ])
  }