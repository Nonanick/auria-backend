import { User } from "../../../../user/User.js";
import { EntityClass } from "../../../EntityClass.js";
import { Transaction } from "knex";

export interface IEntityProcedureParams {
    user: User;
    entity: EntityClass;
    using: any;
    useTransaction?: Transaction;
};

export interface IEntityProcedure {
    name: string;
    run: (params: IEntityProcedureParams) => any | Promise<any>;
}