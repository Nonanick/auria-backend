import { ResourceSchema } from "./sql/ResourceSchema.js";
import { ResourceCatalog } from "./ResourceCatalog.js";
import { ColumnSchema } from "./sql/ColumnSchema.js";
import { ReferenceSchema } from "./sql/ReferenceSchema.js";

export class ModulePageSchema extends ResourceSchema {

    constructor() {
        super({
            name : ResourceCatalog.ModulePage.name,
            table_name : ResourceCatalog.ModulePage.table_name,
            title : "@{Auria.Resource.ModulePage.Title}",
            description : "@{Auria.Resource.ModulePage.Description}",
            is_system_resource : true,
            status : 'active'
        });

        this.addReferences(
            // Module ID
            new ReferenceSchema(this, {
                name : "Page_Belong_To_Module",

                // Source Info
                resource_id : this.get("_id"),
                resource_table_name : this.get("table_name"),
                resource_column_name : "module_id",

                // Reference Info
                reference_table_name : ResourceCatalog.Reference.table_name,
                reference_column_name : "_id"
            }),
            // Parent Menu ID
            new ReferenceSchema(this, {
                name : "Page_Has_Parent_Menu",

                // Source Info
                resource_id : this.get("_id"),
                resource_table_name : this.get("table_name"),
                resource_column_name : "parent_menu_id",

                // Reference Info
                reference_table_name : ResourceCatalog.ModuleMenu.table_name,
                reference_column_name : "_id"
            }),
        );
    }
}