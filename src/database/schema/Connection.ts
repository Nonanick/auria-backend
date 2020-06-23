import { ResourceCatalog } from "./ResourceCatalog.js";
import { ResourceSchema } from "./sql/ResourceSchema.js";

export class Connection extends ResourceSchema {

    constructor() {
        super({
            name: ResourceCatalog.Connection.name,
            table_name: ResourceCatalog.Connection.table_name,
            title: "@{Auria.Resource.Connection.Title}",
            description: "@{Auria.Resource.Connection.Description}",
            is_system_resource: true,
            status: "active"
        });

    }
}