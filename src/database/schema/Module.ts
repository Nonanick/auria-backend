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

        this.addColumns(
            // Name
            new ColumnSchema({
                name: "Name",
                column_name: "name",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Columns.Module.Name.Title}",
                description: "@{Auria.Columns.Module.Name.Description}",
                status: "active",
                column_keys: ["IND"],
            }),
            //Title
            new ColumnSchema({
                name: "Title",
                column_name: "title",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Columns.Module.Title.Title}",
                description: "@{Auria.Columns.Module.Title.Description}",
                status: "active",
            }),
            // Description
            new ColumnSchema({
                name: "Description",
                column_name: "description",
                sql_type: "TEXT",
                nullable: true,
                title: "@{Auria.Columns.Module.Description.Title}",
                description: "@{Auria.Columns.Module.Description.Description}",
                status: "active",
            }),
            // Icon 
            new ColumnSchema({
                name: "Icon",
                column_name: "icon",
                sql_type: "VARCHAR",
                nullable: true,
                title: "@{Auria.Columns.Module.Icon.Title}",
                description: "@{Auria.Columns.Module.Icon.Description}",
                status: "active",
            }),
            // Color
            new ColumnSchema({
                name: "Color",
                column_name: "color",
                sql_type: "VARCHAR",
                nullable: true,
                title: "@{Auria.Columns.Module.Color.Title}",
                description: "@{Auria.Columns.Module.Color.Description}",
                status: "active",
            }),
            // Behaviour
            new ColumnSchema({
                name: "Behaviour",
                column_name: "behaviour",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Columns.Module.Behaviour.Title}",
                description: "@{Auria.Columns.Module.Behaviour.Description}",
                status: "active",
                default_value: "Hybrid"
            })
        );

        this.addFilter(ActiveStatusFilterName, ActiveStatusFilterProvider);
    }
}