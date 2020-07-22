import { IGetProxy } from "../getProxies/IGetProxy.js";
import { ISetProxy } from "../setProxies/ISetProxy.js";
import { IDataValidator } from "../validator/IDataValidator.js";
import { IEntityProcedureHook } from '../procedures/entity/IEntityProcedureHook.js';

export interface IDataType {

    name: string;

    procedureHooks?: {
        [procedure: string]: IEntityProcedureHook | IEntityProcedureHook[]
    };

    getProxies?: IGetProxy[];

    setProxies?: ISetProxy[];

    validators?: IDataValidator[];

}