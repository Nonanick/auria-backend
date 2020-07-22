import { EntityClass } from "../../EntityClass.js";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema.js";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";
import { SystemEntityCatalog } from "../../../database/schema/SystemEntityCatalog.js";
import { ColumnClass, ColumnClassParameters } from "../../ColumnClass.js";

export class EntityFacade extends EntityClass {
  protected defineColumnSchema(): (ColumnClass | ColumnClassParameters)[] {
    return [
      // _id
      this.buildDefaultIdColumn(),

      // Name
      {
        name: "Name",
        info: {
          title: "@{Auria.Column.EntityFacade.Name.Title}",
          description: "@{Auria.Column.EntityFacade.Name.Description}",
        },
        schema: {
          column_name: "name",
          sql_type: "VARCHAR",
          column_keys: ["IND"],
          nullable: false,
          required: true,
        },
      },

      // Entity Name
      {
        name: "Entity Name",
        info: {
          title: "@{Auria.Column.EntityFacade.EntityName.Title}",
          description: "@{Auria.Column.EntityFacade.EntityName.Description}",
        },
        schema: {
          column_name: "entity_name",
          sql_type: "CHAR",
          length: 22,
          column_keys: ["IND"],
          nullable: false,
          required: true,
        },
      },

      this.buildDefaultStatusColumn(),
    ];
  }

  constructor() {
    super(SystemEntityCatalog.EntityFacade.name);

    this.addColumns();

    this.addReferences({
      name: "Facade_Belongs_To_Entity",
      table: SystemEntityCatalog.EntityFacade.table_name,
      entity: SystemEntityCatalog.EntityFacade.name,
      column: "entity_name",
      references: {
        column: "name",
        inEntity: SystemEntityCatalog.Entity.name,
        inTable: SystemEntityCatalog.Entity.table_name,
      },
    });
  }
  public getBootDependencies(): string[] {
    return [];
  }

  public getBootFunction(): () => boolean | Promise<boolean> {
    return () => true;
  }

  protected buildSchema(): EntitySchema {
    return new EntitySchema({
      table_name: SystemEntityCatalog.EntityFacade.table_name,
      is_system_entity: true,
    });
  }

  protected buildInfo(): IEntityInfo {
    return {
      title: "@{Auria.Entity.EntityFacade.Title}",
      description: "@{Auria.Entity.EntityFacade.Description}",
    };
  }
}
