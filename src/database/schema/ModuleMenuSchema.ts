import { ResourceSchema } from "./sql/ResourceSchema.js";
import { ResourceCatalog } from "./ResourceCatalog.js";
import { ColumnSchema } from "./sql/ColumnSchema.js";
import { ReferenceSchema } from "./sql/ReferenceSchema.js";

export class ModuleMenuSchema extends ResourceSchema {

    constructor() {
        super({
            name : ResourceCatalog.ModuleMenu.name,
            table_name : ResourceCatalog.ModuleMenu.table_name,
            title : "@{Auria.Resource.ModuleMenu.Title}",
            description : "@{Auria.Resource.ModuleMenu.Description}",
            is_system_resource : true
        });

        this.addReferences(

            // Module ID
            new ReferenceSchema(this, {
                name : "Module_Menu_Belong_To_Module",

                // Source Info
                resource_id : this.get("_id"),
                resource_table_name : ResourceCatalog.ModuleMenu.table_name,
                resource_column_name : "module_id",

                // Reference info
                reference_table_name : ResourceCatalog.Module.table_name,
                reference_column_name : "_id"
            }),

            // Parent Menu ID
            new ReferenceSchema(this, {
                name : "Module_Menu_Is_Child_Of",

                // Source Info
                resource_id : this.get("_id"),
                resource_table_name : ResourceCatalog.ModuleMenu.table_name,
                resource_column_name : "parent_menu_id",

                // Reference info
                reference_table_name : ResourceCatalog.ModuleMenu.table_name,
                reference_column_name : "_id"
            }),
        )
    }
}