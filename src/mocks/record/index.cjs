const recordStub = require("suitecloud-unit-testing-stubs/stubs/record");
const SuiteScriptMocks = require("../../index.cjs");
const { addPromise, options } = require("../../helpers.cjs");
const Record = require("./Record.cjs");

class record {
    Record = Record

    Type = recordStub.Type

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
        if(!SuiteScriptMocks.records.has(options)) {
            throw new Error("Record does not exist")
        }
        return SuiteScriptMocks.records.delete(options) && options.id || false
    }

    @addPromise()
    @options("record", "from", "attributes")
    detach = options => {}

    @addPromise()
    @options("type", "id", "isDynamic", "defaultValues")
    load = options => {
        let record = SuiteScriptMocks.records.get(options)
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

    @addPromise()
    @options("type", "id", "values", "options")
    submitFields = options => {
        const record = SuiteScriptMocks.records.get(options)
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