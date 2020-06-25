import { EntityClass } from "../../EntityClass";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema";
import { EntityHistorySchema } from "../../../database/schema/EntityActivity";

export class EntityPrecedureHistory extends EntityClass {

    constructor() {
        super();

        this.addColumns(
            // Entity ID
            {
                schema: {
                    name: "Entity ID",
                    column_name: "entity_id",
                    sql_type: "CHAR",
                    length: 22,
                    title: "@{Auria.Columns.EntityActivty.EntityID.Title}",
                    description: "@{Auria.Column.EntityActivity.EntityID.Description}",
                    nullable: false,
                    status: "active"
                }
            },
            // Entity Row ID
            {
                schema: {
                    name: "Entity Row ID",
                    column_name: "entity_row_id",
                    sql_type: "CHAR",
                    length: 22,
                    title: "@{Auria.Columns.EntityActivty.EntitySchemaID.Title}",
                    description: "@{Auria.Column.EntityActivity.EntitySchemaID.Description}",
                    nullable: false,
                    status: "active"
                }
            },
            // User ID
            {
                schema: {
                    name: "User ID",
                    column_name: "user_id",
                    sql_type: "CHAR",
                    length: 22,
                    title: "@{Auria.Columns.EntityActivty.UserID.Title}",
                    description: "@{Auria.Column.EntityActivity.UserID.Description}",
                    nullable: false,
                    status: "active"
                }
            },
            // Role ID
            {
                schema: {
                    name: "Role ID",
                    column_name: "role_id",
                    sql_type: "CHAR",
                    length: 22,
                    title: "@{Auria.Columns.EntityActivty.UserID.Title}",
                    description: "@{Auria.Column.EntityActivity.UserID.Description}",
                    nullable: false,
                    status: "active"
                }
            },
            // User Authority
            {
                schema: {
                    name: "User Authority",
                    column_name: "user_authority",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: true,
                    title: "@{Auria.Column.EntityActivty.UserAuthority.Title}",
                    description: "@{Auria.Column.EntityActivty.UserAuthority.Description}",
                    status: "active"
                }
            },
            // Role Authority
            {
                schema: {
                    name: "Role Authority",
                    column_name: "role_authority",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: true,
                    title: "@{Auria.Column.EntityActivty.RoleAuthority.Title}",
                    description: "@{Auria.Column.EntityActivty.RoleAuthority.Description}",
                    status: "active"
                }
            },
            // Data Procedure
            {
                schema: {
                    name: "Data Procedure",
                    column_name: "data_procedure",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: false,
                    title: "@{Auria.Column.EntityAccessShare.DataProcedure.Title}",
                    description: "@{Auria.Column.EntityAccessShare.DataProcedure.Description}",
                    status: "active"
                }
            },
            // Extra Information
            {
                schema: {
                    name: "Extra Information",
                    column_name: "extra_information",
                    sql_type: "JSON",
                    nullable: true,
                    title: "@{Auria.Column.EntityAccessShare.ExtraInformation.Title}",
                    description: "@{Auria.Column.EntityAccessShare.ExtraInformation.Description}",
                    status: "active"
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
        return new EntityHistorySchema();
    }

}