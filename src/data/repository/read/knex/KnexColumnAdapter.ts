import { IDataFieldsProvider } from "../../../../database/query/IDataFieldsProvider.js";
import { QueryBuilder } from "knex";

class KnexColumnAdapterClass implements IDataFieldsProvider {

    public async selectFields(query: QueryBuilder, fields: string[] | string | "*", entity: EntitySchema): Promise<QueryBuilder> {

        // Only allow "readable" columns! (Should I just return them empty?)
        const cols = entity.getColumns().filter(c => c.get("readable") !== false);

        const allColumns = cols.map(c => c.get("column_name"));
        const allNames = cols.map(c => c.get("name"));

        if (fields === "*") {
            query.select(allColumns);
            return query;
        }

        const validColumns: string[] = [];

        if (Array.isArray(fields)) {
            fields.forEach((c, i) => {
                if (allColumns.includes(c)) {
                    validColumns.push(c);
                    return;
                }
                const ioName = allNames.indexOf(c);
                if (ioName >= 0) {
                    validColumns.push(allColumns[i]);
                    return;
                }
            });
        }

        query.select(validColumns);

        return query;
    }
}

export const KnexColumnAdapter = new KnexColumnAdapterClass();
