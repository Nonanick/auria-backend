import { IDataType } from 'auria-data';
import { IColumnSchema } from './IColumnSchema.js';

export interface IEntityDataType extends IDataType {
  sugestedSchema : IColumnSchema;
}