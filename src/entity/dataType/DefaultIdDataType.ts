import { ColumnDataType, SugestedSchema } from 'auria-entity/dist/column/ColumnDataType';
import { PropertyValidationFunction } from 'auria-data/dist/validation/IPropertyValidation';
import { PropertySanitizerFunction } from 'auria-data/dist/sanitizer/IPropertySanitizer';
import { PropertyProxyFunction } from 'auria-data/dist/proxy/IPropertyProxy';
import { PropertyHookFunction } from 'auria-data/dist/hook/IPropertyHook';

export class DefaultIdDataType extends ColumnDataType {

  constructor() {
    super('Primary Key');
  }
  
  get sugestedSchema(): SugestedSchema {
    return {
      sql_type : 'CHAR',
      length : 22,
      isPrimary : true,
    };
  }

  validationFunctions<T>(): PropertyValidationFunction<T>[] {
    return [
      async (value) => {
        if(String(value).length !== 22) {
          return 'Incorrectly formed ID value!';
        }
        return true;
      }
    ]
  }

  sanitizeFunctions<T>(): PropertySanitizerFunction<T>[] {
    return [];
  }

  getProxyFunctions<T>(): PropertyProxyFunction<T, keyof T>[] {
    return [];
  }

  setProxyFunctions<T>(): PropertyProxyFunction<T, keyof T>[] {
    return [];
  }

  setHooksFunctions<T>(): PropertyHookFunction<T>[] {
    return [];
  }

}