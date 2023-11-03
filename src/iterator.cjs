class Iterator {
	values = [];
	pointer = -1;

	constructor(values) {
		this.values = values;
	}

	next = () => {
		this.pointer = Math.min(this.pointer + 1, this.values.length);
		return { value: this.values[this.pointer], done: this.pointer >= this.values.length };
	};

	each = (callback) => {
		let value;
		while (!(value = this.next()).done) {
			if (callback({ value: value.value }) !== true) break;
		}
	};
}

module.exports = Iterator;
