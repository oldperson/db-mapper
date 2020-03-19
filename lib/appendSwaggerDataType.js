
function appendSwaggerDataTyp(column) {
    switch(column.DATA_TYPE) {
        case 'bigint':
            column.swagType = 'integer';
            break;
        case 'int':
            column.swagType = 'integer';
            break;
        case 'timestamp':
            column.swagType = 'string';
            break;
        default:
            column.swagType = 'string';
            break;
      }
}

module.exports = appendSwaggerDataTyp;