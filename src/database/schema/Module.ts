import { ResourceCatalog } from "./ResourceCatalog.js";
import { ActiveStatusFilterProvider, ActiveStatusFilterName } from "../query/status/ActiveStatusFilterProvider.js";
import { ResourceSchema } from "./sql/ResourceSchema.js";
import { ColumnSchema } from "./sql/ColumnSchema.js";

export class Module extends ResourceSchema {

    constructor() {
        super({
            name: ResourceCatalog.Module.name,
            table_name: ResourceCatalog.Module.table_name,
            title: "@{Auria.Resource.Module.Title}",
            description: "@{Auria.Resource.Module.Description}",
            is_system_resource: true,
        });

    }
}