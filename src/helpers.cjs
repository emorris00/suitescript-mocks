const { Record } = require("@bloomberg/record-tuple-polyfill")

function fieldInitDecorator(target) {
    return function(...args) {
        return function(_, context) {
            if(context.kind === "field") {
                return function(value) {
                    return (target(...args).bind(this))(value, context)
                }
            }
        }
    }
}

class Decorators {
    @fieldInitDecorator
    options(...keys) {
        return function(value) {
            return function(...options) {
                if(typeof options[0] !== "object") {
                    options = options.reduce((acc, cur, i) => {
                        acc[keys[i]] = cur
                        return acc
                    }, {})
                }
                else {
                    options = options[0]
                }
                return value(options)
            }
        }
    }

    @fieldInitDecorator
    required(...keys) {
        return function(value) {
            return function(options) {
                keys.forEach(key => {
                    if(!(key in options) || options[key] === undefined) {
                        throw new Error(`missing required option '${key}'`)
                    }
                })
                return value(options)
            }
        }
    }

    @fieldInitDecorator
    addPromise() {
        return function(value) {
            value.promise = async function() {
                value(...arguments)
            }
            return value
        }
    }

    @fieldInitDecorator
    dynamicModeOnly() {
        return function(value) {
            return function() {
                if(!this.isDynamic) {
                    throw new Error(`cannot be run in standard mode`)
                }
                return value(...arguments)
            }
        }
    }

    @fieldInitDecorator
    standardModeOnly() {
        return function(value) {
            return function() {
                if(this.isDynamic) {
                    throw new Error(`cannot be run in dynamic mode`)
                }
                return value(...arguments)
            }
        }
    }

    @fieldInitDecorator
    keyedSetGetSet() {
        return function(value, context) {
            Object.defineProperty(this, context.name.replace("#", ""), {
                get: () => value,
                set: (values) => {
                    value.clear()
                    for(const a of values) {
                        value.add(a)
                    }
                }
            })
            return value
        }
    }

    assignConstructor() {
        return function(target, context) {
            return class extends target {
                constructor(values) {
                    super()
                    if(typeof values === "object" && values !== undefined) {
                        Object.entries(values).forEach(([key, value]) => {
                            if(key in this) {
                                this[key] = value
                            }
                        })
                    }
                }
            }
        }
    }
}

const UserEventType = {
    APPROVE        : "approve",
    CANCEL         : "cancel",
    CHANGEPASSWORD : "changepassword",
    COPY           : "copy",
    CREATE         : "create",
    DELETE         : "delete",
    DROPSHIP       : "dropship",
    EDIT           : "edit",
    EDITFORECAST   : "editforecast",
    EMAIL          : "email",
    MARKCOMPLETE   : "markcomplete",
    ORDERITEMS     : "orderitems",
    PACK           : "pack",
    PAYBILLS       : "paybills",
    PRINT          : "print",
    QUICKVIEW      : "quickview",
    REASSIGN       : "reassign",
    REJECT         : "reject",
    SHIP           : "ship",
    SPECIALORDER   : "specialorder",
    TRANSFORM      : "transform",
    VIEW           : "view",
    XEDIT          : "xedit",
}

function createUserEventContext(type, oldRecord, newRecord) {
    return {
        type,
        oldRecord,
        newRecord,
        UserEventType
    }
}

function toRecord(obj) {
    return Record.fromEntries(Object.entries(obj).filter(([_, value]) => !["object", "function"].includes(typeof value)))
}

const decorators = new Decorators()

module.exports = {
    options: decorators.options,
    required: decorators.required,
    addPromise: decorators.addPromise,
    dynamicModeOnly: decorators.dynamicModeOnly,
    standardModeOnly: decorators.standardModeOnly,
    keyedSetGetSet: decorators.keyedSetGetSet,
    assignConstructor: decorators.assignConstructor,
    mock: decorators.mock,
    UserEventType,
    createUserEventContext,
    toRecord: toRecord
}