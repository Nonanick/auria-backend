import { EntityClass } from "../../EntityClass";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema";
import { EntityCatalog } from "../../../database/schema/EntityCatalog.js";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";

export class User extends EntityClass {

    constructor() {
        super(EntityCatalog.User.name);

        this.addColumns(
            // _ID
            this.buildDefaultIdColumn(),

            // Username
            {
                name: "Username",
                info: {
                    title: "@{Auria.Columns.User.Username.Title}",
                    description: "@{Auria.Columns.User.Username.Description}",
                },
                schema: {
                    column_name: "username",
                    sql_type: "VARCHAR",
                    nullable: false,
                    column_keys: ["UNI"],
                    status: "active"
                }
            },
            // Password
            {
                name: "Password",
                info: {
                    title: "@{Auria.Columns.User.Password.Title}",
                    description: "@{Auria.Columns.User.Password.Description}",
                },
                schema: {
                    column_name: "password",
                    sql_type: "VARCHAR",
                    nullable: false,
                    status: "active",
                    readable: false
                }
            },
            // User Privilege
            {
                name: "User Privilege",
                info: {
                    title: "@{Auria.Columns.User.UserPrivilege.Title}",
                    description: "@{Auria.Columns.User.UserPrivilege.Description}",
                },
                schema: {
                    column_name: "user_privilege",
                    sql_type: "INT",
                    nullable: false,
                    default_value: 1,
                    status: "active"
                }
            },

            // Status
            this.buildDefaultStatusColumn()
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
            title: "@{Auria.Entity.User.Title}",
            description: "@{Auria.Entity.User.Description}"
        };
    }

    protected buildSchema(): EntitySchema {
        return new EntitySchema({
            table_name: EntityCatalog.User.table_name,
            is_system_entity: true
        });
    }

}