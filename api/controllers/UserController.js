/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	new: function(req, res) {
		// res.locals.flash = _.clone(req.session.flash); // a copy not a reference
		res.view();
		// req.session.flash = {};
	},

	create: function(req, res) {
		// Create a User with the params sent from
		// the sign-up form --> new.ejs
		User.create( req.params.all(), function userCreated(err, user) {
			// it there's an error
			// if (err) return next(err);
			if (err) {
				// console.log(err);

				req.session.flash = {
					err: err
				};
				// console.log(req.session.flash);
				return res.redirect('/user/new'); // if no return ,logic will continue to go below!
			}

			// after successfully creating the user
			// redirect to the show action
			// res.json(user);
			// req.session.flash = {};

			res.redirect('/user/show/' + user.id);
		});
	},

	show: function (req, res, next) {
		User.findOne(req.param('id'), function foundUser (err, user) {
			if (err) return next(err);
			if (!user) return next();
			res.view({
				user: user
			});
		});
	},

	index: function(req, res, next) {
		// Get an array of all users in the Users collection(e.g. table)
		User.find(function foundUsers (err, users) {
			if (err) return next(err);

			// pass the array down to the /views/index.ejs page
			res.view({
				users: users
			});
		});
	},

	// render the edit view (e.g. /views/edit.ejs)
	edit: function (req, res, next) {
		User.findOne(req.param('id'), function foundUser (err, user) {
			if (err) return next(err);
			if (!user) return next('User doesn\'t exist.');
			res.view({
				user: user
			});
		});
	},

	// process the info from edit view
	update: function (req, res, next) {
		User.update(req.param('id'), req.params.all(), function userUpdated(err) {
			if (err) return res.redirect('/user/edit' + req.param('id'));

			res.redirect('/user/show/' + req.param('id'));
		});
	},

	destroy: function (req, res, next) {
		User.findOne(req.param('id'), function foundUser (err, user) {
			if (err) return next(err);

			if (!user) return next('User doesn\'t exist.');
			User.destroy(req.param('id'), function userDestroyed (err) {
				if (err) return next(err);

			});

			res.redirect('/user');
		});
	}
};

