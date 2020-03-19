var changeCase = require('change-case');

function toCamaelCase(column) {
    column.TABLE_NAME = changeCase.camelCase(column.TABLE_NAME);
    column.COLUMN_NAME = changeCase.camelCase(column.COLUMN_NAME);
}

module.exports = toCamaelCase;