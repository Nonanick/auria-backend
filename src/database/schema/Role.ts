import { EntitySchema } from "./sql/EntitySchema.js";
import { EntityCatalog } from "./EntityCatalog.js";
import { ColumnSchema } from "./sql/ColumnSchema.js";

export class RoleSchema extends EntitySchema {
    constructor() {
        super({
            name: EntityCatalog.Role.name,
            table_name: EntityCatalog.Role.table_name,
            title: "@{Auria.Entity.Role.Title}",
            description: "@{Auria.Entity.Role.Description}",
            is_system_entity: true,
            status: "active"
        });
    }
}