var express = require("express")
, path = require('path')
, mongoose = require('mongoose')
, models = require('./models');

var app = express();

var uristring = process.env.MONGOLAB_URI || 
'mongodb://heroku_app24139117:h0un3479k6ge9et414mfsbtbou@ds029197.mongolab.com:29197/heroku_app24139117';
// 'mongodb://localhost/myMongodbDatabase';


// Points Express to a folder where you keep static files
// e.g. css or client side js files
app.use(express.static(path.normalize(__dirname) + '/public'))


// These 3 lines tell express that we are going to be rendering html files
// held in the public directory which should be in the same directory as this file
app.set('views', path.normalize(__dirname) + '/public/html');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// Tell express to use its built in error handler
app.use(express.logger('dev'));
app.use(express.errorHandler());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

require('./routes')(app);

mongoose.connect(uristring, function(err, res) {
	if (err) {
		console.log("Error" + err);
	} else {
		console.log("Successfully connected to mongodb at the url: " + uristring);
		var port = Number(process.env.PORT || 8000);
		app.listen(port);
		console.log("App listening on port: " + port);
	}
});