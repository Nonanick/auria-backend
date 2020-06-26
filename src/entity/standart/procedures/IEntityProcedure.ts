import { EntityInstance } from "../../system/index.js";
import { User } from "../../../user/User.js";

export interface IEntityProcedure {
    name : string;
    run: (who : User, entity : EntityInstance, using : any) => any | Promise<any>;
}