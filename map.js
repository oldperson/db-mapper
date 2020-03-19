var mysql      = require('mysql');
var toCamelCase = require('./lib/toCamelCase');
const appendSwaggerDataType = require('./lib/appendSwaggerDataType');
const toSwaggerDefinition = require('./lib/toSwaggerDefinition');
const toUpperCaseFirst = require('./lib/toUpperCaseFirst');


// DB_HOST=0.0.0.0
// DB_PORT=3307
// DB_DATABASE=baifore
// DB_USERNAME=root
// DB_PASSWORD=root

const schema = 'baifore';

var connection = mysql.createConnection({
    host     : '0.0.0.0',
    port: 3307,
    user     : 'root',
    password : 'root',
    database: schema,
});

connection.query('SELECT 1', function (error, results, fields) {
  if (error) throw error;
  // connected!
  console.log('connected!');
});

const listAllColumnsSql = `SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, COLUMN_COMMENT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE table_name in ('scriptures')
AND table_schema = '${schema}'`;


const processes = [
    toCamelCase,
    toUpperCaseFirst,
    appendSwaggerDataType,
];

connection.query(listAllColumnsSql, function (error, results, fields) {
    if (error) throw error;
 
    // column = {
    //     TABLE_NAME: 'blocks',
    //     COLUMN_NAME: 'updated_at',
    //     DATA_TYPE: 'timestamp',
    //     COLUMN_COMMENT: '',
    //     swagType
    // }
    for (const process of processes) {
        for (const column of results) {
            process(column);
        }
    }

    const models = results.reduce((models, column) => {
        // {
        //     name: 'tableName',
        //     columns: [],
        // }
        if (!models[column.TABLE_NAME]) {
            models[column.TABLE_NAME] = {};
            models[column.TABLE_NAME].columns = [];
            models[column.TABLE_NAME].name = column.TABLE_NAME;
        }
        models[column.TABLE_NAME].columns.push(column);
        
        return models;
    }, {});

    console.log(models);

    const swaggerDefinitions = [];
    for (const key in models) {
        swaggerDefinitions.push(toSwaggerDefinition(models[key]));
    }

    console.log(swaggerDefinitions.join('\n'));
    
  });