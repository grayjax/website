var mongoose = require('mongoose');

var pinSchema = mongoose.Schema({
	title: String,
	description: String,
	image_url: String,
	date: { 
		type: Date, 
		default: Date.now 
	}
});

pinSchema.methods.print_out = function() {
	var output = JSON.stringify(this);
	console.log(output);
}

// cb here stands for callback. It is a common practice in javascript
// to pass in a callback function and to execute it after you have
// done the necessary work in this function
pinSchema.statics.findByTitle = function(title, cb) {
	// This is an interesting line.
	// New RegExp(title, 'i') creates a Regular Expression that causes a case-insensitive search.
	// Also passing in the callback like this allows us to call this method like so:

	/*
		Pinless.findByTitle('kitty', function(err, results) {
			console.log(results)  // Here results will have all Pinless' with title 'kitty'
		})
	*/
	this.find({ title: new RegExp(title, 'i')}, cb);
}


// This defines our Kitten model
var Pin = mongoose.model('Pin', pinSchema);