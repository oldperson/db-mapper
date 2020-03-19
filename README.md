# usage
```
// map.js

// 更改table_name
const listAllColumnsSql = `SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, COLUMN_COMMENT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE table_name in ('videos')
AND table_schema = 'zan'`;

```
```
// print swagger definition of tables in console
node map.js
```