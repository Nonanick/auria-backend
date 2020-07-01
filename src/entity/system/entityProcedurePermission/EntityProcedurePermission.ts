import { EntityClass } from "../../EntityClass.js";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema.js";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";
import { SystemEntityCatalog } from "../../../database/schema/SystemEntityCatalog.js";

export class EntityProcedurePermission extends EntityClass {

    constructor() {
        super(SystemEntityCatalog.EntityProcedurePermission.name);

        this.addColumns(
            // _ID
            this.buildDefaultIdColumn(),

            // Entity Name
            {
                name: "Entity Name",
                info: {
                    title: "@{Auria.Columns.EntityProcedurePermission.EntityName.Title}",
                    description: "@{Auria.Columns.EntityProcedurePermission.EntityName.Description}"
                },
                schema: {
                    column_name: "entity_name",
                    sql_type: "VARCHAR",
                    nullable: false,
                    required: true,
                }
            },

            // User ID
            {
                name: "User ID",
                info: {
                    title: "@{Auria.Columns.EntityProcedurePermission.UserID.Title}",
                    description: "@{Auria.Columns.EntityProcedurePermission.UserID.Description}"
                },
                schema: {
                    column_name: "user_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: false,
                }
            },
            // Role ID
            {
                name: "Role ID",
                info: {
                    title: "@{Auria.Columns.EntityProcedurePermission.RoleID.Title}",
                    description: "@{Auria.Columns.EntityProcedurePermission.RoleID.Description}"
                },
                schema: {
                    column_name: "role_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: true,
                }
            },

            // Procedure
            {
                name: "Procedure",
                info: {
                    title: "@{Auria.Columns.EntityProcedurePermission.Procedure.Title}",
                    description: "@{Auria.Columns.EntityProcedurePermission.Procedure.Description}"
                },
                schema: {
                    column_name: "procedure",
                    sql_type: "VARCHAR",
                    nullable: false,
                    required: true,
                }
            },

            this.buildDefaultStatusColumn()
        );

        this.addReferences(
            // Entity Name
            {
                name: "Procedure_Permission_Applies_To_Entity",
                column: "entity_name",
                references: {
                    column: "name",
                    inEntity: SystemEntityCatalog.Entity.name,
                    inTable: SystemEntityCatalog.Entity.table_name
                }
            },

            // User ID
            {
                name : "Procedure_Permission_Belongs_To_User",
                column : "user_id",
                references : {
                    column : "_id",
                    inEntity : SystemEntityCatalog.User.name,
                    inTable : SystemEntityCatalog.User.table_name
                }
            },

            // Role ID
            {
                name : "Procedure_Permission_Belongs_To_Role",
                column : "role_id",
                references : {
                    column : "_id",
                    inEntity : SystemEntityCatalog.Role.name,
                    inTable : SystemEntityCatalog.Role.table_name
                }
            },
        );
    }

    public getBootDependencies(): string[] {
        return [];
    }

    public getBootFunction(): () => boolean | Promise<boolean> {
        return () => true;
    }

    protected buildSchema(): EntitySchema {
        return new EntitySchema({
            table_name: SystemEntityCatalog.EntityProcedurePermission.table_name,
            is_system_entity: true
        });
    }

    protected buildInfo(): IEntityInfo {
        return {
            title: "@{Auria.Entity.EntityProcedurePermission.Title}",
            description: "@{Auria.Entity.EntityProcedurePermission.Description}"
        };
    }

}