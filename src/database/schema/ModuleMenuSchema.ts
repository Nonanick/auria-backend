import { EntitySchema } from "./sql/EntitySchema.js";
import { EntityCatalog } from "./EntityCatalog.js";
import { ColumnSchema } from "./sql/ColumnSchema.js";
import { ReferenceSchema } from "./sql/ReferenceSchema.js";

export class ModuleMenuSchema extends EntitySchema {

    constructor() {
        super({
            name : EntityCatalog.ModuleMenu.name,
            table_name : EntityCatalog.ModuleMenu.table_name,
            title : "@{Auria.Entity.ModuleMenu.Title}",
            description : "@{Auria.Entity.ModuleMenu.Description}",
            is_system_entity : true
        });

        this.addReferences(

            // Module ID
            new ReferenceSchema(this, {
                name : "Module_Menu_Belong_To_Module",

                // Source Info
                entity_id : this.get("_id"),
                entity_table_name : EntityCatalog.ModuleMenu.table_name,
                entity_column_name : "module_id",

                // Reference info
                reference_table_name : EntityCatalog.Module.table_name,
                reference_column_name : "_id"
            }),

            // Parent Menu ID
            new ReferenceSchema(this, {
                name : "Module_Menu_Is_Child_Of",

                // Source Info
                entity_id : this.get("_id"),
                entity_table_name : EntityCatalog.ModuleMenu.table_name,
                entity_column_name : "parent_menu_id",

                // Reference info
                reference_table_name : EntityCatalog.ModuleMenu.table_name,
                reference_column_name : "_id"
            }),
        )
    }
}