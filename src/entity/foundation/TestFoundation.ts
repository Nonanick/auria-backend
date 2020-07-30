import { EntityFoundation, ColumnsOfEntity } from './EntityFoundation.js';
import { IEntityInformation } from './interfaces/IEntityInformation.js';
import { ModelFactory } from 'auria-data';
import { IEntitySchema } from './interfaces/IEntitySchema.js';

type TestProperties = {
  _id : number;
  name : string;
  created_at : Date;
};
export class TestFoundation extends EntityFoundation<TestProperties> {

  columns() : ColumnsOfEntity<TestProperties> {
    throw new Error('Method not implemented.');
  }

  modelFactory(): ModelFactory<TestProperties> {
    throw new Error('Method not implemented.');
  }

  information(): IEntityInformation {
    return {
      name : 'Test',
      title : '@{Test}'
    };
  }

  schema() : IEntitySchema<TestProperties> {
    return {
      source : {
        sqlQuery : 'SELECT * FROM auria_entity',
        alias : 'entity'
      },
    }
  }


}