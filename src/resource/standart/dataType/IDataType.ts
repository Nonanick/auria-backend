import { IGetProxy } from "../getProxies/IGetProxy.js";
import { ISetProxy } from "../setProxies/ISetProxy.js";
import { IDataValidator } from "../validator/IDataValidator.js";
import { IResourceProcedureHook } from "../procedures/IResourceProcedureHook.js";

export interface IDataType {

    name: string;

    procedureHooks?: {
        [procedure: string]: IResourceProcedureHook | IResourceProcedureHook[]
    };

    getProxies?: IGetProxy[];

    setProxies?: ISetProxy[];

    validators?: IDataValidator[];

}