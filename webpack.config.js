var path = require( 'path' ),
    HtmlWebpackPlugin = require( 'html-webpack-plugin' ),
	webpack = require( 'webpack' );

let config = {
	entry: './App/index.js',
	output: {
		path: path.resolve( __dirname, 'dist' ),
		filename: 'index_bundle.js',
		publicPath: '/'
	},
	module: {
	rules: [
	{ test: /\.js$/, use: 'babel-loader' },
	{ test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
	{ test: /\.(jpe?g|png|gif|svg)$/i, use: [
		{
			loader: 'file-loader',
			options: {}
		}
	] },
	{ test: /\.(jpe?g|png|gif|svg)$/i, use: [
		{
			loader: 'file-loader',
			options: {}
		}
	] }
    ]
	
  },
	devServer: {
		historyApiFallback: true
	},
	plugins: [ 
	new HtmlWebpackPlugin({
		template: 'App/index.html'
	})]
	
};

if( process.env.NODE_ENV === 'production' ) {
		config.plugins.push( 
		  new webpack.DefinePlugin({
			'process.env': {
              'NODE_ENV': JSON.stringify( process.env.NODE_ENV )
			}			
		  }),
		  new webpack.optimize.UglifyJsPlugin()
		);
}

module.exports = config;