var keystone = require('keystone');

/**
 * PagesCategory Model
 * ==================
 */

var PagesCategory = new keystone.List('PagesCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

PagesCategory.add({
	name: { type: String, required: true },
});

PagesCategory.relationship({ ref: 'Pages', path: 'pages', refPath: 'categories' });

PagesCategory.register();
