import { EntityClass } from "../../EntityClass.js";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema.js";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";
import { ColumnClass, ColumnClassParameters } from "../../ColumnClass.js";
import { SystemEntityCatalog } from "../../../database/schema/SystemEntityCatalog.js";

export class Validation extends EntityClass {

  constructor() {
    super(SystemEntityCatalog.Validation.name);
  }
  public getBootDependencies(): string[] {
    return [];
  }

  public getBootFunction(): () => boolean | Promise<boolean> {
    return () => true;
  }

  protected defineColumnSchema(): (ColumnClass | ColumnClassParameters)[] {
    return [

      // ID
      this.buildDefaultIdColumn(),

      // Name
      {
        name : 'Name',
        info : {
          title : '@{Auria.Column.Validation.Name.Title}',
          description : '@{Auria.Column.Validation.Name.Description}',
        },
        schema : {
          column_name : 'name',
          sql_type : 'VARCHAR',
          nullable : false,
          column_keys : ['UNI'],
          required : true,
        }
      },

      // Title
      {
        name : 'Title',
        info : {
          title : '@{Auria.Column.Validation.Title.Title}',
          description : '@{Auria.Column.Validation.Title.Description}',
        },
        schema : {
          column_name : 'title',
          sql_type : 'VARCHAR',
          nullable : false,
          required : true,
        }
      },

      // Description
      {
        name : 'Description',
        info : {
          title : '@{Auria.Column.Validation.Description.Title}',
          description : '@{Auria.Column.Validation.Description.Description}',
        },
        schema : {
          column_name : 'description',
          sql_type : 'TEXT',
          nullable : true,
          required : false,
        }
      },

      // Hint
      {
        name : 'Hint',
        info : {
          title : '@{Auria.Column.Validation.Hint.Title}',
          description : '@{Auria.Column.Validation.Hint.Description}',
        },
        schema : {
          column_name : 'hint',
          sql_type : 'TEXT',
          nullable : true,
          required : false,
        }
      },

      // Example
      {
        name : 'Example',
        info : {
          title : '@{Auria.Column.Validation.Example.Title}',
          description : '@{Auria.Column.Validation.Example.Description}',
        },
        schema : {
          column_name : 'example',
          sql_type : 'TEXT',
          nullable : true,
          required : false,
        }
      },

      // Parameters
      {
        name : "Parameters",
        info : {
          title : "@{Auria.Column.Validation.Parameters.Title}",
          description : "@{Auria.Column.Validation.Parameters.Description}"
        },
        schema : {
          column_name : 'parameters',
          sql_type : 'JSON',
          nullable : true,
          required : false,
          default_value : ''
        }
      },

      // Set parameters phrase
      {
        name : 'Parameters Phrase template',
        info : {
          title : '@{Auria.Column.Validation.ParametersPhrase.Title}',
          description : '@{Auria.Column.Validation.ParametersPhrase.Description}'
        },
        schema : {
          column_name : 'parameters_phrase',
          sql_type : 'TEXT',
          nullable : true,
          required : false,
        }
      },

      // Status
      this.buildDefaultStatusColumn(),
    ];
  }

  protected buildSchema(): EntitySchema {
    return new EntitySchema({
      table_name: SystemEntityCatalog.Validation.table_name,
      is_system_entity: true,
    });
  }

  protected buildInfo(): IEntityInfo {
    return {
      title: "@{Auria.Entity.Validation.Title}",
      description: "@{Auria.Entity.Validation.Description}",
    };
  }
}
