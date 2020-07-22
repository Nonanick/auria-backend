import { EntityClass } from "../../EntityClass.js";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema.js";
import { SystemEntityCatalog } from "../../../database/schema/SystemEntityCatalog.js";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";

export class EntityProcedureHistory extends EntityClass {
  protected defineColumnSchema(): (
    | import("../../ColumnClass.js").ColumnClass
    | import("../../ColumnClass.js").ColumnClassParameters
  )[] {
    return [
      // Entity ID
      {
        name: "Entity ID",
        info: {
          title: "@{Auria.Columns.EntityActivty.EntityID.Title}",
          description: "@{Auria.Column.EntityActivity.EntityID.Description}",
        },
        schema: {
          column_name: "entity_name",
          sql_type: "CHAR",
          length: 22,
          nullable: false,
        },
      },
      // Entity Row ID
      {
        name: "Entity Row ID",
        info: {
          title: "@{Auria.Columns.EntityActivty.EntitySchemaID.Title}",
          description:
            "@{Auria.Column.EntityActivity.EntitySchemaID.Description}",
        },
        schema: {
          column_name: "entity_row_id",
          sql_type: "CHAR",
          length: 22,
          nullable: false,
        },
      },
      // User ID
      {
        name: "User ID",
        info: {
          title: "@{Auria.Columns.EntityActivty.UserID.Title}",
          description: "@{Auria.Column.EntityActivity.UserID.Description}",
        },
        schema: {
          column_name: "user_id",
          sql_type: "CHAR",
          length: 22,
          nullable: false,
        },
      },
      // Role ID
      {
        name: "Role ID",
        info: {
          title: "@{Auria.Columns.EntityActivty.UserID.Title}",
          description: "@{Auria.Column.EntityActivity.UserID.Description}",
        },
        schema: {
          column_name: "role_id",
          sql_type: "CHAR",
          length: 22,
          nullable: false,
        },
      },
      // User Authority
      {
        name: "User Authority",
        info: {
          title: "@{Auria.Column.EntityActivty.UserAuthority.Title}",
          description:
            "@{Auria.Column.EntityActivty.UserAuthority.Description}",
        },
        schema: {
          column_name: "user_authority",
          sql_type: "CHAR",
          length: 22,
          nullable: true,
        },
      },
      // Role Authority
      {
        name: "Role Authority",
        info: {
          title: "@{Auria.Column.EntityActivty.RoleAuthority.Title}",
          description:
            "@{Auria.Column.EntityActivty.RoleAuthority.Description}",
        },
        schema: {
          column_name: "role_authority",
          sql_type: "CHAR",
          length: 22,
          nullable: true,
        },
      },
      // Data Procedure
      {
        name: "Data Procedure",
        info: {
          title: "@{Auria.Column.EntityAccessShare.DataProcedure.Title}",
          description:
            "@{Auria.Column.EntityAccessShare.DataProcedure.Description}",
        },
        schema: {
          column_name: "data_procedure",
          sql_type: "CHAR",
          length: 22,
          nullable: false,
        },
      },
      // Extra Information
      {
        name: "Extra Information",
        info: {
          title: "@{Auria.Column.EntityAccessShare.ExtraInformation.Title}",
          description:
            "@{Auria.Column.EntityAccessShare.ExtraInformation.Description}",
        },
        schema: {
          column_name: "extra_information",
          sql_type: "JSON",
          nullable: true,
        },
      },
    ];
  }

  constructor() {
    super(SystemEntityCatalog.EntityProcedureHistory.name);

    this.addReferences(
      // Entity ID
      {
        name: "Procedure_Made_In_Entity",
        table: SystemEntityCatalog.EntityProcedureHistory.table_name,
        entity: SystemEntityCatalog.EntityProcedureHistory.name,
        column: "entity_name",
        references: {
          column: "name",
          inEntity: SystemEntityCatalog.Entity.name,
          inTable: SystemEntityCatalog.Entity.table_name,
        },
      },
      // Role ID
      {
        name: "Procedure_Made_By_Role",
        table: SystemEntityCatalog.EntityProcedureHistory.table_name,
        entity: SystemEntityCatalog.EntityProcedureHistory.name,
        column: "role_id",
        references: {
          column: "_id",
          inEntity: SystemEntityCatalog.Role.name,
          inTable: SystemEntityCatalog.Role.table_name,
        },
      },
      // User ID
      {
        name: "Procedure_Made_By_User",
        table: SystemEntityCatalog.EntityProcedureHistory.table_name,
        entity: SystemEntityCatalog.EntityProcedureHistory.name,
        column: "user_id",
        references: {
          column: "_id",
          inEntity: SystemEntityCatalog.User.name,
          inTable: SystemEntityCatalog.User.table_name,
        },
      },
      // Role Authority
      {
        name: "Procedure_Made_With_Role_Authority",
        table: SystemEntityCatalog.EntityProcedureHistory.table_name,
        entity: SystemEntityCatalog.EntityProcedureHistory.name,
        column: "role_authority",
        references: {
          column: "_id",
          inEntity: SystemEntityCatalog.Role.name,
          inTable: SystemEntityCatalog.Role.table_name,
        },
      },
      // User Authority
      {
        name: "Procedure_Made_With_User_Authority",
        table: SystemEntityCatalog.EntityProcedureHistory.table_name,
        entity: SystemEntityCatalog.EntityProcedureHistory.name,
        column: "user_authority",
        references: {
          column: "_id",
          inEntity: SystemEntityCatalog.User.name,
          inTable: SystemEntityCatalog.User.table_name,
        },
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
      title: "@{Auria.Entity.EntityProcedureHistory.Title}",
      description: "@{Auria.Entity.EntityProcedureHistory.Description}",
    };
  }

  protected buildSchema(): EntitySchema {
    return new EntitySchema({
      table_name: SystemEntityCatalog.EntityProcedureHistory.table_name,
      is_system_entity: true,
    });
  }
}
