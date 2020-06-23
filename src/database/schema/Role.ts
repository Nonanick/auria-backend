import { ResourceSchema } from "./sql/ResourceSchema.js";
import { ResourceCatalog } from "./ResourceCatalog.js";
import { ColumnSchema } from "./sql/ColumnSchema.js";

export class RoleSchema extends ResourceSchema {
    constructor() {
        super({
            name: ResourceCatalog.Role.name,
            table_name: ResourceCatalog.Role.table_name,
            title: "@{Auria.Resource.Role.Title}",
            description: "@{Auria.Resource.Role.Description}",
            is_system_resource: true,
            status: "active"
        });
    }
}