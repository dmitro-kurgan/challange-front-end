const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function() {
	return {
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: ExtractTextPlugin.extract({
						publicPath: '../',
						fallback: 'style-loader',
						use: [{
							loader: 'css-loader',
							options: { minimize: true }
						},{
							loader: 'sass-loader'
						}]
					}),
				},
				{
					test: /\.css$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader',
					}),
				},
			],
		},
		plugins: [
		new ExtractTextPlugin('./css/style.css'),
		],
	};
};