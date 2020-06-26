import { EntityClass } from "../../EntityClass";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema";
import { EntityCatalog } from "../../../database/schema/EntityCatalog.js";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";

export class Role extends EntityClass {

    constructor() {
        super(EntityCatalog.Role.name);

        this.addColumns(

            // _ID
            this.buildDefaultIdColumn(),

            // Name
            {
                name: "Name",
                info: {
                    title: "@{Auria.Columns.Role.Name.Title}",
                    description: "@{Auria.Columns.Role.Name.Description}",
                },
                schema: {
                    column_name: "name",
                    sql_type: "VARCHAR",
                    nullable: false,
                    status: "active",
                    column_keys: ["IND"]
                }
            },
            // Title
            {
                name: "Title",
                info: {
                    title: "@{Auria.Columns.Role.Title.Title}",
                    description: "@{Auria.Columns.Role.Title.Description}",
                },
                schema: {
                    column_name: "title",
                    sql_type: "VARCHAR",
                    nullable: false,
                    status: "active",
                }
            },
            // Icon
            {
                name: "Icon",
                info: {
                    title: "@{Auria.Columns.Role.Icon.Title}",
                    description: "@{Auria.Columns.Role.Icon.Description}",
                },
                schema: {
                    column_name: "icon",
                    sql_type: "VARCHAR",
                    nullable: true,
                    status: "active",
                }
            },
            // Description
            {
                name: "Description",
                info: {
                    title: "@{Auria.Columns.Role.Description.Title}",
                    description: "@{Auria.Columns.Role.Description.Description}",
                },
                schema: {
                    column_name: "description",
                    sql_type: "VARCHAR",
                    nullable: false,
                    status: "active",
                }
            },

            // Status
            this.buildDefaultStatusColumn(),

        );
    }

    public getBootDependencies(): string[] {
        return [];
    }

    public getBootFunction(): () => boolean | Promise<boolean> {
        return () => true;
    }

    protected buildInfo(): IEntityInfo {
        return {
            title: "@{Auria.Entity.Role.Title}",
            description: "@{Auria.Entity.Role.Description}"
        };
    }

    protected buildSchema(): EntitySchema {
        return new EntitySchema({
            table_name: EntityCatalog.Role.table_name,
            is_system_entity: true
        });
    }

}