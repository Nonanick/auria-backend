import { ResourceCatalog } from "./ResourceCatalog.js";
import { ColumnSchema } from "./sql/ColumnSchema.js";
import { ResourceSchema } from "./sql/ResourceSchema.js";
import { ReferenceSchema } from "./sql/ReferenceSchema.js";

export class ApiAccess extends ResourceSchema {


    constructor() {
        super({
            name: ResourceCatalog.ApiAccess.name,
            table_name: ResourceCatalog.ApiAccess.table_name,
            title: "@{Auria.Resource.ApiAccess.Title}",
            description: "@{Auria.Resource.ApiAccess.Description}",
            is_system_resource: true,
            status: "active"
        });

        this.addReferences(
            // User ID
            new ReferenceSchema(this, {
                name: "User_Have_Explicit_Permission_To_Api",

                resource_id: this.get("_id"),
                resource_table_name: this.get("table_name"),
                resource_column_name: "user_id",

                reference_table_name: ResourceCatalog.User.table_name,
                reference_column_name: "_id"
            }),

            // Role ID
            new ReferenceSchema(this, {
                name: "Role_Have_Explicit_Permission_To_Api",

                resource_id: this.get("_id"),
                resource_table_name: this.get("table_name"),
                resource_column_name: "user_id",

                reference_table_name: ResourceCatalog.User.table_name,
                reference_column_name: "_id"
            }),

        );
    }
}