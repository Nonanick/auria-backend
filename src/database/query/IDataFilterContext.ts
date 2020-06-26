import { User } from "../../user/User.js";
import { EntityClass } from "../../entity/EntityClass.js";

export interface IDataFilterContext {
    user : User;
    procedure : string;
    entity : EntityClass;
    roles : string[];
}