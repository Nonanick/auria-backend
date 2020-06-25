import { IDataOrderProvider } from "../../../../database/query/IDataOrderProvider.js";
import { QueryBuilder } from "knex";
import { EntitySchema } from "../../../../database/schema/sql/EntitySchema.js";
import { IDataOrder } from 'auria-lib';

class KnexOrderAdapterClass implements IDataOrderProvider {

    public async applyOrdering(query: QueryBuilder, ordering: string | IDataOrder | IDataOrder[], entity: EntitySchema): Promise<QueryBuilder> {
        
        if (ordering) {
            if (typeof ordering === "string") {
                if (entity.hasColumn(ordering))
                    query.orderBy(ordering);
                else
                    console.warn("WARN! Cannot order entity ", entity.get("name"), " by column ", ordering, " because it was not imported into Auria!");
            } else {
                if (Array.isArray(ordering)) {
                    ordering.forEach((o) => {
                        if (entity.hasColumn(o.by))
                            query.orderBy(o.by, o.direction)
                        console.warn("WARN! Cannot order entity ", entity.get("name"), " by column ", o.by, " because it was not imported into Auria!");
                    });
                } else if (entity.hasColumn(ordering.by))
                    query.orderBy(ordering.by, ordering.direction);
                else
                    console.warn("WARN! Cannot order entity ", entity.get("name"), " by column ", ordering.by, " because it was not imported into Auria!");
            }
        }

        return query;

    }
}

export const KnexOrderAdapter = new KnexOrderAdapterClass();