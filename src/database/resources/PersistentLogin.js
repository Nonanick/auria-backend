import { ResourceRow } from './sql/ResourceRow.js';
import { ResourceCatalog } from './ResourceCatalog.js';
import { ColumnRow } from './sql/ColumnRow.js';
import { ReferenceRow } from './sql/ReferenceRow.js';
export class PersistentLogin extends ResourceRow {
    constructor() {
        super({
            name: ResourceCatalog.PersistentLogin.name,
            table_name: ResourceCatalog.PersistentLogin.table_name,
            title: "@{Auria.Resources.Session.Title}",
            description: "@{Auria.Resources.Session.Description}",
            is_system_resource: true,
        });
        this.addColumns(
        // Username
        new ColumnRow({
            name: "Username",
            column_name: "username",
            sql_type: "VARCHAR",
            column_keys: ["IND"],
            nullable: false,
            title: "@{Auria.Columns.Session.Username.Title}",
            description: "@{Auria.Columns.Session.Username.Description}",
            resource_id: this.get("_id")
        }), 
        // Token
        new ColumnRow({
            name: "Token",
            column_name: "token",
            sql_type: "TEXT",
            nullable: false,
            title: "@{Auria.Columns.Session.Token.Title}",
            description: "@{Auria.Columns.Session.Token.Description}",
            resource_id: this.get("_id")
        }), 
        // Referer Identification
        new ColumnRow({
            name: "Referer Identification",
            column_name: "referer_identification",
            sql_type: "TEXT",
            nullable: false,
            title: "@{Auria.Columns.Session.MachineIp.Title}",
            description: "@{Auria.Columns.Session.MachineIp.Description}",
            resource_id: this.get("_id"),
            default_value: "IP_NOT_PROVIDED",
        }), 
        // Login Time
        new ColumnRow({
            name: "Login Time",
            column_name: "login_time",
            sql_type: "DATETIME",
            nullable: false,
            title: "@{Auria.Columns.Session.LoginTime.Title}",
            description: "@{Auria.Columns.Session.LoginTime.Description}",
            resource_id: this.get("_id"),
        }));
        this.addReferences(new ReferenceRow(this, {
            name: "Username_Has_Persistent_Login",
            resource_id: this.get("_id"),
            resource_table_name: this.get("table_name"),
            resource_column_name: "username",
            reference_table_name: ResourceCatalog.User.table_name,
            reference_column_name: "username"
        }));
    }
}
//# sourceMappingURL=PersistentLogin.js.map