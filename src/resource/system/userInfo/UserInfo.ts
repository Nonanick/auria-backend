import { ResourceClass } from "../../ResourceClass";
import { ResourceSchema } from "../../../database/schema/sql/ResourceSchema";

export class UserInfo extends ResourceClass {

    constructor() {
        super();

        this.addColumns(
            // User ID
            {
                schema: {
                    name: "User ID",
                    column_name: "user_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: false,
                    title: "@{Auria.Columns.UserInfo.UserID.Title}",
                    description: "@{Auria.Columns.UserInfo.UserID.Description}",
                    status: "active",
                    column_keys: ["PRI"]
                }
            },
            // Name
            {
                schema: {
                    name: "Name",
                    column_name: "name",
                    sql_type: "VARCHAR",
                    length: 100,
                    nullable: false,
                    title: "@{Auria.Columns.UserInfo.Name.Title}",
                    description: "@{Auria.Columns.UserInfo.Name.Description}",
                    status: "active",
                }
            },
            // Surname
            {
                schema: {
                    name: "Surname",
                    column_name: "surname",
                    sql_type: "VARCHAR",
                    length: 100,
                    nullable: true,
                    title: "@{Auria.Columns.UserInfo.Surname.Title}",
                    description: "@{Auria.Columns.UserInfo.Surname.Description}",
                    status: "active",
                }
            },
            // Email
            {
                schema: {
                    name: "Email",
                    column_name: "email",
                    sql_type: "VARCHAR",
                    length: 100,
                    nullable: true,
                    title: "@{Auria.Columns.UserInfo.Email.Title}",
                    description: "@{Auria.Columns.UserInfo.Email.Description}",
                    status: "active",
                }
            },
            // Photo
            {
                schema: {
                    name: "Photo",
                    column_name: "photo",
                    sql_type: "VARCHAR",
                    nullable: true,
                    title: "@{Auria.Columns.UserInfo.Photo.Title}",
                    description: "@{Auria.Columns.UserInfo.Photo.Description}",
                    default_value: "default-avatar",
                    status: "active",
                }
            },
        );
    }
    public getBootDependencies(): string[] {
        throw new Error("Method not implemented.");
    }
    public getBootFunction(): () => boolean | Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    protected buildSchema(): ResourceSchema {
        throw new Error("Method not implemented.");
    }

}