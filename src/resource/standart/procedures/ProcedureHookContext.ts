import Knex from "knex";
import { User } from "../../../user/User.js";
import { Resource } from "../../Resource.js";

export interface ProcedureHookContext {
    connection : Knex;
    resource : Resource;
    user : User;
    procedure : string;
    procedureData : any;
}