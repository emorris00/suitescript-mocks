const { Tuple } = require("@bloomberg/record-tuple-polyfill");
const _record = require("suitecloud-unit-testing-stubs/stubs/record");
const { addPromise, options } = require("../../helpers.cjs");
const Record = require("./Record");

class record {
    Record = Record

    Type = _record.Type

    _addRecords = records => {
        records.forEach(record => {
            Record.records.set(Tuple(record.type, record.id), record)
        })
        return this
    }

    _getSavedRecord = (type) => {
        let index = 0
        if(type) {
            index = Record.savedRecords.findIndex(record => record.type === type)
        }
        return Record.savedRecords.splice(index, 1)[0]
    }

    @addPromise()
    @options("record", "to", "attributes")
    attach = options => {}

    @addPromise()
    @options("type", "id", "isDynamic", "defaultValues")
    copy = options => {
        const record = this.load(options)
        record.id = null
        return record
    }

    @addPromise()
    @options("type", "isDynamic", "defaultValues")
    create = options => {
        return new Record({
            id: null,
            type: options.type,
            isDynamic: options?.isDynamic,
            fields: options?.defaultValues
        })
    }

    @addPromise()
    @options("type", "id")
    delete = options => {
        return Record.records.delete(Tuple(options.type, options.id)) && options.id || false
    }

    @addPromise()
    @options("record", "from", "attributes")
    detach = options => {}

    @addPromise()
    @options("type", "id", "isDynamic", "defaultValues")
    load = options => {
        try {
            let record = Record.records.get(Tuple(options.type, options.id))
            if(!record) {
                throw new Error("Record does not exist")
            }
            record = new Record({
                ...record,
                isDynamic: Boolean(options.isDynamic) || false,
                fields: {
                    ...record.fields,
                    ...(options.defaultValues || {})
                },
            })
            return record
        }
        catch(e) {
            console.log("ERROR", e)
        }
    }

    @addPromise()
    @options("type", "id", "values", "options")
    submitFields = options => {
        const record = Record.records.get(Tuple(options.type, options.id))
        record.fields = {
            ...record.fields,
            ...options.values
        }
        return record.id
    }

    @addPromise()
    @options("fromType", "fromId", "toType", "isDynamic", "defaultValues")
    transform = options => {
        const record = this.load(options.fromType, options.fromId, options.isDynamic, options.defaultValues)
        record.type = options.toType
        record.id = null
        return record
    }
}

module.exports = new record()