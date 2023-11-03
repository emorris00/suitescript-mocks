const SuiteScriptMocks = require("../../index.cjs");
const { options, required, assignConstructor } = require("../../helpers.cjs");
const Iterator = require("../../iterator.cjs");
const Reader = require("./Reader.cjs");

@assignConstructor()
class File {
	description = "";
	contents = "";
	encoding = "";
	fileType = "";
	folder = null;
	id = null;
	isInactive = false;
	isOnline = false;
	isText = true;
	name = "";
	path = "";
	size = 0;
	url = "";

	savedContents = null;
	frozenContents = null;
	frozenContents2 = null;
	iterators = [];
	readers = [];

	lines = {
		iterator: () => {
			this.iterators.push(new Iterator(this.savedContents?.split(options.separator) || []));
			return this.iterators.at(-1);
		},
	};

	initialize = () => {
		this.frozenContents = this.frozenContents2 = null;
		if (this.id) {
			this.savedContents = this.contents;
		}
	};

	@options("value")
	@required("value")
	appendLine = (options) => {
		this.contents = this.contents ? this.contents.split("\n").concat([options.value]).join("\n") : options.value;
	};

	getContents = () => {
		if (this.savedContents !== null) {
			return this.savedContents;
		}
		if (this.frozenContents === null) {
			this.frozenContents = this.frozenContents2 = this.contents;
		}
		if (this.frozenContents === null) {
			throw new Error("File contents don't exist");
		}
		return this.frozenContents;
	};

	getReader = () => {
		this.iterators.push(new Reader({ contents: this.savedContents || this.frozenContents2 || "" }));
		return this.iterators.at(-1);
	};

	@options("separator")
	@required("separator")
	getSegments = (options) => {
		if (typeof options.separator !== "string") {
			throw new Error("Separator must be a string.");
		}
		return {
			iterator: () => {
				this.iterators.push(new Iterator(this.savedContents?.split(options.separator) || []));
				return this.iterators.at(-1);
			},
		};
	};

	resetStream = () => {
		this.contents = this.savedContents;
		this.frozenContents2 = null;
		this.iterators.forEach((iterator) => {
			iterator.pointer = -1;
		});
		this.readers.forEach((reader) => {
			reader.pointer = -1;
			reader.contents = reader.savedContents;
		});
	};

	save = () => {
		if (this.contents === null) {
			throw new Error("File contents don't exist");
		}
		if (!this.folder) {
			throw new Error("Please enter value for folder");
		}
		const copy = new File(this);
		if (!this.id) {
			this.id = copy.id = Math.max(...Array.from(SuiteScriptMocks.files.values()).map((a) => a.id)) + 1;
			SuiteScriptMocks.createdFiles.push(copy);
		}
		SuiteScriptMocks.files.set(copy);
		SuiteScriptMocks.savedFiles.push(copy);
		return this.id;
	};
}

module.exports = File;
