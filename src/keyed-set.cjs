const { Tuple } = require("@bloomberg/record-tuple-polyfill")

// Set but with custom keying and iterable
class KeyedSet {
    #map = new Map();
    #indexes = new Map()
    #key = (value) => {
        return Tuple(...Array.from(this.#indexes.keys()).map(keyFunc => keyFunc(value)))
    }

    constructor(...keyFuncs) {
        keyFuncs.forEach(keyFunc => {
            this.#indexes.set((value) => Tuple.from([keyFunc(value)].flat()), new Map())
        })
        return new Proxy(this, {
            get(target, prop) {
                if(prop in target) {
                    return target[prop]
                }
                else if(Number(prop) !== NaN) {
                    const arr = [...target]
                    const index = Number(prop) < 0 ? arr.length - prop : prop
                    return arr[index]
                }
            }
        });
    }

    [Symbol.iterator] = () => {
        return this.#map.values();
    }

    get length() {
        return Array.from(this.#map.values()).length
    }

    add = (value) => {
        if(!this.has(value)) {
            this.set(value)
        }
        return this
    }
    set = (value) => {
        for(const [keyFunc, index] of this.#indexes.entries()) {
            index.set(keyFunc(value), value)
        }
        this.#map.set(this.#key(value), value)
        return this
    }
    clear = () => {
        for(const index of this.#indexes.values()) {
            index.clear()
        }
        this.#map.clear()
    }
    delete = (value) => {
        let record
        for(const [keyFunc, index] of this.#indexes.entries()) {
            record = record || index.get(keyFunc(value))
            index.delete(keyFunc(value))
        }
        return this.#map.delete(this.#key(record))
    }
    entries = () => {
        return this.#map.entries()
    }
    forEach = (callback) => {
        const arr = Array.from(this.#map.values())
        for(const i in arr) {
            callback(arr[i], i, arr)
        }
    }
    get = (value) => {
        if(this.#map.has(this.#key(value))) {
            return this.#map.get(this.#key(value))
        }
        for(const [keyFunc, index] of this.#indexes.entries()) {
            if(index.has(keyFunc(value))) {
                return index.get(keyFunc(value))
            }
        }
        return undefined
    }
    has = (value) => {
        return this.get(value) !== undefined
    }
    keys = () => {
        return this.#map.keys()
    }
    values = () => {
        return this.#map.values()
    }
}

module.exports = KeyedSet