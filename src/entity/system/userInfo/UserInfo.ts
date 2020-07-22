import { EntityClass } from "../../EntityClass.js";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema.js";
import { SystemEntityCatalog } from "../../../database/schema/SystemEntityCatalog.js";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";
import { ColumnClass, ColumnClassParameters } from "../../ColumnClass.js";

export class UserInfo extends EntityClass {
  protected defineColumnSchema(): (ColumnClass | ColumnClassParameters)[] {
    return [
      // User ID
      {
        name: "User ID",
        info: {
          title: "@{Auria.Columns.UserInfo.UserID.Title}",
          description: "@{Auria.Columns.UserInfo.UserID.Description}",
        },
        schema: {
          column_name: "user_id",
          sql_type: "CHAR",
          length: 22,
          nullable: false,
          column_keys: ["PRI"],
        },
      },
      // Name
      {
        name: "Name",
        info: {
          title: "@{Auria.Columns.UserInfo.Name.Title}",
          description: "@{Auria.Columns.UserInfo.Name.Description}",
        },
        schema: {
          column_name: "name",
          sql_type: "VARCHAR",
          length: 100,
          nullable: false,
        },
      },
      // Surname
      {
        name: "Surname",
        info: {
          title: "@{Auria.Columns.UserInfo.Surname.Title}",
          description: "@{Auria.Columns.UserInfo.Surname.Description}",
        },
        schema: {
          column_name: "surname",
          sql_type: "VARCHAR",
          length: 100,
          nullable: true,
        },
      },
      // Email
      {
        name: "Email",
        info: {
          title: "@{Auria.Columns.UserInfo.Email.Title}",
          description: "@{Auria.Columns.UserInfo.Email.Description}",
        },
        schema: {
          column_name: "email",
          sql_type: "VARCHAR",
          length: 100,
          nullable: true,
        },
      },
      // Photo
      {
        name: "Photo",
        info: {
          title: "@{Auria.Columns.UserInfo.Photo.Title}",
          description: "@{Auria.Columns.UserInfo.Photo.Description}",
        },
        schema: {
          column_name: "photo",
          sql_type: "VARCHAR",
          nullable: true,
          default_value: "default-avatar",
        },
      },
    ];
  }

  constructor() {
    super(SystemEntityCatalog.UserInfo.name);

    this.addColumns();
  }

  public getBootDependencies(): string[] {
    return [];
  }

  public getBootFunction(): () => boolean | Promise<boolean> {
    return () => true;
  }

  protected buildInfo(): IEntityInfo {
    return {
      title: "@{Auria.Entity.UserInfo.Title}",
      description: "@{Auria.Entity.UserInfo.Description}",
    };
  }

  protected buildSchema(): EntitySchema {
    return new EntitySchema({
      table_name: SystemEntityCatalog.UserInfo.table_name,
      is_system_entity: true,
    });
  }
}
