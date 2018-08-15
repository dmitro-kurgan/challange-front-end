module.exports = function() {
	return {
		 module: {
	        rules: [{
	            test: /\.scss$/,
	            use: [{
	                loader: "style-loader"
	            }, {
	                loader: "css-loader"
	            }, {
	                loader: "sass-loader",
	                options: {
	                    includePaths: ["absolute/path/a", "absolute/path/b"]
	                }
	            }]
	        }]
	    }
	};
};