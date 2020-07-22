import { IDataOrderProvider } from "../../../../database/query/IDataOrderProvider.js";
import { EntityClass } from "../../../EntityClass.js";
import { IDataOrder } from "auria-lib";
import { QueryBuilder } from "knex";
import { ColumnClass } from "../../../ColumnClass.js";

class ReadOrderResultsProviderClass implements IDataOrderProvider {

    public async applyOrdering(query: QueryBuilder, entity: EntityClass, ordering: string | IDataOrder | IDataOrder[]): Promise<QueryBuilder> {

        const allColumns = Array.from(Object.values(entity.columns));

        if (typeof ordering === "string") {
            if (this.columnExists(allColumns, ordering))
                query.orderBy(ordering);
            else
                console.warn("WARN! Cannot order entity ", entity.name, " by column ", ordering, " because it was not imported into Auria!");
        } else {
            if (Array.isArray(ordering)) {
                ordering.forEach((o) => {
                    if (this.columnExists(allColumns, o.by))
                        query.orderBy(o.by, o.direction);
                    console.warn("WARN! Cannot order entity ", entity.name, " by column ", o.by, " because it was not imported into Auria!");
                });
            } else if (this.columnExists(allColumns, ordering.by))
                query.orderBy(ordering.by, ordering.direction);
            else
                console.warn("WARN! Cannot order entity ", entity.name, " by column ", ordering.by, " because it was not imported into Auria!");
        }

        return query;
    }

    protected columnExists(columns: ColumnClass[], column: string): boolean {
        return columns
            .filter(
                (c) => c.name === column || c.schema.column_name === column
            ).length > 0;
    }

}

export const ReadOrderResultsProvider = new ReadOrderResultsProviderClass();