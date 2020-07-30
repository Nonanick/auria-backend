import { IColumnSchema, IColumSchemaWithDataType } from './IColumnSchema.js';
import { IEntityQuerySource } from './IEntityQuerySource.js';

export interface IEntitySchema<T> {
  
  source : IEntityQuerySource | string;

  isSystemEntity? : boolean;

}