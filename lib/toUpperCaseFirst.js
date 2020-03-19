var changeCase = require('change-case');

function toUpperCaseFirst(column) {
    column.TABLE_NAME = changeCase.upperCaseFirst(column.TABLE_NAME);
}

module.exports = toUpperCaseFirst;