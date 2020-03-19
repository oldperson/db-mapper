function toSwaggerDefinition(model) {
    const parts = [];
    const isExcludedColumn = {
        status: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
    };

    const openDefinition = 
`/**
 * @SWG\\Definition(
 *     definition="${model.name}Item",`;

    const openRequired = ` *     required={`;
    // const required = `"${column.COLUMN_NAME}"`
    const closeRequires = ` *     },`;
    // const property = ` *     @SWG\Property(
    //     *         property="${column.COLUMN_NAME}",
    //     *         description="${column.COLUMN_COMMEN}",
    //     *         type="${column.swagType}"
    //     *     ),`;
    const closeDefinition = 
` * )
 */`;

    parts.push(openDefinition);
    parts.push(openRequired);
    for(const column of model.columns) {
        if (isExcludedColumn[column.COLUMN_NAME]) continue;
        parts.push(` *         "${column.COLUMN_NAME}",`);
    }
    parts.push(closeRequires);
    for(const column of model.columns) {
        if (isExcludedColumn[column.COLUMN_NAME]) continue;

        parts.push(
` *     @SWG\\Property(
 *         property="${column.COLUMN_NAME}",
 *         description="${column.COLUMN_COMMENT}",
 *         type="${column.swagType}"
 *     ),`);
    }
    parts.push(closeDefinition);
    return parts.join('\n');
}

module.exports = toSwaggerDefinition;