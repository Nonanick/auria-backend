import { ResourceSchema } from "./sql/ResourceSchema.js";
import { ResourceCatalog } from "./ResourceCatalog.js";
import { ColumnSchema } from "./sql/ColumnSchema.js";

export class User extends ResourceSchema {
 
    constructor() {
        super({
            name : ResourceCatalog.User.name,
            table_name : ResourceCatalog.User.table_name,
            title : "@{Auria.Resource.User.Title}",
            description : "@{Auria.Resource.User.Description}",
            is_system_resource : true,
            status : "active"
        });

    }
}