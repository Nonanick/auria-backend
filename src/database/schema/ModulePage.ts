import { EntitySchema } from "./sql/EntitySchema.js";
import { EntityCatalog } from "./EntityCatalog.js";
import { ColumnSchema } from "./sql/ColumnSchema.js";
import { ReferenceSchema } from "./sql/ReferenceSchema.js";

export class ModulePageSchema extends EntitySchema {

    constructor() {
        super({
            name : EntityCatalog.ModulePage.name,
            table_name : EntityCatalog.ModulePage.table_name,
            title : "@{Auria.Entity.ModulePage.Title}",
            description : "@{Auria.Entity.ModulePage.Description}",
            is_system_entity : true,
            status : 'active'
        });

        this.addReferences(
            // Module ID
            new ReferenceSchema(this, {
                name : "Page_Belong_To_Module",

                // Source Info
                entity_id : this.get("_id"),
                entity_table_name : this.get("table_name"),
                entity_column_name : "module_id",

                // Reference Info
                reference_table_name : EntityCatalog.Reference.table_name,
                reference_column_name : "_id"
            }),
            // Parent Menu ID
            new ReferenceSchema(this, {
                name : "Page_Has_Parent_Menu",

                // Source Info
                entity_id : this.get("_id"),
                entity_table_name : this.get("table_name"),
                entity_column_name : "parent_menu_id",

                // Reference Info
                reference_table_name : EntityCatalog.ModuleMenu.table_name,
                reference_column_name : "_id"
            }),
        );
    }
}