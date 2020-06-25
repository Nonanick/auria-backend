import { EntitySchema } from "../../../../database/schema/sql/EntitySchema.js";
import { EntityCatalog } from "../../../../database/schema/EntityCatalog.js";

export class EntityInstanceSchema extends EntitySchema {

    constructor() {
        super({
            name: EntityCatalog.Entity.name,
            table_name: EntityCatalog.Entity.table_name,
            title: "@{Auria.Entity.Entity.Title}",
            description: "@{Auria.Entity.Entity.Description}",
            is_system_entity: true
        });
    }
}