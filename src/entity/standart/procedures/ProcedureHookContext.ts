import Knex from "knex";
import { User } from "../../../user/User.js";

export interface ProcedureHookContext {
    connection : Knex;
    entity : EntityInstance;
    user : User;
    procedure : string;
    procedureData : any;
}