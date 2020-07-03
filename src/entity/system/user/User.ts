import { EntityClass } from "../../EntityClass.js";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema.js";
import { SystemEntityCatalog } from "../../../database/schema/SystemEntityCatalog.js";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";
import bcrypt from 'bcrypt';

export class User extends EntityClass {

    constructor() {
        super(SystemEntityCatalog.User.name);

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
                },
                hooks: {
                    "CREATE": (context) => {
                        context.procedureData.password = bcrypt.hashSync(context.procedureData.password, 10);
                    }
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
            table_name: SystemEntityCatalog.User.table_name,
            is_system_entity: true
        });
    }

}