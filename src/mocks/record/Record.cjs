
const structuredClone = require('core-js-pure/actual/structured-clone');
const { randomUUID } = require("node:crypto")
const SuiteScriptMocks = require("../../index.cjs")
const { options, required, addPromise, dynamicModeOnly, standardModeOnly } = require("../../helpers.cjs");

class Record {
    id
    type
    fields = {}
    sublists = {}
    subrecords = {}
    isDynamic = false
    version = 1

    constructor({id, type, fields, sublists, subrecords, isDynamic, version}) {
        this.id = id || null
        this.type = type || null
        this.fields = structuredClone(fields || {})
        this.sublists = Object.entries(structuredClone(sublists) || {}).reduce((acc, [key, value]) => {
            acc[key] = {
                currentline: {},
                lines: "lines" in value ? value.lines : value
            }
            return acc
        }, {})
        this.subrecords = Object.entries(subrecords || {}).reduce((acc, [key, value]) => {
            acc[key] = new Record(value)
            return acc
        }, {})
        this.isDynamic = Boolean(isDynamic) || false
        this.version = version || 1
    }

    @dynamicModeOnly()
    @options("sublistId")
    @required("sublistId")
    cancelLine = options => {
        this.selectNewLine(options.sublistId)
    }

    @dynamicModeOnly()
    @options("sublistId", "ignoreRecalc")
    @required("sublistId")
    commitLine = options => {
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

    @dynamicModeOnly()
    @options("sublistId", "fieldId")
    @required("sublistId", "fieldId")
    getCurrentSublistValue = options => {
        const sublist = this.sublists[options.sublistId]
        if(sublist === undefined) {
            return null
        }
        if(!("currentline" in sublist)) {
            this.selectNewLine(sublist)
        }
        const field = sublist.currentline[options.fieldId]
        if(typeof field === "object" && field !== null) {
            return field.value
        }
        return field
    }

    getField = options => {}

    getFields = options => {}

    @options("sublistId")
    @required("sublistId")
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
    @required("sublistId", "fieldId", "line")
    getSublistValue = options => {
        const field = this.sublists[options.sublistId].lines[options.line][options.fieldId]
        if(typeof field === "object" && field !== null) {
            return field.value
        }
        return field
    }

    @options("fieldId")
    @required("fieldId")
    getSubrecord = options => {
        if(!(options.fieldId in this.subrecords)) {
            throw new Error("Subrecord does not exist.")
        }
        return this.subrecords[options.fieldId]
    }

    @options("fieldId")
    @required("fieldId")
    getText = options => {
        const field = this.fields[options.fieldId]
        if(typeof field === "object" && field !== null) {
            if(!this.isDynamic && !("text" in field)) {
                throw new Error("Cannot use getText on field that has had value but not text set in standard mode")
            }
            return field.text
        }
        return field
    }

    @options("fieldId")
    @required("fieldId")
    getValue = options => {
        const field = this.fields[options.fieldId]
        if(typeof field === "object" && field !== null) {
            return field.value
        }
        return field
    }

    hasCurrentSublistSubrecord = options => {}

    hasSublistSubrecord = options => {}

    hasSubrecord = options => {}

    insertLine = options => {}

    moveLine = options => {}

    removeCurrentSublistSubrecord = options => {}

    @options("sublistId", "line", "ignoreRecalc", "lineInstanceId")
    @required("sublistId", "line")
    removeLine = options => {
        const sublist = this.sublists[options.sublistId]
        if(sublist === undefined || !(options.line in sublist.lines)) {
            throw new Error()
        }
        sublist.lines.splice(options.line, 1)
    }

    removeSublistSubrecord = options => {}

    removeSubrecord = options => {}

    @addPromise()
    @options("enableSourcing", "ignoreMandatoryFields")
    save = options => {
        if(this.id && SuiteScriptMocks.records.get(this).version !== this.version) {
            throw new Error("Record has changed")
        }
        this.version++
        const copy = new Record(this)
        // change fields that only have value to not be an object so getText works
        Object.entries(copy.fields).forEach(([key, value]) => {
            if(typeof value === "object" && value !== null && !("text" in value)) {
                copy.fields[key] = value.value
            }
        })
        Object.values(copy.sublists).forEach(sublist => {
            sublist.lines.forEach(line => {
                Object.entries(line).forEach(([key, value]) => {
                    if(typeof value === "object" && value !== null && !("text" in value)) {
                        line[key] = value.value
                    }
                })
            })
        })
        if(!this.id) {
            this.id = copy.id = Math.max(Array.from(SuiteScriptMocks.records.values).map(a => a.id)) + 1
            SuiteScriptMocks.createdRecords.push(copy)
        }
        SuiteScriptMocks.records.set(copy)
        SuiteScriptMocks.savedRecords.push(copy)
        return this.id
    }

    // TODO: edge case where if first line select you do is n + 1 it will give a new line
    @dynamicModeOnly()
    @options("sublistId", "line")
    @required("sublistId", "line")
    selectLine = options => {
        const sublist = this.sublists[options.sublistId]
        if(sublist === undefined || !(options.line in sublist.lines)) {
            throw new Error("sublist or line does not exist")
        }
        sublist.currentline = {...sublist.lines[options.line]}
    }

    @dynamicModeOnly()
    @options("sublistId")
    @required("sublistId")
    selectNewLine = options => {
        const sublist = this.sublists[options.sublistId]
        if(sublist === undefined) {
            throw new Error("sublist does not exist")
        }
        sublist.currentline = {
            _id: randomUUID()
        }
    }

    setCurrentMatrixSublistValue = options => {}

    setCurrentSublistText = options => {}

    @dynamicModeOnly()
    @options("sublistId", "fieldId", "value")
    @required("sublistId", "fieldId", "value")
    setCurrentSublistValue = options => {
        const sublist = this?.sublists?.[options.sublistId]
        if(sublist === undefined || !("currentline" in sublist)) {
            throw new Error()
        }
        return sublist.currentline[options.fieldId] = {value: options.value}
    }

    setMatrixHeaderValue = options => {}

    setMatrixSublistValue = options => {}

    setSublistText = options => {}

    @standardModeOnly()
    @options("sublistId", "fieldId", "line", "value")
    @required("sublistId", "fieldId", "line", "value")
    setSublistValue = options => {
        const sublist = this?.sublists?.[options.sublistId]
        if(sublist === undefined || !(options.line in sublist.lines)) {
            throw new Error("sublist or line doesn't exist")
        }
        sublist.lines[options.line][options.fieldId] = {value: options.value}
    }

    @options("fieldId", "text", "ignoreFieldChange")
    @required("fieldId", "text")
    setText = options => {
        this.fields[options.fieldId] = {value: options.text, text: options.text}
        return this
    }

    @options("fieldId", "value", "ignoreFieldChange")
    @required("fieldId", "value")
    setValue = options => {
        this.fields[options.fieldId] = {value: options.value}
        return this
    }
}

module.exports = Record