import { EntityClass } from '../../EntityClass.js';
import { EntitySchema } from '../../../database/schema/sql/EntitySchema.js';
import { IEntityInfo } from '../../standart/info/IEntityInfo.js';
import { ColumnClass, ColumnClassParameters } from '../../ColumnClass.js';
import { SystemEntityCatalog } from '../../../database/schema/SystemEntityCatalog.js';

export class ColumnValidation extends EntityClass {

  constructor() {
    super(SystemEntityCatalog.ColumnValidation.name);
  }
  public getBootDependencies(): string[] {
    return [];
  }
  public getBootFunction(): () => boolean | Promise<boolean> {
   return () => true;
  }
  protected defineColumnSchema(): (ColumnClass |ColumnClassParameters)[] {
    return [
      // ID
      this.buildDefaultIdColumn(),

      // Column ID
      {
        name : "Column ID",
        info : {
          title : '@{Auria.Column.ColumnValidation.ColumnId.Title}',
          description : '@{Auria.Column.ColumnValidation.ColumnId.Description}'
        },
        schema : {
          column_name : 'column_id',
          sql_type : 'CHAR',
          length : 22,
          nullable : false,
          required : true,
          column_keys : ['IND']
        }
      },

      // Validation ID
      {
        name : 'Validation ID',
        info : {
          title : '@{Auria.Column.ColumnValidation.ValidationId.Title}',
          description : '@{Auria.Column.ColumnValidation.ValidationId.Description}'
        },
        schema : {
          column_name : 'validation_id',
          sql_type : 'CHAR',
          length : 22,
          nullable : false,
          required : true,
          column_keys : ['IND']
        }
      },

      this.buildDefaultStatusColumn()
    ];
  }
  
  protected buildSchema(): EntitySchema {
    return new EntitySchema({
      table_name : SystemEntityCatalog.ColumnValidation.table_name,
      is_system_entity : true
    });
  }

  protected buildInfo(): IEntityInfo {
    return {
      title : '@{Auria.Entity.ColumnValidation.Title}',
      description : '@{Auria.Entity.ColumnValidation.Title}'
    };
  }

}