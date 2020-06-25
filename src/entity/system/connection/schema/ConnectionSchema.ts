import { EntitySchema } from "../../../../database/schema/sql/EntitySchema.js";
import { EntityCatalog } from "../../../../database/schema/EntityCatalog.js";

export class ConnectionSchema extends EntitySchema {

    constructor() {
        super({
            name: EntityCatalog.Connection.name,
            table_name: EntityCatalog.Connection.table_name,
            title: "@{Auria.Entity.Connection.Title}",
            description: "@{Auria.Entity.Connection.Description}",
            is_system_entity: true,
            status: "active"
        });

    }
}