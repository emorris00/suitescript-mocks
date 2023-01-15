const { options, required, assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class User {
	contact;
	department;
	email;
	id;
	location;
	name;
	role;
	roleCenter;
	roleId;
	subsidiary;

	permissions;
	preferences;

	@options("name")
	@required("name")
	getPermission = (options) => {
		return Boolean(this.permissions[options.name]);
	};

	@options("name")
	@required("name")
	getPreference = (options) => {
		return this.preferences[options.name];
	};
}

module.exports = User;
