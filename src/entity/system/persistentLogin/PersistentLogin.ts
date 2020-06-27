import { EntityClass } from "../../EntityClass";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema";
import { EntityCatalog } from "../../../database/schema/EntityCatalog.js";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";

export class PersistentLogin extends EntityClass {

    constructor() {
        super(EntityCatalog.PersistentLogin.name);

        this.addColumns(
            // _ID
            this.buildDefaultIdColumn(),

            // Username
            {
                name: "Username",
                info: {
                    title: "@{Auria.Columns.Session.Username.Title}",
                    description: "@{Auria.Columns.Session.Username.Description}",
                },
                schema: {
                    column_name: "username",
                    sql_type: "VARCHAR",
                    column_keys: ["IND"],
                    nullable: false,
                }
            },

            // Token
            {
                name: "Token",
                info: {
                    title: "@{Auria.Columns.Session.Token.Title}",
                    description: "@{Auria.Columns.Session.Token.Description}",
                },
                schema: {
                    column_name: "token",
                    sql_type: "TEXT",
                    nullable: false,
                }
            },

            // Referer Identification
            {
                name: "Referer Identification",
                info: {
                    title: "@{Auria.Columns.Session.MachineIp.Title}",
                    description: "@{Auria.Columns.Session.MachineIp.Description}",
                },
                schema: {
                    column_name: "referer_identification",
                    sql_type: "TEXT",
                    nullable: false,
                    default_value: "REFERER_NOT_IDENTIFIED",
                }
            },

            // Login Time
            {
                name: "Login Time",
                info: {
                    title: "@{Auria.Columns.Session.LoginTime.Title}",
                    description: "@{Auria.Columns.Session.LoginTime.Description}",
                },
                schema: {
                    column_name: "login_time",
                    sql_type: "DATETIME",
                    nullable: false,
                }
            },

            // Status
            this.buildDefaultStatusColumn()
        );

        this.addReferences(
            {
                name: "Login_Associated_With_Username",
                column: "username",
                references: {
                    inEntity: EntityCatalog.User.name,
                    inTable: EntityCatalog.User.table_name,
                    column: "username"
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

    protected buildInfo(): IEntityInfo {
        return {
            title: "@{Auria.Entity.PersistenLogin.Title}",
            description: "@{Auria.Entity.PersistenLogin.Description}",
        };
    }

    protected buildSchema(): EntitySchema {
        return new EntitySchema({
            table_name: EntityCatalog.PersistentLogin.table_name,
            is_system_entity: true
        });
    }

}