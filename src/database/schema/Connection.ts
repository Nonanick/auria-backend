import { EntityCatalog } from "./EntityCatalog.js";
import { EntitySchema } from "./sql/EntitySchema.js";

export class Connection extends EntitySchema {

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