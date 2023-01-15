const {
  Tuple
} = require("@bloomberg/record-tuple-polyfill");

// Set but with custom keying and iterable
class KeyedSet {
  #map = new Map();
  #indexes = new Map();
  #key = value => {
    /* eslint-disable */
    return Tuple(...Array.from(this.#indexes.keys()).map(keyFunc => keyFunc(value)));
  };
  constructor(...keyFuncs) {
    keyFuncs.forEach(keyFunc => {
      this.#indexes.set(value => Tuple.from([keyFunc(value)].flat()), new Map());
    });
    return new Proxy(this, {
      get(target, prop) {
        if (prop in target) {
          return target[prop];
        } else if (!isNaN(prop)) {
          const arr = [...target];
          const index = Number(prop) < 0 ? arr.length - prop : prop;
          return arr[index];
        }
      }
    });
  }
  [Symbol.iterator] = () => {
    return this.#map.values();
  };
  get length() {
    return Array.from(this.#map.values()).length;
  }
  add = value => {
    if (!this.has(value)) {
      this.set(value);
    }
    return this;
  };
  set = value => {
    for (const [keyFunc, index] of this.#indexes.entries()) {
      index.set(keyFunc(value), value);
    }
    this.#map.set(this.#key(value), value);
    return this;
  };
  clear = () => {
    for (const index of this.#indexes.values()) {
      index.clear();
    }
    this.#map.clear();
  };
  delete = value => {
    let record;
    for (const [keyFunc, index] of this.#indexes.entries()) {
      record = record || index.get(keyFunc(value));
      index.delete(keyFunc(value));
    }
    return this.#map.delete(this.#key(record));
  };
  entries = () => {
    return this.#map.entries();
  };
  forEach = callback => {
    Array.from(this.#map.values()).forEach((val, i, arr) => {
      callback(val, i, arr);
    });
  };
  get = value => {
    if (this.#map.has(this.#key(value))) {
      return this.#map.get(this.#key(value));
    }
    for (const [keyFunc, index] of this.#indexes.entries()) {
      if (index.has(keyFunc(value))) {
        return index.get(keyFunc(value));
      }
    }
    return undefined;
  };
  has = value => {
    return this.get(value) !== undefined;
  };
  keys = () => {
    return this.#map.keys();
  };
  values = () => {
    return this.#map.values();
  };
}
module.exports = KeyedSet;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJUdXBsZSIsInJlcXVpcmUiLCJLZXllZFNldCIsIm1hcCIsIk1hcCIsImluZGV4ZXMiLCJrZXkiLCJ2YWx1ZSIsIkFycmF5IiwiZnJvbSIsImtleXMiLCJrZXlGdW5jIiwiY29uc3RydWN0b3IiLCJrZXlGdW5jcyIsImZvckVhY2giLCJzZXQiLCJmbGF0IiwiUHJveHkiLCJnZXQiLCJ0YXJnZXQiLCJwcm9wIiwiaXNOYU4iLCJhcnIiLCJpbmRleCIsIk51bWJlciIsImxlbmd0aCIsIlN5bWJvbCIsIml0ZXJhdG9yIiwidmFsdWVzIiwiYWRkIiwiaGFzIiwiZW50cmllcyIsImNsZWFyIiwiZGVsZXRlIiwicmVjb3JkIiwiY2FsbGJhY2siLCJ2YWwiLCJpIiwidW5kZWZpbmVkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uL3NyYy9rZXllZC1zZXQuY2pzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgVHVwbGUgfSA9IHJlcXVpcmUoXCJAYmxvb21iZXJnL3JlY29yZC10dXBsZS1wb2x5ZmlsbFwiKTtcblxuLy8gU2V0IGJ1dCB3aXRoIGN1c3RvbSBrZXlpbmcgYW5kIGl0ZXJhYmxlXG5jbGFzcyBLZXllZFNldCB7XG5cdCNtYXAgPSBuZXcgTWFwKCk7XG5cdCNpbmRleGVzID0gbmV3IE1hcCgpO1xuXHQja2V5ID0gKHZhbHVlKSA9PiB7XG5cdFx0LyogZXNsaW50LWRpc2FibGUgKi9cblx0XHRyZXR1cm4gVHVwbGUoLi4uQXJyYXkuZnJvbSh0aGlzLiNpbmRleGVzLmtleXMoKSkubWFwKChrZXlGdW5jKSA9PiBrZXlGdW5jKHZhbHVlKSkpO1xuXHR9O1xuXG5cdGNvbnN0cnVjdG9yKC4uLmtleUZ1bmNzKSB7XG5cdFx0a2V5RnVuY3MuZm9yRWFjaCgoa2V5RnVuYykgPT4ge1xuXHRcdFx0dGhpcy4jaW5kZXhlcy5zZXQoKHZhbHVlKSA9PiBUdXBsZS5mcm9tKFtrZXlGdW5jKHZhbHVlKV0uZmxhdCgpKSwgbmV3IE1hcCgpKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gbmV3IFByb3h5KHRoaXMsIHtcblx0XHRcdGdldCh0YXJnZXQsIHByb3ApIHtcblx0XHRcdFx0aWYgKHByb3AgaW4gdGFyZ2V0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRhcmdldFtwcm9wXTtcblx0XHRcdFx0fSBlbHNlIGlmICghaXNOYU4ocHJvcCkpIHtcblx0XHRcdFx0XHRjb25zdCBhcnIgPSBbLi4udGFyZ2V0XTtcblx0XHRcdFx0XHRjb25zdCBpbmRleCA9IE51bWJlcihwcm9wKSA8IDAgPyBhcnIubGVuZ3RoIC0gcHJvcCA6IHByb3A7XG5cdFx0XHRcdFx0cmV0dXJuIGFycltpbmRleF07XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0fSk7XG5cdH1cblxuXHRbU3ltYm9sLml0ZXJhdG9yXSA9ICgpID0+IHtcblx0XHRyZXR1cm4gdGhpcy4jbWFwLnZhbHVlcygpO1xuXHR9O1xuXG5cdGdldCBsZW5ndGgoKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20odGhpcy4jbWFwLnZhbHVlcygpKS5sZW5ndGg7XG5cdH1cblxuXHRhZGQgPSAodmFsdWUpID0+IHtcblx0XHRpZiAoIXRoaXMuaGFzKHZhbHVlKSkge1xuXHRcdFx0dGhpcy5zZXQodmFsdWUpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblx0c2V0ID0gKHZhbHVlKSA9PiB7XG5cdFx0Zm9yIChjb25zdCBba2V5RnVuYywgaW5kZXhdIG9mIHRoaXMuI2luZGV4ZXMuZW50cmllcygpKSB7XG5cdFx0XHRpbmRleC5zZXQoa2V5RnVuYyh2YWx1ZSksIHZhbHVlKTtcblx0XHR9XG5cdFx0dGhpcy4jbWFwLnNldCh0aGlzLiNrZXkodmFsdWUpLCB2YWx1ZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH07XG5cdGNsZWFyID0gKCkgPT4ge1xuXHRcdGZvciAoY29uc3QgaW5kZXggb2YgdGhpcy4jaW5kZXhlcy52YWx1ZXMoKSkge1xuXHRcdFx0aW5kZXguY2xlYXIoKTtcblx0XHR9XG5cdFx0dGhpcy4jbWFwLmNsZWFyKCk7XG5cdH07XG5cdGRlbGV0ZSA9ICh2YWx1ZSkgPT4ge1xuXHRcdGxldCByZWNvcmQ7XG5cdFx0Zm9yIChjb25zdCBba2V5RnVuYywgaW5kZXhdIG9mIHRoaXMuI2luZGV4ZXMuZW50cmllcygpKSB7XG5cdFx0XHRyZWNvcmQgPSByZWNvcmQgfHwgaW5kZXguZ2V0KGtleUZ1bmModmFsdWUpKTtcblx0XHRcdGluZGV4LmRlbGV0ZShrZXlGdW5jKHZhbHVlKSk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLiNtYXAuZGVsZXRlKHRoaXMuI2tleShyZWNvcmQpKTtcblx0fTtcblx0ZW50cmllcyA9ICgpID0+IHtcblx0XHRyZXR1cm4gdGhpcy4jbWFwLmVudHJpZXMoKTtcblx0fTtcblx0Zm9yRWFjaCA9IChjYWxsYmFjaykgPT4ge1xuXHRcdEFycmF5LmZyb20odGhpcy4jbWFwLnZhbHVlcygpKS5mb3JFYWNoKCh2YWwsIGksIGFycikgPT4ge1xuXHRcdFx0Y2FsbGJhY2sodmFsLCBpLCBhcnIpO1xuXHRcdH0pO1xuXHR9O1xuXHRnZXQgPSAodmFsdWUpID0+IHtcblx0XHRpZiAodGhpcy4jbWFwLmhhcyh0aGlzLiNrZXkodmFsdWUpKSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuI21hcC5nZXQodGhpcy4ja2V5KHZhbHVlKSk7XG5cdFx0fVxuXHRcdGZvciAoY29uc3QgW2tleUZ1bmMsIGluZGV4XSBvZiB0aGlzLiNpbmRleGVzLmVudHJpZXMoKSkge1xuXHRcdFx0aWYgKGluZGV4LmhhcyhrZXlGdW5jKHZhbHVlKSkpIHtcblx0XHRcdFx0cmV0dXJuIGluZGV4LmdldChrZXlGdW5jKHZhbHVlKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH07XG5cdGhhcyA9ICh2YWx1ZSkgPT4ge1xuXHRcdHJldHVybiB0aGlzLmdldCh2YWx1ZSkgIT09IHVuZGVmaW5lZDtcblx0fTtcblx0a2V5cyA9ICgpID0+IHtcblx0XHRyZXR1cm4gdGhpcy4jbWFwLmtleXMoKTtcblx0fTtcblx0dmFsdWVzID0gKCkgPT4ge1xuXHRcdHJldHVybiB0aGlzLiNtYXAudmFsdWVzKCk7XG5cdH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gS2V5ZWRTZXQ7XG4iXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07RUFBRUE7QUFBTSxDQUFDLEdBQUdDLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQzs7QUFFN0Q7QUFDQSxNQUFNQyxRQUFRLENBQUM7RUFDZCxDQUFDQyxHQUFHLEdBQUcsSUFBSUMsR0FBRyxFQUFFO0VBQ2hCLENBQUNDLE9BQU8sR0FBRyxJQUFJRCxHQUFHLEVBQUU7RUFDcEIsQ0FBQ0UsR0FBRyxHQUFJQyxLQUFLLElBQUs7SUFDakI7SUFDQSxPQUFPUCxLQUFLLENBQUMsR0FBR1EsS0FBSyxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUNKLE9BQU8sQ0FBQ0ssSUFBSSxFQUFFLENBQUMsQ0FBQ1AsR0FBRyxDQUFFUSxPQUFPLElBQUtBLE9BQU8sQ0FBQ0osS0FBSyxDQUFDLENBQUMsQ0FBQztFQUNuRixDQUFDO0VBRURLLFdBQVcsQ0FBQyxHQUFHQyxRQUFRLEVBQUU7SUFDeEJBLFFBQVEsQ0FBQ0MsT0FBTyxDQUFFSCxPQUFPLElBQUs7TUFDN0IsSUFBSSxDQUFDLENBQUNOLE9BQU8sQ0FBQ1UsR0FBRyxDQUFFUixLQUFLLElBQUtQLEtBQUssQ0FBQ1MsSUFBSSxDQUFDLENBQUNFLE9BQU8sQ0FBQ0osS0FBSyxDQUFDLENBQUMsQ0FBQ1MsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJWixHQUFHLEVBQUUsQ0FBQztJQUM3RSxDQUFDLENBQUM7SUFDRixPQUFPLElBQUlhLEtBQUssQ0FBQyxJQUFJLEVBQUU7TUFDdEJDLEdBQUcsQ0FBQ0MsTUFBTSxFQUFFQyxJQUFJLEVBQUU7UUFDakIsSUFBSUEsSUFBSSxJQUFJRCxNQUFNLEVBQUU7VUFDbkIsT0FBT0EsTUFBTSxDQUFDQyxJQUFJLENBQUM7UUFDcEIsQ0FBQyxNQUFNLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUMs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