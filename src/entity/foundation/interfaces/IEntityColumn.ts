import { IColumnSchema, IColumSchemaWithDataType } from './IColumnSchema.js';

export interface IEntityColumn<K> {
  schema :  IColumnSchema | IColumSchemaWithDataType;
}