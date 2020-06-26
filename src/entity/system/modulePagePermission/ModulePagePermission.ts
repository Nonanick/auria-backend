import { EntityClass } from "../../EntityClass";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema";
import { EntityCatalog } from "../../../database/schema/EntityCatalog.js";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";

export class ModulePagePermission extends EntityClass {

    constructor() {
        super(EntityCatalog.ModulePagePermission.name);

        this.addColumns(
            // ID
            this.buildDefaultIdColumn(),

            // Page ID
            {
                name: "Page ID",
                info: {
                    title: "@{Auria.Columns.EntityPagePermission.PageID.Title}",
                    description: "@{Auria.Columns.EntityPagePermission.PageID.Description}",
                },
                schema: {
                    column_name: "page_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: false,
                    column_keys: ["IND"],
                    status: "active"
                }
            },
            // User ID
            {
                name: "User ID",
                info: {
                    title: "@{Auria.Columns.EntityPagePermission.UserID.Title}",
                    description: "@{Auria.Columns.EntityPagePermission.UserID.Description}",
                },
                schema: {
                    column_name: "user_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: true,
                    column_keys: ["IND"],
                    status: "active"
                }
            },
            // Role ID
            {
                name: "Role ID",
                info: {
                    title: "@{Auria.Columns.EntityPagePermission.RoleID.Title}",
                    description: "@{Auria.Columns.EntityPagePermission.RoleID.Description}",
                },
                schema: {
                    column_name: "role_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: true,
                    column_keys: ["IND"],
                }
            },
            // Status
            this.buildDefaultStatusColumn()
        );

        this.addReferences(
            // Role ID
            {
                name : "Page_Permission_Applies_To_Role",
                column : "role_id",
                references : {
                    column : "_id",
                    inEntity : EntityCatalog.Role.name,
                    inTable : EntityCatalog.Role.table_name,
                }
            },
            // User ID
            {
                name : "Page_Permission_Applies_To_User",
                column : "user_id",
                references : {
                    column : "_id",
                    inEntity : EntityCatalog.User.name,
                    inTable : EntityCatalog.User.table_name,
                }
            },
            // Page ID
            {
                name : "Page_Permission_Applies_To_Page",
                column : "page_id",
                references : {
                    column : "_id",
                    inEntity : EntityCatalog.ModulePage.name,
                    inTable : EntityCatalog.ModulePage.table_name,
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
            title: "@{Auria.Entity.ModulePagePermission.Title}",
            description: "@{Auria.Entity.ModulePagePermission.Description}",
        };
    }

    protected buildSchema(): EntitySchema {
        return new EntitySchema({
            table_name: EntityCatalog.ModulePagePermission.table_name,
            is_system_entity: true,
        });
    }

}