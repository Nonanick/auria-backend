import { ResourceRow } from "./sql/ResourceRow.js";
import { ResourceCatalog } from "./ResourceCatalog.js";
import { ColumnRow } from "./sql/ColumnRow.js";
import { ReferenceRow } from "./sql/ReferenceRow.js";

export class ResourceActivity extends ResourceRow {

    constructor() {
        super({
            name: ResourceCatalog.ResourceActivity.name,
            table_name: ResourceCatalog.ResourceActivity.table_name,
            title: "@{Auria.Resource.ResourceActivity.Title}",
            description: "@{Auria.Resource.ResourceActivity.Description}",
            is_system_resource: true,
            status: "active"
        });

        this.addColumns(
            // Resource ID
            new ColumnRow({
                name: "Resource ID",
                column_name: "resource_id",
                sql_type: "CHAR",
                length : 22,
                title: "@{Auria.Columns.ResourceActivty.ResourceID.Title}",
                description: "@{Auria.Column.ResourceActivity.ResourceID.Description}",
                nullable: false,
                status: "active"
            }),
            // Resource Row ID
            new ColumnRow({
                name: "Resource Row ID",
                column_name: "resource_row_id",
                sql_type: "CHAR",
                length : 22,
                title: "@{Auria.Columns.ResourceActivty.ResourceRowID.Title}",
                description: "@{Auria.Column.ResourceActivity.ResourceRowID.Description}",
                nullable: false,
                status: "active"
            }),
            // User ID
            new ColumnRow({
                name: "User ID",
                column_name: "user_id",
                sql_type: "CHAR",
                length : 22,
                title: "@{Auria.Columns.ResourceActivty.UserID.Title}",
                description: "@{Auria.Column.ResourceActivity.UserID.Description}",
                nullable: false,
                status: "active"
            }),
            // User Authority
            new ColumnRow({
                name: "User Authority",
                column_name: "user_authority",
                sql_type: "CHAR",
                length : 22,
                nullable: true,
                title: "@{Auria.Column.ResourceActivty.UserAuthority.Title}",
                description: "@{Auria.Column.ResourceActivty.UserAuthority.Description}",
                status: "active"
            }),
            // Role Authority
            new ColumnRow({
                name: "Role Authority",
                column_name: "role_authority",
                sql_type: "CHAR",
                length : 22,
                nullable: true,
                title: "@{Auria.Column.ResourceActivty.RoleAuthority.Title}",
                description: "@{Auria.Column.ResourceActivty.RoleAuthority.Description}",
                status: "active"
            }),
            // Data Procedure
            new ColumnRow({
                name: "Data Procedure",
                column_name: "data_procedure",
                sql_type: "CHAR",
                length : 22,
                nullable: false,
                title: "@{Auria.Column.ResourceAccessShare.DataProcedure.Title}",
                description: "@{Auria.Column.ResourceAccessShare.DataProcedure.Description}",
                status: "active"
            }),
            // Extra Information
            new ColumnRow({
                name: "Extra Information",
                column_name: "extra_information",
                sql_type: "JSON",
                nullable: true,
                title: "@{Auria.Column.ResourceAccessShare.ExtraInformation.Title}",
                description: "@{Auria.Column.ResourceAccessShare.ExtraInformation.Description}",
                status: "active"
            }),
            
        );

        this.addReferences(
            // Resource ID
            new ReferenceRow(this, {
                name : "Activity_Belong_To_Resource",
                resource_id : this.get("_id"),
                resource_table_name : this.get("table_name"),
                resource_column_name : "resource_id",

                reference_table_name : ResourceCatalog.Resource.table_name,
                reference_column_name : "_id"
            }),

            // User ID
            new ReferenceRow(this, {
                name : "Activity_Performed_By_User",
                resource_id : this.get("_id"),
                resource_table_name : this.get("table_name"),
                resource_column_name : "user_id",

                reference_table_name : ResourceCatalog.User.table_name,
                reference_column_name : "_id"
            }),
            // Role ID
            new ReferenceRow(this, {
                name : "Activity_Performed_By_Role",
                resource_id : this.get("_id"),
                resource_table_name : this.get("table_name"),
                resource_column_name : "role_id",

                reference_table_name : ResourceCatalog.Role.table_name,
                reference_column_name : "_id"
            }),

            // User Authority
            new ReferenceRow(this, {
                name : "Activity_Authorized_By_User",
                resource_id : this.get("_id"),
                resource_table_name : this.get("table_name"),
                resource_column_name : "user_authority",

                reference_table_name : ResourceCatalog.User.table_name,
                reference_column_name : "_id"
            }),
            // Role Authority
            new ReferenceRow(this, {
                name : "Activity_Authorized_By_Role",
                resource_id : this.get("_id"),
                resource_table_name : this.get("table_name"),
                resource_column_name : "role_authority",

                reference_table_name : ResourceCatalog.Role.table_name,
                reference_column_name : "_id"
            }),


        )
    }
}