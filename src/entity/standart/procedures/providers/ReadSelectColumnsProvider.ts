import { ColumnClass } from "../../../ColumnClass.js";
import { IDataFieldsProvider } from "../../../../database/query/IDataFieldsProvider.js";
import { EntityClass } from "../../../EntityClass.js";
import { QueryBuilder } from "knex";

class ReadSelectColumnsProviderClass implements IDataFieldsProvider {

    public async selectFields(query: QueryBuilder, entity: EntityClass, fields: string | string[]): Promise<QueryBuilder> {
        let columnsToBeReturned = this.getColumnsFromFields(entity, fields);
        query.select(columnsToBeReturned);
        return query;
    }

    protected getColumnsFromFields(entity: EntityClass, fields: string | string[] | "*") {
        if (fields === "*") {
            return this.getColumnNamesFromEntity(entity);
        }

        if (typeof fields === "string") {
            return this.getColumnNamesFromEntity(
                entity,
                // Matches Column Name OR Name
                (col) => col.schema.column_name === fields || col.name === fields);
        }
        else {
            return this.getColumnNamesFromEntity(
                entity,
                // Should probably filter for readable!
                (col) => fields.includes(col.schema.column_name) || fields.includes(col.name));
        }
    }

    protected getColumnNamesFromEntity(entity: EntityClass, filter?: (column: ColumnClass) => boolean | Promise<boolean>): string[] {
        let columns = Array.from(Object.values(entity.columns));

        if (filter) {
            columns = columns.filter(filter);
        }

        return columns.map(c => c.schema.column_name);

    }
}

export const ReadSelectColumnsProvider = new ReadSelectColumnsProviderClass();