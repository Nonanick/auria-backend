import { DataType } from 'auria-data';
import { IEntityDataType } from '../../entity/foundation/interfaces/IEntityDataType.js';
import { IColumnSchema } from '../../entity/foundation/interfaces/IColumnSchema.js';
import { PropertyProxyFunction } from 'auria-data/dist/proxy/IPropertyProxy.js';
import { PropertyHookFunction } from 'auria-data/dist/hook/IPropertyHook';
import { PropertyValidationFunction } from 'auria-data/dist/validation/IPropertyValidation';
import { PropertySanitizerFunction } from 'auria-data/dist/sanitizer/IPropertySanitizer';

class DefaultIdClass extends DataType implements IEntityDataType {

  sugestedSchema: IColumnSchema = {
    column_name : '_id',
    sql_type : 'CHAR',
    length : 22,
    isPrimary : true,
    isNullable : false,
  };

  getProxyFunctions<T>(): PropertyProxyFunction<T, keyof T>[] {
   return [];
  }

  setProxyFunctions<T>(): PropertyProxyFunction<T, keyof T>[] {
   return [];
  }

  setHooksFunctions<T>(): PropertyHookFunction<T>[] {
    return [];
  }

  validationFunctions<T>(): PropertyValidationFunction<T>[] {
    return [];
  }

  sanitizeFunctions<T>():PropertySanitizerFunction<T>[] {
    return [];
  }

}

export const DefaultId = new DefaultIdClass('IdType');