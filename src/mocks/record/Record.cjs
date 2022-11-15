const { randomUUID } = require("node:crypto")
const { options, addPromise } = require("../../helpers.cjs")
const record = require("./index.cjs")

class Record {
    static records = new Map()
    static savedRecords = []

    constructor({id, type, fields, sublists, subrecords, isDynamic}) {
        this.id = id || null
        this.type = type || null
        this.fields = fields || {}
        this.sublists = Object.entries(sublists || {}).reduce((acc, [key, value]) => {
            delete value.currentline
            acc[key] = {
                currentline: {},
                lines: Object.values(value).map(a => {
                    if(!a._id) {
                        a._id = randomUUID()
                    }
                    return a
                })
            }
            return acc
        }, {})
        this.subrecords = subrecords || {}
        this.isDynamic = Boolean(isDynamic) || false
    }

    @options("sublistId")
    cancelLine = options => {
        this.selectNewLine(options.sublistId)
    }

    @options("sublistId", "ignoreRecalc")
    commitLine = options => {
        if(!this.isDynamic) {
            throw new Error()
        }
        const sublist = this?.sublists?.[options.sublistId]
        if(sublist === undefined || !("currentline" in sublist)) {
            throw new Error()
        }
        const existingIndex = sublist.lines.findIndex(a => a._id === sublist.currentline._id)
        if(existingIndex > -1) {
            sublist.lines[existingIndex] = sublist.currentline
        }
        else {
            sublist.lines.push(sublist.currentline)
        }
        this.selectNewLine(options.sublistId)
    }

    @addPromise()
    executeMacro = options => {}

    findMatrixSublistLineWithValue = options => {}

    findSublistLineWithValue = options => {}

    getCurrentMatrixSublistValue = options => {}

    getCurrentSublistField = options => {}

    getCurrentSublistIndex = options => {}

    getCurrentSublistSubrecord = options => {}

    getCurrentSublistText = options => {}

    @options("sublistId", "fieldId")
    getCurrentSublistValue = options => {
        if(!this.isDynamic) {
            throw new Error()
        }
        const sublist = this.sublists[options.sublistId]
        if(sublist === undefined || !("currentline" in sublist)) {
            throw new Error()
        }
        return sublist.currentline[options.fieldId]
    }

    getField = options => {}

    getFields = options => {}

    @options("sublistId")
    getLineCount = options => {
        const sublist = this.sublists[options.sublistId]
        if(sublist === undefined) {
            return -1
        }
        return sublist.lines.length
    }

    getMacro = options => {}

    getMacros = options => {}

    getMatrixHeaderCount = options => {}

    getMatrixHeaderField = options => {}

    getMatrixHeaderValue = options => {}

    getMatrixSublistField = options => {}

    getMatrixSublistValue = options => {}

    getSublist = options => {}

    getSublists = options => {}

    getSublistField = options => {}

    getSublistFields = options => {}

    getSublistSubrecord = options => {}

    getSublistText = options => {}

    @options("sublistId", "fieldId", "line")
    getSublistValue = options => {
        const sublist = this.sublists[options.sublistId]
        if(sublist === undefined) {
            throw new Error()
        }
        return sublist.lines[options.line][options.fieldId]
    }

    @options("fieldId")
    getSubrecord = options => {
        return this.subrecords[options.fieldId]
    }

    getText = options => {}

    @options("fieldId")
    getValue = options => {
        return this.fields[options.fieldId]
    }

    hasCurrentSublistSubrecord = options => {}

    hasSublistSubrecord = options => {}

    hasSubrecord = options => {}

    insertLine = options => {}

    moveLine = options => {}

    removeCurrentSublistSubrecord = options => {}

    @options("sublistId", "line", "ignoreRecalc", "lineInstanceId")
    removeLine = options => {
        const sublist = this.sublists[options.sublistId]
        if(sublist === undefined) {
            throw new Error()
        }
        sublist.lines.splice(options.line, 1)
    }

    removeSublistSubrecord = options => {}

    removeSubrecord = options => {}

    @addPromise()
    @options("enableSourcing", "ignoreMandatoryFields")
    save = options => {
        if(!this.id) {
            this.id = Math.max(Array.from(Record.records.values).map(a => a.id)) + 1
        }
        Record.records.set(Tuple(this.type, this.id), this)
        Record.savedRecords.push(this)
        return this.id
    }

    // TODO: edge case where if first line select you do is n + 1 it will give a new line
    @options("sublistId", "line")
    selectLine = options => {
        const sublist = this.sublists[options.sublistId]
        if(sublist === undefined) {
            throw new Error()
        }
        sublist.currentline = {...sublist.lines[options.line]}
    }

    @options("sublistId")
    selectNewLine = options => {
        if(!this.isDynamic) {
            throw new Error()
        }
        const sublist = this.sublists[options.sublistId]
        if(sublist === undefined) {
            throw new Error()
        }
        sublist.currentline = {
            _id: randomUUID()
        }
    }

    setCurrentMatrixSublistValue = options => {}

    setCurrentSublistText = options => {}

    @options("sublistId", "fieldId", "value")
    setCurrentSublistValue = options => {
        if(!this.isDynamic) {
            throw new Error()
        }
        const sublist = this?.sublists?.[options.sublistId]
        if(sublist === undefined || !("currentline" in sublist)) {
            throw new Error()
        }
        return sublist.currentline[options.fieldId] = options.value
    }

    setMatrixHeaderValue = options => {}

    setMatrixSublistValue = options => {}

    setSublistText = options => {}

    @options("sublistId", "fieldId", "line", "value")
    setSublistValue = options => {
        const sublist = this?.sublists?.[options.sublistId]
        if(sublist === undefined) {
            throw new Error()
        }
        sublist.lines[options.line][options.fieldId] = options.value
    }

    @options("fieldId", "text", "ignoreFieldChange")
    setText = options => {}

    @options("fieldId", "value", "ignoreFieldChange")
    setValue = options => {
        return this.fields[options.fieldId] = options.value
    }
}

module.exports = Record