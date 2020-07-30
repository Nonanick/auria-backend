import { EntityFoundation, ColumnsOfEntity} from '../foundation/EntityFoundation.js';
import { IEntityInformation } from '../foundation/interfaces/IEntityInformation.js';
import { IEntitySchema } from '../foundation/interfaces/IEntitySchema.js';
import { ModelFactory } from 'auria-data';

type EntityType = {
  connection : string;
  name : string;
  source : string;
  is_system_entity : boolean;
}

export class Entity extends EntityFoundation<EntityType> {

  information(): IEntityInformation {
    return {
      name : 'Entity',
      title : '@{Auria.Entity.Entity.Title}',
      description : '@{Auria.Entity.Entity.Description}'
    };
  }

  schema(): IEntitySchema<EntityType> {
    return {
      source : 'entity',
      isSystemEntity : true,
    }
  }

  columns(): ColumnsOfEntity<EntityType> {
    throw new Error('Method not implemented.');
  }

  modelFactory(): ModelFactory<EntityType> {
    throw new Error('Method not implemented.');
  }

}