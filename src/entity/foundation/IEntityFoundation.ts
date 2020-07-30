import { IEntitySchema } from './interfaces/IEntitySchema.js';
import { IEntityReference } from './interfaces/IEntityReference.js';
import { IEntitySQLCheck } from './interfaces/IEntitySQLCheck.js';
import { IEntitySQLKeys } from './interfaces/IEntitySQLKeys.js';
import { IEntityFacade } from './interfaces/IEntityFacade.js';
import { IEntityQueryProxy } from './interfaces/IEntityQueryProxy.js';
import { IEntityProcedure } from './interfaces/IEntityProcedure.js';
import { IEntityProcedureProxy } from './interfaces/IEntityProcedureProxy.js';
import { IEntityProcedureHook } from './interfaces/IEntityProcedureHook.js';
import { ModelFactory } from 'auria-data';
import { IEntityInformation } from './interfaces/IEntityInformation.js';

export interface IEntityFoundation<T> {
  // Data definition
  information() : IEntityInformation;
  
  schema() : IEntitySchema<T>;
  references() : IEntityReference[];
  sqlChecks() : IEntitySQLCheck<T>[];
  sqlKeys() : IEntitySQLKeys<T>[];
  
  // Data Presentation
  facades() : IEntityFacade<T>[];

  // Data Access
  queryProxies() : IEntityQueryProxy<T>[];

  // Procedures
  procedures() : IEntityProcedure[];
  
  // Procedures - Proxies
  procedureProxies() : IEntityProcedureProxy[];
  
  // Procedures - Hooks
  procedureHooks() : IEntityProcedureHook[];


  modelFactory() : ModelFactory<T>;
}