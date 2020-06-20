import { ISystemRequest } from "../http/ISystemRequest.js";
import { ISystemResponse } from "auria-lib";
export declare type ApiRoute = (request: ISystemRequest) => any | Promise<any> | ISystemResponse | Promise<ISystemResponse>;
