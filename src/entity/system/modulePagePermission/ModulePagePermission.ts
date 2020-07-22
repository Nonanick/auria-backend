import { EntityClass } from "../../EntityClass.js";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema.js";
import { SystemEntityCatalog } from "../../../database/schema/SystemEntityCatalog.js";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";
import { ColumnClass, ColumnClassParameters } from "../../ColumnClass.js";

export class ModulePagePermission extends EntityClass {
  protected defineColumnSchema(): (ColumnClass | ColumnClassParameters)[] {
    return [
      // ID
      this.buildDefaultIdColumn(),

      // Page ID
      {
        name: "Page ID",
        info: {
          title: "@{Auria.Columns.EntityPagePermission.PageID.Title}",
          description:
            "@{Auria.Columns.EntityPagePermission.PageID.Description}",
        },
        schema: {
          column_name: "page_id",
          sql_type: "CHAR",
          length: 22,
          nullable: false,
          column_keys: ["IND"],
        },
      },
      // User ID
      {
        name: "User ID",
        info: {
          title: "@{Auria.Columns.EntityPagePermission.UserID.Title}",
          description:
            "@{Auria.Columns.EntityPagePermission.UserID.Description}",
        },
        schema: {
          column_name: "user_id",
          sql_type: "CHAR",
          length: 22,
          nullable: true,
          column_keys: ["IND"],
        },
      },
      // Role ID
      {
        name: "Role ID",
        info: {
          title: "@{Auria.Columns.EntityPagePermission.RoleID.Title}",
          description:
            "@{Auria.Columns.EntityPagePermission.RoleID.Description}",
        },
        schema: {
          column_name: "role_id",
          sql_type: "CHAR",
          length: 22,
          nullable: true,
          column_keys: ["IND"],
        },
      },
      // Status
      this.buildDefaultStatusColumn(),
    ];
  }

  constructor() {
    super(SystemEntityCatalog.ModulePagePermission.name);

    this.addReferences(
      // Role ID
      {
        name: "Page_Permission_Applies_To_Role",
        table: SystemEntityCatalog.ModulePagePermission.table_name,
        entity: SystemEntityCatalog.ModulePagePermission.name,
        column: "role_id",
        references: {
          column: "_id",
          inEntity: SystemEntityCatalog.Role.name,
          inTable: SystemEntityCatalog.Role.table_name,
        },
      },
      // User ID
      {
        name: "Page_Permission_Applies_To_User",
        table: SystemEntityCatalog.ModulePagePermission.table_name,
        entity: SystemEntityCatalog.ModulePagePermission.name,
        column: "user_id",
        references: {
          column: "_id",
          inEntity: SystemEntityCatalog.User.name,
          inTable: SystemEntityCatalog.User.table_name,
        },
      },
      // Page ID
      {
        name: "Page_Permission_Applies_To_Page",
        table: SystemEntityCatalog.ModulePagePermission.table_name,
        entity: SystemEntityCatalog.ModulePagePermission.name,
        column: "page_id",
        references: {
          column: "_id",
          inEntity: SystemEntityCatalog.ModulePage.name,
          inTable: SystemEntityCatalog.ModulePage.table_name,
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
      title: "@{Auria.Entity.ModulePagePermission.Title}",
      description: "@{Auria.Entity.ModulePagePermission.Description}",
    };
  }

  protected buildSchema(): EntitySchema {
    return new EntitySchema({
      table_name: SystemEntityCatalog.ModulePagePermission.table_name,
      is_system_entity: true,
    });
  }
}
