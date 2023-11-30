const datefns = require("date-fns");
const structuredClone = require("core-js-pure/actual/structured-clone");
const { randomUUID } = require("node:crypto");
const SuiteScriptMocks = require("../../index.cjs");
const Field = require("./Field.cjs");
const Sublist = require("./Sublist.cjs");
const {
	options,
	required,
	addPromise,
	dynamicModeOnly,
	standardModeOnly,
	assignConstructor,
} = require("../../helpers.cjs");

@assignConstructor()
class Record {
	id = null;
	type = null;
	fields = {};
	sublists = {};
	subrecords = {};
	isDynamic = false;
	version = 1;

	initialize = () => {
		this.fields = structuredClone(this.fields);
		this.sublists = Object.entries(this.sublists || {}).reduce((acc, [lineId, lines]) => {
			acc[lineId] = {
				currentline: {},
				lines: [...(("lines" in lines ? lines.lines : lines) || [])],
			};
			acc[lineId].lines = acc[lineId].lines.map((line) => {
				line = { ...line };
				line._id = line._id || randomUUID();
				Object.entries(line).forEach(([key, value]) => {
					if (value instanceof Record) {
						line[key] = new Record(value);
					} else {
						line[key] = structuredClone(value);
					}
				});
				return line;
			});
			return acc;
		}, {});
		this.subrecords = Object.entries(this.subrecords || {}).reduce((acc, [subrecordId, subrecord]) => {
			acc[subrecordId] = new Record(subrecord);
			return acc;
		}, {});
	};

	#getSublist(options) {
		const sublist = this.sublists[options.sublistId];
		if (!sublist) {
			throw new Error("Sublist does not exist");
		}
		return sublist;
	}

	#getLine(options) {
		const sublist = this.#getSublist(options);
		const line = sublist.lines[options.line];
		if (!line) {
			throw new Error("Line does not exist");
		}
		return line;
	}

	@dynamicModeOnly()
	@options("sublistId")
	@required("sublistId")
	cancelLine = (options) => {
		this.selectNewLine(options.sublistId);
		return this;
	};

	@dynamicModeOnly()
	@options("sublistId", "ignoreRecalc")
	@required("sublistId")
	commitLine = (options) => {
		const sublist = this.#getSublist(options);
		if (!sublist.currentline._id) {
			sublist.currentline._id = randomUUID();
		}
		sublist.lines[this.getCurrentSublistIndex(options.sublistId)] = sublist.currentline;
		this.selectNewLine(options.sublistId);
		return this;
	};

	@addPromise()
	executeMacro = (options) => {};

	findMatrixSublistLineWithValue = (options) => {};

	@options("sublistId", "fieldId", "value")
	@required("sublistId", "fieldId", "value")
	findSublistLineWithValue = (options) => {
		for (let i = 0; i < this.getLineCount(options.sublistId); i++) {
			if (this.getSublistValue(options.sublistId, options.fieldId, i) == options.value) {
				return i;
			}
		}
		return -1;
	};

	@dynamicModeOnly()
	getCurrentMatrixSublistValue = (options) => {};

	@dynamicModeOnly()
	@options("sublistId", "fieldId")
	@required("sublistId", "fieldId")
	getCurrentSublistField = (options) => {
		const sublist = this.#getSublist(options);
		if (options.fieldId in sublist.currentline) {
			return new Field({ id: options.fieldId, label: options.fieldId, sublistId: options.sublistId });
		}
		return null;
	};

	@dynamicModeOnly()
	@options("sublistId")
	@required("sublistId")
	getCurrentSublistIndex = (options) => {
		const sublist = this?.sublists?.[options.sublistId];
		if (sublist) {
			const existingIndex = sublist?.lines.findIndex((a) => a._id === sublist.currentline._id);
			return existingIndex > -1 ? existingIndex : sublist?.lines.length;
		}
		return -1;
	};

	@dynamicModeOnly()
	@options("sublistId", "fieldId")
	getCurrentSublistSubrecord = (options) => {
		const sublist = this.#getSublist(options);
		if (!(options.fieldId in sublist.currentline) || !(sublist.currentline[options.fieldId] instanceof Record)) {
			throw new Error(`Field ${options.fieldId} is not a subrecord field`);
		}
		return sublist.currentline[options.fieldId];
	};

	@dynamicModeOnly()
	@options("sublistId", "fieldId")
	@required("sublistId", "fieldId")
	getCurrentSublistText = (options) => {
		const sublist = this.#getSublist(options);
		const field = sublist.currentline[options.fieldId];
		if (Object.prototype.toString.call(field) === "[object Date]") {
			return datefns.format(field, SuiteScriptMocks.dateFormat);
		}
		if (typeof field === "object" && field !== null) {
			return field.text || field.value;
		}
		return field;
	};

	@dynamicModeOnly()
	@options("sublistId", "fieldId")
	@required("sublistId", "fieldId")
	getCurrentSublistValue = (options) => {
		const sublist = this.sublists[options.sublistId];
		// this is correct, suitescript doesn't error when supplying a sublistId that doesn't exist
		if (sublist === undefined) {
			return null;
		}
		const field = sublist.currentline[options.fieldId];
		if (
			typeof field === "object" &&
			field !== null &&
			!(Object.prototype.toString.call(field) === "[object Date]")
		) {
			return field.value;
		}
		return field;
	};

	@options("fieldId")
	@required("fieldId")
	getField = (options) => {
		if (options.fieldId in this.fields) {
			return new Field({ id: options.fieldId, label: options.fieldId });
		}
		return null;
	};

	getFields = () => {
		return Object.keys(this.fields);
	};

	@options("sublistId")
	@required("sublistId")
	getLineCount = (options) => {
		const sublist = this.sublists[options.sublistId];
		if (sublist === undefined) {
			return -1;
		}
		return sublist.lines.length;
	};

	getMacro = (options) => {};

	getMacros = (options) => {};

	getMatrixHeaderCount = (options) => {};

	getMatrixHeaderField = (options) => {};

	getMatrixHeaderValue = (options) => {};

	getMatrixSublistField = (options) => {};

	getMatrixSublistValue = (options) => {};

	@options("sublistId")
	@required("sublistId")
	getSublist = (options) => {
		if (options.sublistId in this.sublists) {
			return new Sublist({ id: options.sublistId });
		}
		return null;
	};

	getSublists = () => {
		return Object.keys(this.sublists);
	};

	@options("sublistId", "fieldId", "line")
	@required("sublistId", "fieldId", "line")
	getSublistField = (options) => {
		const line = this.#getLine(options);
		if (options.fieldId in line) {
			return new Field({ id: options.fieldId, label: options.fieldId, sublistId: options.sublistId });
		}
		return null;
	};

	@options("sublistId")
	@required("sublistId")
	getSublistFields = (options) => {
		const sublist = this.#getSublist(options);
		return Object.keys(sublist.lines[0] || {}).filter((id) => id !== "_id");
	};

	@options("sublistId", "fieldId", "line")
	@required("sublistId", "fieldId", "line")
	getSublistSubrecord = (options) => {
		const line = this.#getLine(options);
		if (!(options.fieldId in line) || !(line[options.fieldId] instanceof Record)) {
			throw new Error(`Field ${options.fieldId} is not a subrecord field`);
		}
		return line[options.fieldId];
	};

	@options("sublistId", "fieldId", "line")
	@required("sublistId", "fieldId", "line")
	getSublistText = (options) => {
		const line = this.#getLine(options);
		const field = line[options.fieldId];
		if (Object.prototype.toString.call(field) === "[object Date]") {
			return datefns.format(field, SuiteScriptMocks.dateFormat);
		}
		if (typeof field === "object" && field !== null) {
			if (!this.isDynamic && !("text" in field)) {
				throw new Error(
					"Cannot use getSublistText on field that has had value but not text set in standard mode",
				);
			}
			return field.text || field.value;
		}
		return field;
	};

	@options("sublistId", "fieldId", "line")
	@required("sublistId", "fieldId", "line")
	getSublistValue = (options) => {
		const line = this.#getLine(options);
		const field = line[options.fieldId];
		if (
			typeof field === "object" &&
			field !== null &&
			!(Object.prototype.toString.call(field) === "[object Date]")
		) {
			return field.value;
		}
		return field;
	};

	@options("fieldId")
	@required("fieldId")
	getSubrecord = (options) => {
		if (!(options.fieldId in this.subrecords)) {
			throw new Error(`Field ${options.fieldId} is not a subrecord field`);
		}
		return this.subrecords[options.fieldId];
	};

	@options("fieldId")
	@required("fieldId")
	getText = (options) => {
		const field = this.fields[options.fieldId];
		if (Object.prototype.toString.call(field) === "[object Date]") {
			return datefns.format(field, SuiteScriptMocks.dateFormat);
		}
		if (typeof field === "object" && field !== null) {
			if (!this.isDynamic && !("text" in field)) {
				throw new Error("Cannot use getText on field that has had value but not text set in standard mode");
			}
			return field.text || field.value;
		}
		return field;
	};

	@options("fieldId")
	@required("fieldId")
	getValue = (options) => {
		const field = this.fields[options.fieldId];
		if (typeof field === "object" && field !== null && Object.prototype.toString.call(field) !== "[object Date]") {
			return field.value;
		}
		return field;
	};

	@dynamicModeOnly()
	@options("sublistId", "fieldId")
	@required("sublistId", "fieldId")
	hasCurrentSublistSubrecord = (options) => {
		return Boolean(this.getCurrentSublistSubrecord(options));
	};

	@options("sublistId", "fieldId", "line")
	@required("sublistId", "fieldId", "line")
	hasSublistSubrecord = (options) => {
		return Boolean(this.getSublistSubrecord(options));
	};

	@options("fieldId")
	@required("fieldId")
	hasSubrecord = (options) => {
		return Boolean(this.getSubrecord(options));
	};

	@options("sublistId", "line", "ignoreRecalc")
	@required("sublistId", "line")
	insertLine = (options) => {
		const sublist = this.sublists[options.sublistId];
		if (!sublist) {
			throw new Error("Sublist does not exist");
		}
		if (options.line < 0 || options.line > sublist.lines.length) {
			throw new Error("Line is outside valid range");
		}
		sublist.lines.splice(options.line, 0, {});
		if (this.isDynamic) {
			this.selectLine(options);
		}
		return this;
	};

	// @options("sublistId", "from", "to")
	// @required("sublistId", "from", "to")
	// moveLine = (options) => {
	// 	const sublist = this.#getSublist(options);
	// 	if (options.from < 0 || options.from > sublist.lines.length - 1) {
	// 		throw new Error("From is outside valid range");
	// 	}
	// 	if (options.to < 0 || options.to > sublist.lines.length) {
	// 		throw new Error("To is outside valid range");
	// 	}
	// 	// if (options.to > options.from) {
	// 	// 	options.to--;
	// 	// }
	// 	const line = sublist.lines.splice(options.from, 1);
	// 	sublist.lines.splice(options.to, 0, line);
	// 	return this;
	// };

	@dynamicModeOnly()
	@options("sublistId", "fieldId")
	@required("sublistId", "fieldId")
	removeCurrentSublistSubrecord = (options) => {
		const sublist = this.#getSublist(options);
		if (!(options.fieldId in sublist.currentline) || !(sublist.currentline[options.fieldId] instanceof Record)) {
			throw new Error(`Field ${options.fieldId} is not a subrecord field`);
		}
		sublist.currentline[options.fieldId] = null;
		return this;
	};

	@options("sublistId", "line", "ignoreRecalc", "lineInstanceId")
	@required("sublistId", "line")
	removeLine = (options) => {
		const sublist = this.#getSublist(options);
		this.#getLine(options);
		sublist.lines.splice(options.line, 1);
		if (this.isDynamic) {
			if (sublist.lines.length > 0) {
				this.selectLine(options.sublistId, 0);
			} else {
				this.selectNewLine(options.sublistId);
			}
		}
		return this;
	};

	@standardModeOnly()
	@options("sublistId", "fieldId", "line")
	@required("sublistId", "fieldId", "line")
	removeSublistSubrecord = (options) => {
		const line = this.#getLine(options);
		if (!(options.fieldId in line) || !(line[options.fieldId] instanceof Record)) {
			throw new Error(`Field ${options.fieldId} is not a subrecord field`);
		}
		line[options.fieldId] = null;
		return this;
	};

	@options("fieldId")
	@required("fieldId")
	removeSubrecord = (options) => {
		if (!(options.fieldId in this.subrecords)) {
			throw new Error(`Field ${options.fieldId} is not a subrecord field`);
		}
		this.subrecords[options.fieldId] = null;
		return this;
	};

	@addPromise()
	@options("enableSourcing", "ignoreMandatoryFields")
	save = (options) => {
		if (this.id && SuiteScriptMocks.records.get(this).version !== this.version) {
			throw new Error("Record has changed");
		}
		this.version++;
		const copy = new Record(this);
		// change fields that only have value to not be an object so getText works
		Object.entries(copy.fields).forEach(([key, value]) => {
			if (typeof value === "object" && value !== null && !(value instanceof Date) && !("text" in value)) {
				copy.fields[key] = value.value;
			}
		});
		Object.values(copy.sublists).forEach((sublist) => {
			sublist.lines.forEach((line) => {
				Object.entries(line).forEach(([key, value]) => {
					if (typeof value === "object" && value !== null && !(value instanceof Date) && !("text" in value)) {
						line[key] = value.value;
					}
				});
			});
		});
		if (!this.id) {
			this.id = copy.id = Math.max(...Array.from(SuiteScriptMocks.records.values()).map((a) => a.id)) + 1;
			SuiteScriptMocks.createdRecords.push(copy);
		}
		SuiteScriptMocks.records.set(copy);
		SuiteScriptMocks.savedRecords.push(copy);
		return this.id;
	};

	@dynamicModeOnly()
	@options("sublistId", "line")
	@required("sublistId", "line")
	selectLine = (options) => {
		const sublist = this.#getSublist(options);
		if (options.line != this.getCurrentSublistIndex(options.sublistId)) {
			const line = this.#getLine(options);
			sublist.currentline = { ...line };
			sublist.lines = sublist.lines.filter((a) => a._id);
		}
		return this;
	};

	@dynamicModeOnly()
	@options("sublistId")
	@required("sublistId")
	selectNewLine = (options) => {
		const sublist = this.#getSublist(options);
		sublist.currentline = {};
		sublist.lines = sublist.lines.filter((a) => a._id);
		return this;
	};

	setCurrentMatrixSublistValue = (options) => {};

	@dynamicModeOnly()
	@options("sublistId", "fieldId", "text")
	@required("sublistId", "fieldId", "text")
	setCurrentSublistText = (options) => {
		const sublist = this.#getSublist(options);
		sublist.currentline[options.fieldId] = { value: options.text, text: options.text };
		return this;
	};

	@dynamicModeOnly()
	@options("sublistId", "fieldId", "value")
	@required("sublistId", "fieldId", "value")
	setCurrentSublistValue = (options) => {
		const sublist = this.#getSublist(options);
		sublist.currentline[options.fieldId] = { value: options.value };
		return this;
	};

	setMatrixHeaderValue = (options) => {};

	setMatrixSublistValue = (options) => {};

	@standardModeOnly()
	@options("sublistId", "fieldId", "line", "text")
	@required("sublistId", "fieldId", "line", "text")
	setSublistText = (options) => {
		const line = this.#getLine(options);
		line[options.fieldId] = { value: options.text, text: options.text };
		return this;
	};

	@standardModeOnly()
	@options("sublistId", "fieldId", "line", "value")
	@required("sublistId", "fieldId", "line", "value")
	setSublistValue = (options) => {
		const line = this.#getLine(options);
		line[options.fieldId] = { value: options.value };
		return this;
	};

	@options("fieldId", "text", "ignoreFieldChange")
	@required("fieldId", "text")
	setText = (options) => {
		this.fields[options.fieldId] = { value: options.text, text: options.text };
		return this;
	};

	@options("fieldId", "value", "ignoreFieldChange")
	@required("fieldId", "value")
	setValue = (options) => {
		this.fields[options.fieldId] = { value: options.value };
		return this;
	};
}

module.exports = Record;
