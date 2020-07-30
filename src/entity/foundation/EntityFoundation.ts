import { IEntityInformation } from "./interfaces/IEntityInformation.js";
import { IEntitySchema } from "./interfaces/IEntitySchema.js";
import { IEntityFacade } from "./interfaces/IEntityFacade.js";
import { IEntityQueryProxy } from "./interfaces/IEntityQueryProxy.js";
import { ModelFactory } from "auria-data";
import { IEntityProcedure } from "./interfaces/IEntityProcedure.js";
import { IEntityProcedureProxy } from "./interfaces/IEntityProcedureProxy.js";
import { IEntityProcedureHook } from "./interfaces/IEntityProcedureHook.js";
import { IEntityReference } from "./interfaces/IEntityReference.js";
import { IEntitySQLCheck } from "./interfaces/IEntitySQLCheck.js";
import { IEntitySQLKeys } from "./interfaces/IEntitySQLKeys.js";
import { IEntityFoundation } from "./IEntityFoundation.js";
import { IEntityQuerySource } from "./interfaces/IEntityQuerySource.js";
import { IEntityColumn } from "./interfaces/IEntityColumn.js";

export abstract class EntityFoundation<T> implements IEntityFoundation<T> {
  get name(): string {
    return this.information().name;
  }

  get properties(): string[] {
    return Object.keys(this.columns());
  }

  get source(): string {
    if (typeof this.schema().source === "string")
      return this.schema().source as string;
    else return (this.schema().source as IEntityQuerySource).alias;
  }

  // Data definition
  abstract information(): IEntityInformation;

  abstract schema(): IEntitySchema<T>;

  abstract columns(): ColumnsOfEntity<T>;

  references(): IEntityReference[] {
    return [];
  }
  sqlChecks(): IEntitySQLCheck<T>[] {
    return [];
  }
  sqlKeys(): IEntitySQLKeys<T>[] {
    return [];
  }

  // Data Presentation
  facades(): IEntityFacade<T>[] {
    return [];
  }

  // Data Access
  queryProxies(): IEntityQueryProxy<T>[] {
    return [];
  }

  // Procedures
  procedures(): IEntityProcedure[] {
    return [];
  }

  // Procedures - Proxies
  procedureProxies(): IEntityProcedureProxy[] {
    return [];
  }

  // Procedures - Hooks
  procedureHooks(): IEntityProcedureHook[] {
    return [];
  }

  abstract modelFactory(): ModelFactory<T>;
}

export type ColumnsOfEntity<T> = {
  [columnName in keyof T]: IEntityColumn<columnName>;
};
