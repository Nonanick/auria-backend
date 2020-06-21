import { ISystemRequest } from "../../http/ISystemRequest.js";
import { System } from "../../System.js";
import { ISystemResponse } from "auria-lib";
export declare type SystemApiRoute = (request: ISystemRequest, system: System) => any | Promise<any> | ISystemResponse | Promise<ISystemResponse>;
