import { ResourceRow } from "./sql/ResourceRow.js";
import { ResourceCatalog } from "./ResourceCatalog.js";
import { ColumnRow } from "./sql/ColumnRow.js";

export class User extends ResourceRow {
 
    constructor() {
        super({
            name : ResourceCatalog.User.name,
            table_name : ResourceCatalog.User.table_name,
            title : "@{Auria.Resource.User.Title}",
            description : "@{Auria.Resource.User.Description}",
            is_system_resource : true,
            status : "active"
        });

        this.addColumns(
            // Username
            new ColumnRow({
                name : "Username",
                column_name :"username",
                sql_type : "VARCHAR",
                title : "@{Auria.Columns.User.Username.Title}",
                description : "@{Auria.Columns.User.Username.Description}",
                nullable : false,
                column_keys : ["UNI"],
                status : "active"
            }),
            // Password
            new ColumnRow({
                name :"Password",
                column_name : "password",
                sql_type : "VARCHAR",
                title :"@{Auria.Columns.User.Password.Title}",
                description : "@{Auria.Columns.User.Password.Description}",
                nullable : false,
                status : "active"
            }),
            // User Privilege
            new ColumnRow({
                name :"User Privilege",
                column_name : "user_privilege",
                sql_type :"INT",
                nullable : false,
                default_value : 1,
                title :"@{Auria.Columns.User.UserPrivilege.Title}",
                description : "@{Auria.Columns.User.UserPrivilege.Description}",
                status : "active"
            })
        );

    }
}