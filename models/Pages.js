var keystone = require('keystone');
var Types = keystone.Field.Types;

var Pages = new keystone.List('Pages', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Pages.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'PagesCategory', many: true },
});

Pages.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Pages.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Pages.register();
