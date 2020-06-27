import { IReadRequest, IReadResponse } from "auria-lib";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema.js";
import { User } from "../../../user/User.js";

export interface IReadProcedure {

    processRequest(request: IReadRequest, entity: EntitySchema, user: User): Promise<IReadResponse>;
    
}