import { EntitySchema } from "./sql/EntitySchema.js";
import { EntityCatalog } from "./EntityCatalog.js";
import { ColumnSchema } from "./sql/ColumnSchema.js";

export class User extends EntitySchema {
 
    constructor() {
        super({
            name : EntityCatalog.User.name,
            table_name : EntityCatalog.User.table_name,
            title : "@{Auria.Entity.User.Title}",
            description : "@{Auria.Entity.User.Description}",
            is_system_entity : true,
            status : "active"
        });

    }
}