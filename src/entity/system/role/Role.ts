import { EntityClass } from "../../EntityClass";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema";

export class Role extends EntityClass {

    constructor() {
        super();


        this.addColumns(

            // _ID
            this.buildDefaultIdColumn(),

            // Name
            {
                schema: {
                    name: "Name",
                    column_name: "name",
                    sql_type: "VARCHAR",
                    nullable: false,
                    title: "@{Auria.Columns.Role.Name.Title}",
                    description: "@{Auria.Columns.Role.Name.Description}",
                    status: "active",
                    column_keys: ["IND"]
                }
            },
            // Title
            {
                schema: {
                    name: "Title",
                    column_name: "title",
                    sql_type: "VARCHAR",
                    nullable: false,
                    title: "@{Auria.Columns.Role.Title.Title}",
                    description: "@{Auria.Columns.Role.Title.Description}",
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
                    title: "@{Auria.Columns.Role.Icon.Title}",
                    description: "@{Auria.Columns.Role.Icon.Description}",
                    status: "active",
                }
            },
            // Description
            {
                schema: {
                    name: "Description",
                    column_name: "description",
                    sql_type: "VARCHAR",
                    nullable: false,
                    title: "@{Auria.Columns.Role.Description.Title}",
                    description: "@{Auria.Columns.Role.Description.Description}",
                    status: "active",
                }
            },

            // Status
            this.buildDefaultStatusColumn(),

        );
    }
    public getBootDependencies(): string[] {
        throw new Error("Method not implemented.");
    }
    public getBootFunction(): () => boolean | Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    protected buildSchema(): EntitySchema {
        throw new Error("Method not implemented.");
    }

}