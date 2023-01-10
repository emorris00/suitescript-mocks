const { assignConstructor } = require("../../helpers.cjs")

@assignConstructor()
class EntityDeduplicationTask {
    dedupeMode
    entityType
    id
    masterRecordId
    masterSelectionMode
    recordIds

    submit = () => {}
}

module.exports = EntityDeduplicationTask