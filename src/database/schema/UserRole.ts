import { ResourceSchema } from "./sql/ResourceSchema.js";
import { ResourceCatalog } from "./ResourceCatalog.js";
import { ColumnSchema } from "./sql/ColumnSchema.js";
import { ReferenceSchema } from "./sql/ReferenceSchema.js";

export class UserRole extends ResourceSchema {
    constructor() {
        super({
            name : ResourceCatalog.UserRole.name,
            table_name : ResourceCatalog.UserRole.table_name,
            title : "@{Auria.Resource.UserRole.Title}",
            description : "@{Auria.Resource.UserRole.Description}",
            is_system_resource : true,
            status : "active"
        });

        this.addColumns(
            // User ID
            new ColumnSchema({
                name : "User ID",
                column_name : "user_id",
                sql_type : "CHAR",
                length : 22,
                nullable : false,
                column_keys : ["IND"],
                title : "@{Auria.Columns.UserRole.UserID.Title}",
                description : "@{Auria.Columns.UserRole.UserID.Description}",
            }),
            // Role ID
            new ColumnSchema({
                name : "Role ID",
                column_name : "role_id",
                sql_type : "CHAR",
                length : 22,
                nullable : false,
                column_keys : ["IND"],
                title : "@{Auria.Columns.UserRole.RoleID.Title}",
                description : "@{Auria.Columns.UserRole.RoleID.Description}",
            }),
            // Name
            new ColumnSchema({
                name : "Name",
                column_name : "name",
                sql_type : "VARCHAR",
                nullable : true,
                title : "@{Auria.Columns.UserRole.Name.Title}",
                description : "@{Auria.Columns.UserRole.Name.Description}",
            }),
            // Description
            new ColumnSchema({
                name : "Description",
                column_name : "description",
                sql_type : "VARCHAR",
                nullable : true,
                title : "@{Auria.Columns.UserRole.Description.Title}",
                description : "@{Auria.Columns.UserRole.Description.Description}",
            }),
        );

        this.addReferences(
            // User ID
            new ReferenceSchema(this, {
                name : "User_Inscribed_To_Role",
                // Source Info
                resource_id : this.get("_id"),
                resource_table_name : this.get("table_name"),
                resource_column_name : "user_id",
                // Reference Info
                reference_table_name : ResourceCatalog.User.table_name,
                reference_column_name : "_id"
            }),
            // Role ID
            new ReferenceSchema(this, {
                name : "Role_Assigned_To_User",
                // Source Info
                resource_id : this.get("_id"),
                resource_table_name : this.get("table_name"),
                resource_column_name : "role_id",
                // Reference Info
                reference_table_name : ResourceCatalog.Role.table_name,
                reference_column_name : "_id"
            }),
        )
    }
}