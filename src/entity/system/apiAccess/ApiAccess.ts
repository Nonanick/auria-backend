import { EntityClass } from "../../EntityClass.js";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema.js";
import { EntityCatalog } from "../../../database/schema/EntityCatalog.js";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";

export class ApiAccess extends EntityClass {

    constructor() {
        super(EntityCatalog.ApiAccess.name);

        this.addColumns(
            // _ID
            this.buildDefaultIdColumn(),

            // URL
            {
                name: "URL",
                info: {
                    title: "@{Auria.Columns.ApiAccess.URL.Title}",
                    description: "@{Auria.Columns.ApiAccess.URL.Description}",
                },
                schema: {
                    column_name: "url",
                    sql_type: "VARCHAR",
                    nullable: false,
                },
            },
            // User ID
            {
                name: "User ID",
                info: {
                    title: "@{Auria.Columns.ApiAccess.UserID.Title}",
                    description: "@{Auria.Columns.ApiAccess.UserID.Description}",
                },
                schema: {
                    column_name: "user_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: true,
                    column_keys: ["IND"]
                },
            },
            // Role ID
            {
                name: "Role ID",
                info: {
                    title: "@{Auria.Columns.ApiAccess.RoleID.Title}",
                    description: "@{Auria.Columns.ApiAccess.RoleID.Description}",
                },
                schema: {
                    column_name: "role_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: true,
                    column_keys: ["IND"]
                },
            },
            // Description
            {
                name: "Description",
                info: {
                    title: "@{Auria.Columns.ApiAccess.Description.Title}",
                    description: "@{Auria.Columns.ApiAccess.Description.Description}",
                },
                schema: {
                    column_name: "description",
                    sql_type: "TEXT",
                    nullable: true,
                },
            },

            // Status
            this.buildDefaultStatusColumn()
        );

        this.addReferences(
            // User ID
            {
                name : "User_Has_Access_To_Api",
                column : "user_id",
                references : {
                    column : "_id",
                    inEntity : EntityCatalog.User.name,
                    inTable : EntityCatalog.User.table_name,
                }
            },
            // Role ID
            {
                name : "Role_Has_Access_To_Api",
                column : "role_id",
                references : {
                    column : "_id",
                    inEntity : EntityCatalog.Role.name,
                    inTable : EntityCatalog.Role.table_name,
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
            title: "@{Auria.Entity.ApiAccess.Title}",
            description: "@{Auria.Entity.ApiAccess.Description}"
        };
    }

    protected buildSchema(): EntitySchema {
        return new EntitySchema({
            table_name: EntityCatalog.ApiAccess.table_name,
            is_system_entity: true
        });
    }

}