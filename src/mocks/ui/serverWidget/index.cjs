const serverWidgetStub = require("suitecloud-unit-testing-stubs/stubs/serverWidget.js")
const { options, required } = require("../../../helpers.cjs")
const Button = require("./Button.cjs")
const Field = require("./Field.cjs")
const Form = require("./Form.cjs")

class serverWidget {
    Button = Button
    Field = Field
    Form = Form

    AssistantSubmitAction = serverWidgetStub.AssistantSubmitAction
    FieldBreakType = serverWidgetStub.FieldBreakType
    FieldDisplayType = serverWidgetStub.FieldDisplayType
    FieldLayoutType = serverWidgetStub.FieldLayoutType
    FieldType = serverWidgetStub.FieldType
    FormPageLinkType = serverWidgetStub.FormPageLinkType
    LayoutJustification = serverWidgetStub.LayoutJustification
    ListStyle = serverWidgetStub.ListStyle
    SublistDisplayType = serverWidgetStub.SublistDisplayType
    SublistType = serverWidgetStub.SublistType

    @options("title", "hideNavBar")
    @required("title")
    createAssistant = options => {}

    @options("title", "hideNavBar")
    @required("title")
    createForm = options => {
        return new Form(options)
    }

    @options("title", "hideNavBar")
    @required("title")
    createList = options => {

    }
}

module.exports = new serverWidget()