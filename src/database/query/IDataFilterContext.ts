import { User } from "../../user/User.js";
import { ResourceSchema } from "../schema/sql/ResourceSchema.js";

export interface IDataFilterContext {
    user : User;
    procedure : string;
    resource : ResourceSchema;
    roles : string[];
    avaliableColumns : string[];
}