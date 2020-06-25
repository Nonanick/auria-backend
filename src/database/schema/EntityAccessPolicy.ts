import { EntitySchema } from "./sql/EntitySchema.js";
import { EntityCatalog } from "./EntityCatalog.js";
import { ColumnSchema } from "./sql/ColumnSchema.js";
import { ReferenceSchema } from "./sql/ReferenceSchema.js";

export class EntityAccessPolicy extends EntitySchema {

    constructor() {
        super({
            name: EntityCatalog.EntityAccessPolicy.name,
            table_name: EntityCatalog.EntityAccessPolicy.table_name,
            title: "@{Auria.Entity.EntityAccessPolicy.Title}",
            description: "@{Auria.Entity.EntityAccessPolicy.Description}",
            status: "active",
            is_system_entity: true,
        });

        this.addColumns(
            // Entity ID
            new ColumnSchema({
                name: "Entity ID",
                column_name: "entity_id",
                sql_type: "CHAR",
                length : 22,
                nullable: false,
                title: "@{Auria.Columns.EntityAccessPolicy.EntityID.Title}",
                description: "@{Auria.Columns.EntityAccessPolicy.EntityID.Description}",
            }),
            // User ID
            new ColumnSchema({
                name: "User ID",
                column_name: "user_id",
                sql_type: "CHAR",
                length : 22,
                nullable: true,
                title: "@{Auria.Columns.EntityAccessPolicy.UserID.Title}",
                description: "@{Auria.Columns.EntityAccessPolicy.UserID.Description}",
            }),
            // Role ID
            new ColumnSchema({
                name: "Role ID",
                column_name: "role_id",
                sql_type: "CHAR",
                length : 22,
                nullable: true,
                title: "@{Auria.Columns.EntityAccessPolicy.RoleID.Title}",
                description: "@{Auria.Columns.EntityAccessPolicy.RoleID.Description}",
            }),
            // Entity Row ID
            new ColumnSchema({
                name: "Entity Row ID",
                column_name: "entity_row_id",
                sql_type: "CHAR",
                length : 22,
                nullable: false,
                title: "@{Auria.Columns.EntityAccessPolicy.EntitySchemaID.Title}",
                description: "@{Auria.Columns.EntityAccessPolicy.EntitySchemaID.Description}",
            }),
            // Data Procedure
            new ColumnSchema({
                name: "Data Procedure",
                column_name: "data_procedure",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Columns.EntityAccessPolicy.DataProcedure.Title}",
                description: "@{Auria.Columns.EntityAccessPolicy.DataProcedure.Description}",
            }),
        );

        this.addReferences(
            // Entity ID
            new ReferenceSchema(this, {
                name: "Entity_Which_Policy_Applies",
                // Source Info
                entity_id : this.get("_id"),
                entity_table_name : this.get("table_name"),
                entity_column_name : "entity_id",

                // Reference Info
                reference_table_name : EntityCatalog.Entity.table_name,
                reference_column_name : "_id"
            }),

             // User ID
             new ReferenceSchema(this, {
                name: "User_That_Policy_Applies_To",
                // Source Info
                entity_id : this.get("_id"),
                entity_table_name : this.get("table_name"),
                entity_column_name : "user_id",

                // Reference Info
                reference_table_name : EntityCatalog.User.table_name,
                reference_column_name : "_id"
            }),

            // Role ID
            new ReferenceSchema(this, {
                name: "Role_That_Policy_Applies_To",
                // Source Info
                entity_id : this.get("_id"),
                entity_table_name : this.get("table_name"),
                entity_column_name : "role_id",

                // Reference Info
                reference_table_name : EntityCatalog.Role.table_name,
                reference_column_name : "_id"
            })
        )
    }
}