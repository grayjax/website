var express = require("express")
, path = require('path');

var app = express();

require('./routes')(app);



app.use(express.static(path.normalize(__dirname) + '/public'))

app.get('/', function(req, res) {
	res.send('Hello, welcome to CS1501');


var port = Number(process.env.PORT || 8000);
app.listen(port, function() {
	console.log("Express app listening on port" + port);
});