import { EntityClass } from "../../EntityClass.js";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema.js";
import { SystemEntityCatalog } from "../../../database/schema/SystemEntityCatalog.js";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";
import { ColumnClass, ColumnClassParameters } from "../../ColumnClass.js";

export class PersistentLogin extends EntityClass {

  protected defineColumnSchema(): (ColumnClass | ColumnClassParameters)[] {
    return [
      // _ID
      this.buildDefaultIdColumn(),

      // Username
      {
        name: "Username",
        info: {
          title: "@{Auria.Columns.Session.Username.Title}",
          description: "@{Auria.Columns.Session.Username.Description}",
        },
        schema: {
          column_name: "username",
          sql_type: "VARCHAR",
          column_keys: ["IND"],
          nullable: false,
        },
      },

      // Token
      {
        name: "Token",
        info: {
          title: "@{Auria.Columns.Session.Token.Title}",
          description: "@{Auria.Columns.Session.Token.Description}",
        },
        schema: {
          column_name: "token",
          sql_type: "TEXT",
          nullable: false,
        },
      },

      // Referer Identification
      {
        name: "Referer Identification",
        info: {
          title: "@{Auria.Columns.Session.MachineIp.Title}",
          description: "@{Auria.Columns.Session.MachineIp.Description}",
        },
        schema: {
          column_name: "referer_identification",
          sql_type: "TEXT",
          nullable: false,
          default_value: "REFERER_NOT_IDENTIFIED",
        },
      },

      // Login Time
      {
        name: "Login Time",
        info: {
          title: "@{Auria.Columns.Session.LoginTime.Title}",
          description: "@{Auria.Columns.Session.LoginTime.Description}",
        },
        schema: {
          column_name: "login_time",
          sql_type: "DATETIME",
          nullable: false,
        },
      },

      // Status
      this.buildDefaultStatusColumn(),
    ];
  }

  constructor() {
    super(SystemEntityCatalog.PersistentLogin.name);

    this.addReferences({
      name: "Login_Associated_With_Username",
      table: SystemEntityCatalog.PersistentLogin.table_name,
      entity: SystemEntityCatalog.PersistentLogin.name,
      column: "username",
      references: {
        inEntity: SystemEntityCatalog.User.name,
        inTable: SystemEntityCatalog.User.table_name,
        column: "username",
      },
    });
  }
  
  public getBootDependencies(): string[] {
    return [];
  }

  public getBootFunction(): () => boolean | Promise<boolean> {
    return () => true;
  }

  protected buildInfo(): IEntityInfo {
    return {
      title: "@{Auria.Entity.PersistenLogin.Title}",
      description: "@{Auria.Entity.PersistenLogin.Description}",
    };
  }

  protected buildSchema(): EntitySchema {
    return new EntitySchema({
      table_name: SystemEntityCatalog.PersistentLogin.table_name,
      is_system_entity: true,
    });
  }
}
