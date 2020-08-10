import { EntityFoundation, IEntityInformation, IEntitySchema, EntityColumnsInType } from 'auria-entity';
import { DefaultIdDataType } from '../../dataType/DefaultIdDataType.js';
import { DefaultNameDataType } from '../../dataType/DefaultNameDataType.js';
import { DefaultDescriptionDataType } from '../../dataType/DefaultDescriptionDataType.js';
import { DefaultTitleDataType } from '../../dataType/DefaultTitleDataType.ts.js';

interface EntityProperties {
  connection: string;
  name: string;
  title: string;
  description: string;
  primary_key: string;
  order_by: string;
  order_direction: string;
}

export class EntityEntityFoundation extends EntityFoundation<EntityProperties> {

  get columns(): EntityColumnsInType<EntityProperties> {
    return {
      connection: {
        name : 'Connection',
        title : '',
        dataType : new DefaultIdDataType(),
        schema : {
          column_name : 'connection'
        }
        
      },
      name : {
        name : 'Name',
        title : '',
        dataType : new DefaultNameDataType(),
        schema : {
          column_name : 'name'
        }
      },
      title : {
        name : 'title',
        title : '',
        dataType : new DefaultTitleDataType(),
        schema : {
          column_name : 'title',
        }
      },
      description : {
        name : 'Description',
        title : '',
        dataType : new DefaultDescriptionDataType(),
        schema : {
          column_name : 'description'
        }
      },
      primary_key : {
        name : 'Primary Key',
        title : '',
        schema : {
          column_name : 'primary_key',
          sql_type : 'VARCHAR',
          isNullable : true,
          isIndex : true
        }
      },
      order_by : {
        name : 'Order By',
        title : '',
        schema : {
          column_name : 'order_by',
          sql_type : 'VARCHAR',
          isNullable : true
        }
      },
      order_direction : {
        name : 'Order Direction',
        title : '',
        schema : {
          column_name : 'order_direction',
          sql_type : 'VARCHAR',
          length : 10,
          defaultValue : 'ASC'
        }
      }
    }
  }

  get primaryKey(): "name" {
    return "name";
  }

  get information(): IEntityInformation {
    throw new Error('Method not implemented.');
  }
  get schema(): IEntitySchema<any> {
    throw new Error('Method not implemented.');
  }

}