
const { options, required, assignConstructor } = require("../../../helpers.cjs");
const Field = require("./Field.cjs");
const Button = require("./Button.cjs");

@assignConstructor()
class Form {
    title
    clientScriptFileId
    clientScriptModulePath

    @options("id", "label", "functionName")
    @required("id", "label")
    addButton = options => {
        return new Button(options)
    }

    @options("id", "label", "restrictToDomains", "restrictToScriptIds", "restrictToCurrentUser", "container")
    @required("id", "label", "restrictToDomains", "restrictToScriptIds")
    addCredentialField = options => {}

    @options("id", "label", "type", "source", "container")
    @required("id", "label", "type")
    addField = options => {
        if(!options.id.startsWith("custpage")) {
            throw new Error("Field id must begin with custpage")
        }
        return new Field(options)
    }

    @options("id", "label", "tab")
    @required("id", "label")
    addFieldGroup = options => {}

    addPageInitMessage = options => {}

    @options("title", "type", "url")
    @required("title", "type", "url")
    addPageLink = options => {}

    @options("label")
    addResetButton = options => {}

    @options("id", "restrictToScriptIds", "label", "restrictToCurrentUser", "container")
    @required("id", "restrictToScriptIds", "label")
    addSecretKeyField = options => {}

    @options("id", "label", "type", "tab")
    @required("id", "label", "type")
    addSublist = options => {}

    @options("label")
    addSubmitButton = options => {}

    @options("id", "label", "tab")
    @required("id", "label")
    addSubtab = options => {}

    @options("id", "label")
    @required("id", "label")
    addTab = options => {}

    @options("id")
    @required("id")
    getButton = options => {}

    @options("id")
    @required("id")
    getField = options => {}

    @options("id")
    @required("id")
    getSublist = options => {}

    @options("id")
    @required("id")
    getSubtab = options => {}

    @options("id")
    @required("id")
    getTab = options => {}

    getTabs = () => {}

    @options("field", "nextfield")
    @required("field", "nextfield")
    insertField = options => {}

    @options("sublist", "nextsublist")
    @required("sublist", "nextsublist")
    insertSublist = options => {}

    @options("subtab", "nextsub")
    @required("subtab", "nextsub")
    insertSubtab = options => {}

    @options("tab", "nexttab")
    @required("tab", "nexttab")
    insertTab = options => {}

    @options("id")
    @required("id")
    removeButton = options => {}

    updateDefaultValues = values => {}
}

module.exports = Form