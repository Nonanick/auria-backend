import { EntityClass } from "../../EntityClass";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";
import { EntityCatalog } from "../../../database/schema/EntityCatalog.js";

export class UserRole extends EntityClass {
    
    constructor() {
        super(EntityCatalog.UserRole.name);

        this.addColumns(
            // _ID
            this.buildDefaultIdColumn(),
            // User ID
            {
                name: "User ID",
                info: {
                    title: "@{Auria.Columns.UserRole.UserID.Title}",
                    description: "@{Auria.Columns.UserRole.UserID.Description}",
                },
                schema: {
                    column_name: "user_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: false,
                    column_keys: ["IND"],
                }
            },
            // Role ID
            {
                name: "Role ID",
                info: {
                    title: "@{Auria.Columns.UserRole.RoleID.Title}",
                    description: "@{Auria.Columns.UserRole.RoleID.Description}",
                },
                schema: {
                    column_name: "role_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: false,
                    column_keys: ["IND"],
                }
            },
            // Name
            {
                name: "Name",
                info: {
                    title: "@{Auria.Columns.UserRole.Name.Title}",
                    description: "@{Auria.Columns.UserRole.Name.Description}",
                },
                schema: {
                    column_name: "name",
                    sql_type: "VARCHAR",
                    nullable: true,
                }
            },
            // Description
            {
                name: "Description",
                info: {
                    title: "@{Auria.Columns.UserRole.Description.Title}",
                    description: "@{Auria.Columns.UserRole.Description.Description}",
                },
                schema: {
                    column_name: "description",
                    sql_type: "VARCHAR",
                    nullable: true,
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
            title: "@{Auria.Entity.UserRole.Title}",
            description: "@{Auria.Entity.UserRole.Description}"
        };
    }

    protected buildSchema(): EntitySchema {
        return new EntitySchema({
            table_name: EntityCatalog.UserRole.table_name,
            is_system_entity: true
        });
    }

}