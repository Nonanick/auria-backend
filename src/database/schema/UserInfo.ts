import { EntitySchema } from "./sql/EntitySchema.js";
import { EntityCatalog } from "./EntityCatalog.js";
import { ColumnSchema } from "./sql/ColumnSchema.js";
import { ReferenceSchema } from "./sql/ReferenceSchema.js";

export class UserInfo extends EntitySchema {
    constructor() {
        super({
            name: EntityCatalog.UserInfo.name,
            table_name: EntityCatalog.UserInfo.table_name,
            title: "@{Auria.Entity.UserInfo.Title}",
            description: "@{Auria.Entity.UserInfo.Description}",
            is_system_entity: true,
            status: "active"
        });

        delete this.columns["_id"]; // User ID is PRI Key
        this.addColumns(
            // User ID
            new ColumnSchema({
                name: "User ID",
                column_name: "user_id",
                sql_type: "CHAR",
                length: 22,
                nullable: false,
                title: "@{Auria.Columns.UserInfo.UserID.Title}",
                description: "@{Auria.Columns.UserInfo.UserID.Description}",
                status: "active",
                column_keys: ["UNI"]
            }),
            // Name
            new ColumnSchema({
                name: "Name",
                column_name: "name",
                sql_type: "VARCHAR",
                length: 100,
                nullable: false,
                title: "@{Auria.Columns.UserInfo.Name.Title}",
                description: "@{Auria.Columns.UserInfo.Name.Description}",
                status: "active",
            }),
            // Surname
            new ColumnSchema({
                name: "Surname",
                column_name: "surname",
                sql_type: "VARCHAR",
                length: 100,
                nullable: true,
                title: "@{Auria.Columns.UserInfo.Surname.Title}",
                description: "@{Auria.Columns.UserInfo.Surname.Description}",
                status: "active",
            }),
            // Email
            new ColumnSchema({
                name: "Email",
                column_name: "email",
                sql_type: "VARCHAR",
                length: 100,
                nullable: true,
                title: "@{Auria.Columns.UserInfo.Email.Title}",
                description: "@{Auria.Columns.UserInfo.Email.Description}",
                status: "active",
            }),
            // Photo
            new ColumnSchema({
                name: "Photo",
                column_name: "photo",
                sql_type: "VARCHAR",
                nullable: true,
                title: "@{Auria.Columns.UserInfo.Photo.Title}",
                description: "@{Auria.Columns.UserInfo.Photo.Description}",
                default_value: "default-avatar",
                status: "active",
            }),
        );

        this.addReferences(
            // User ID
            new ReferenceSchema(this, {

                name: "Info_Belongs_To_User",
                // Source info
                entity_id: this.get("_id"),
                entity_table_name: this.get("table_name"),
                entity_column_name: "user_id",

                // Reference info
                reference_table_name: EntityCatalog.User.table_name,
                reference_column_name: "_id"
            })
        );
    }
}