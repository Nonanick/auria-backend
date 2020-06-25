import { EntityCatalog } from "./EntityCatalog.js";
import { ActiveStatusFilterProvider, ActiveStatusFilterName } from "../query/status/ActiveStatusFilterProvider.js";
import { EntitySchema } from "./sql/EntitySchema.js";
import { ColumnSchema } from "./sql/ColumnSchema.js";

export class Module extends EntitySchema {

    constructor() {
        super({
            name: EntityCatalog.Module.name,
            table_name: EntityCatalog.Module.table_name,
            title: "@{Auria.Entity.Module.Title}",
            description: "@{Auria.Entity.Module.Description}",
            is_system_entity: true,
        });

    }
}