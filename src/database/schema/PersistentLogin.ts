import { ResourceSchema } from './sql/ResourceSchema.js';
import { ResourceCatalog } from './ResourceCatalog.js';
import { ColumnSchema } from './sql/ColumnSchema.js';
import { ReferenceSchema } from './sql/ReferenceSchema.js';

export class PersistentLoginSchema extends ResourceSchema {

    constructor() {
        super({
            name: ResourceCatalog.PersistentLogin.name,
            table_name: ResourceCatalog.PersistentLogin.table_name,
            title: "@{Auria.Resources.Session.Title}",
            description: "@{Auria.Resources.Session.Description}",
            is_system_resource: true,
        });

        this.addReferences(
            new ReferenceSchema(this, {
                name: "Username_Has_Persistent_Login",
                resource_id: this.get("_id"),
                resource_table_name: this.get("table_name"),
                resource_column_name: "username",

                reference_table_name: ResourceCatalog.User.table_name,
                reference_column_name: "username"
            })
        );
    }

}