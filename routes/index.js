var cb = require('../cb');

exports.index = function(req, res){
	cb(function(err, bucket) {
		// retrieve our view data
		// force update before query execution with  `stale` parameter
		bucket.view('dev_tidepools', 'all', {stale: false}, function(err, data) {
			if (err) { throw(err); }

			res.render('index', {tidepools: data});
		});
	});
};

exports.create = function(req, res) {
	res.render('create');
};

exports.save = function(req, res) {
	cb(function(err, bucket) {
		if (err) { throw(err); }

		bucket.get('tidepool::counter', function(err, count) {
			if (err) { throw(err); }

			var data = req.body.tidepool;
			count++;
			data.number = count;
			data.type = 'tidepool';
			if (data.critters) {
				data.critters = data.critters.split(',').map(function(v) {
					return v.trim();
				});
			}
			if (data.plants) {
				data.plants = data.plants.split(',').map(function(v) {
					return v.trim();
				});
			}
			bucket.set('tidepool::'+count, data, function(err) {
				if (err) { throw(err); }

				bucket.incr('tidepool::counter', function(err) {
					if (err) { throw(error); }

					res.redirect('/');
				});
			});
		});
	});
};

exports.view = function(req, res) {
	cb(function(err, bucket) {
		bucket.get('tidepool::'+req.params.number, function(err, data) {
			if (err) { throw(err); }

			res.render('view', { tidepool: data });
		});
	});
}