import Knex from "knex";
import { User } from "../../../user/User.js";
import { ResourceInstance } from "../../system/resource/ResourceInstance.js";

export interface ProcedureHookContext {
    connection : Knex;
    resource : ResourceInstance;
    user : User;
    procedure : string;
    procedureData : any;
}