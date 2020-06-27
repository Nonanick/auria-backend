import Knex from "knex";
import { User } from "../../../user/User.js";
import { EntityClass } from "../../EntityClass.js";

export interface ProcedureHookContext {
    connection : Knex;
    entity : EntityClass;
    user : User;
    procedure : string;
    procedureData : any;
}