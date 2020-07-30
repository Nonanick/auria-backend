import { DataType } from 'auria-data';
import { IEntityDataType } from '../../entity/foundation/interfaces/IEntityDataType.js';
import { IColumnSchema } from '../../entity/foundation/interfaces/IColumnSchema.js';

class DefaultNameClass<T> extends DataType implements IEntityDataType {

  sugestedSchema: IColumnSchema = {
    column_name : 'name',
    sql_type : 'varchar',
    length : 255,
    isIndex : true,
  };

  getProxyFunctions<T>(): import("auria-data/dist/proxy/IPropertyProxy").PropertyProxyFunction<T, keyof T>[] {
    throw new Error('Method not implemented.');
  }
  setProxyFunctions<T>(): import("auria-data/dist/proxy/IPropertyProxy").PropertyProxyFunction<T, keyof T>[] {
    throw new Error('Method not implemented.');
  }
  setHooksFunctions<T>(): import("auria-data/dist/hook/IPropertyHook").PropertyHookFunction<T>[] {
    throw new Error('Method not implemented.');
  }
  validationFunctions<T>(): import("auria-data/dist/validation/IPropertyValidation").PropertyValidationFunction<T>[] {
    throw new Error('Method not implemented.');
  }
  sanitizeFunctions<T>(): import("auria-data/dist/sanitizer/IPropertySanitizer").PropertySanitizerFunction<T>[] {
    throw new Error('Method not implemented.');
  }

}

export const DefaultName = new DefaultNameClass("NameType");