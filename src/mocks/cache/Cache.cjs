const { assignConstructor, options, required } = require("../../helpers.cjs");

@assignConstructor()
class Cache {
	name;
	scope;

	values = {};

	@options("key", "loader", "ttl")
	@required("key")
	get = (options) => {
		if (!(options.key in this.values) && options.loader) {
			const value = options.loader();
			this.put(options.key, value);
		}
		return options.key in this.values ? this.values[options.key] : null;
	};

	@options("key", "value", "ttl")
	@required("key", "value")
	put = (options) => {
		this.values[options.key] = typeof options.value === "string" ? options.value : JSON.stringify(options.value);
	};

	@options("key")
	@required("key")
	remove = (options) => {
		delete this.values[options.key];
	};
}

module.exports = Cache;
