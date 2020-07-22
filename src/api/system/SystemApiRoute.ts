import { ISystemRequest } from "../../http/ISystemRequest.js";
import { System } from "../../System.js";
import { ISystemResponse } from "auria-lib";

export type SystemApiRoute<T = any> = (request: ISystemRequest<T>, system: System) => any | Promise<any> | ISystemResponse | Promise<ISystemResponse>;