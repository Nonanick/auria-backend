import { IReadRequest, IReadResponse } from "auria-lib";
import { ResourceSchema } from "../../../database/schema/sql/ResourceSchema.js";
import { User } from "../../../user/User.js";

export interface IReadProcedure {

    processRequest(request: IReadRequest, resource: ResourceSchema, user: User): Promise<IReadResponse>;
    
}