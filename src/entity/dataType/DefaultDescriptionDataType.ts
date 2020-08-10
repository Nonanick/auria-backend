import { ColumnDataType } from 'auria-entity/dist/column/ColumnDataType';
import { SugestedSchema } from 'auria-entity';
import { PropertyProxyFunction } from 'auria-data/dist/proxy/IPropertyProxy';
import { PropertyHookFunction } from 'auria-data/dist/hook/IPropertyHook';
import { PropertyValidationFunction } from 'auria-data/dist/validation/IPropertyValidation';
import { PropertySanitizerFunction } from 'auria-data/dist/sanitizer/IPropertySanitizer';

export class DefaultDescriptionDataType extends ColumnDataType {

  constructor() {
    super('Description');
  }

  get sugestedSchema(): SugestedSchema {
    return {
      sql_type: 'TEXT',
      isNullable: true
    };
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

  validationFunctions<T>(): PropertyValidationFunction<T>[] {
    return [];
  }

  sanitizeFunctions<T>(): PropertySanitizerFunction<T>[] {
    return [];
  }

}