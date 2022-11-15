function fieldInitDecorator(target) {
    return function(...args) {
        return function(_, context) {
            if(context.kind === "field") {
                return function(value) {
                    return target(...args)(value, context)
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
    addPromise() {
        return function(value) {
            value.promise = async function() {
                value(...arguments)
            }
            return value
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

const decorators = new Decorators()

module.exports = {
    options: decorators.options,
    addPromise: decorators.addPromise,
    mock: decorators.mock,
    UserEventType,
    createUserEventContext
}