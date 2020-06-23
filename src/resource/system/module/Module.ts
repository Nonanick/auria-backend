import { ResourceClass } from "../../ResourceClass";
import { ResourceSchema } from "../../../database/schema/sql/ResourceSchema";
import { Module as ModuleSchema } from "../../../database/schema/Module.js";

export class Module extends ResourceClass {

    constructor() {
        super();

        this.addColumns(
            // Name
            {
                schema: {
                    name: "Name",
                    column_name: "name",
                    sql_type: "VARCHAR",
                    nullable: false,
                    title: "@{Auria.Columns.Module.Name.Title}",
                    description: "@{Auria.Columns.Module.Name.Description}",
                    status: "active",
                    column_keys: ["IND"],
                }
            },
            // Title
            {
                schema: {
                    name: "Title",
                    column_name: "title",
                    sql_type: "VARCHAR",
                    nullable: false,
                    title: "@{Auria.Columns.Module.Title.Title}",
                    description: "@{Auria.Columns.Module.Title.Description}",
                    status: "active",
                }
            },
            // Description
            {
                schema: {
                    name: "Description",
                    column_name: "description",
                    sql_type: "TEXT",
                    nullable: true,
                    title: "@{Auria.Columns.Module.Description.Title}",
                    description: "@{Auria.Columns.Module.Description.Description}",
                    status: "active",
                }
            },
            // Icon 
            {
                schema: {
                    name: "Icon",
                    column_name: "icon",
                    sql_type: "VARCHAR",
                    nullable: true,
                    title: "@{Auria.Columns.Module.Icon.Title}",
                    description: "@{Auria.Columns.Module.Icon.Description}",
                    status: "active",
                }
            },
            // Color
            {
                schema: {
                    name: "Color",
                    column_name: "color",
                    sql_type: "VARCHAR",
                    nullable: true,
                    title: "@{Auria.Columns.Module.Color.Title}",
                    description: "@{Auria.Columns.Module.Color.Description}",
                    status: "active",
                }
            },
            // Behaviour
            {
                schema: {
                    name: "Behaviour",
                    column_name: "behaviour",
                    sql_type: "VARCHAR",
                    nullable: false,
                    title: "@{Auria.Columns.Module.Behaviour.Title}",
                    description: "@{Auria.Columns.Module.Behaviour.Description}",
                    status: "active",
                    default_value: "Hybrid"
                }
            }
        );
    }

    public getBootDependencies(): string[] {
        return [];
    }

    public getBootFunction(): () => boolean | Promise<boolean> {
        return () => true;
    }

    protected buildSchema(): ResourceSchema {
        return new ModuleSchema();
    }


}