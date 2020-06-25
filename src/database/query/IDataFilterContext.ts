import { User } from "../../user/User.js";
import { EntitySchema } from "../schema/sql/EntitySchema.js";

export interface IDataFilterContext {
    user : User;
    procedure : string;
    entity : EntitySchema;
    roles : string[];
    avaliableColumns : string[];
}