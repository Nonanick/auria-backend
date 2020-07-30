import { IEntityDataType } from './IEntityDataType.js';
import { IColumnCheckConstraint } from './IColumnCheckConstraint.js';
import { AcceptedDefaultValueTypes } from './AcceptedDefaultValueTypes.js';

export interface IColumnSchema {
  column_name : string;
  sql_type : string;
  length?: number;
  
  isPrimary?: boolean;
  isIndex? : boolean;
  isUnique? : boolean;

  isNullable? : boolean;

  defaultValue? : AcceptedDefaultValueTypes;

  comment? : string;

  checkConstraints?: IColumnCheckConstraint[];
}

export interface IColumSchemaWithDataType extends Partial<IColumnSchema> {
  data_type : IEntityDataType;
}