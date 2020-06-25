import { EntitySchema } from './sql/EntitySchema.js';
import { EntityCatalog } from './EntityCatalog.js';
import { ColumnSchema } from './sql/ColumnSchema.js';
import { ReferenceSchema } from './sql/ReferenceSchema.js';

export class PersistentLoginSchema extends EntitySchema {

    constructor() {
        super({
            name: EntityCatalog.PersistentLogin.name,
            table_name: EntityCatalog.PersistentLogin.table_name,
            title: "@{Auria.Entitys.Session.Title}",
            description: "@{Auria.Entitys.Session.Description}",
            is_system_entity: true,
        });

        this.addReferences(
            new ReferenceSchema(this, {
                name: "Username_Has_Persistent_Login",
                entity_id: this.get("_id"),
                entity_table_name: this.get("table_name"),
                entity_column_name: "username",

                reference_table_name: EntityCatalog.User.table_name,
                reference_column_name: "username"
            })
        );
    }

}