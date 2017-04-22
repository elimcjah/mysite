var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'code';
	locals.filters = {
		pages: req.params.pages,
	};
	locals.data = {
		pages: [],
	};

	// Load the current pages
	view.on('init', function (next) {

		var q = keystone.list('Pages').model.findOne({
			state: 'published',
			slug: locals.filters.pages,
		}).populate('author categories');

		q.exec(function (err, result) {
			locals.data.pages = result;
			next(err);
		});

	});

	// Load other pages
	view.on('init', function (next) {

		var q = keystone.list('Pages').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

		q.exec(function (err, results) {
			locals.data.pages = results;
			next(err);
		});

	});

	// Render the view
	view.render('pages');
};
