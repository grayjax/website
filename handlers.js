var mongoose = require('mongoose'),
Pin = mongoose.model('Pin');

exports.index = function(req, res) {
	res.send("Welcome to CS 1501");
}

var watchf = function(req, res) {
	var video_id = req.query.v;
	res.render('watch', { id: video_id }, function(err, html) {
		res.send(html);
	})
}

exports.bootstrap = function(req, res) {
	res.render('bootstrap101', function(err, html) {
		res.send(html);
	})
}

exports.pinterless = function(req, res) {
	console.log("Query: " + req.query);
	if (req.query.search) {
		Pin.findByTitle(req.query.search, function(err, all_pins) {
			console.log("Pins: " + JSON.stringify(all_pins) );
			res.render('pinterless', { pins: all_pins }, function(err, html) {
				res.send(html);
			})
			// res.send(JSON.stringify(result))
		});
	} else {
		Pin.find({}, function(err, all_pins) {
			console.log("Pins: " + JSON.stringify(all_pins) );
			res.render('pinterless', { pins: all_pins }, function(err, html) {
				res.send(html);
			})
			// res.send(JSON.stringify(result))
		});
	}
}

exports.createPin = function(req, res) {
	var newPin = new Pin({ 
								title: req.body.title, 
								description: req.body.description, 
								image_url: req.body.image_url 
						});
	newPin.save(function(err) {
		if (err) {
			console.log("Error saving pin");
		} else {
			res.redirect('/pinterless');
		};
	});	

}

exports.watch = watchf;