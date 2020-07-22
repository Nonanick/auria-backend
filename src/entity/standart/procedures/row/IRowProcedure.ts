import { User } from "../../../../user/User.js";
import { EntityClass } from "../../../EntityClass.js";
import { Transaction } from "knex";
import { Row } from "../../../../database/Row.js";
import { DefaultSchemaData } from "../../../../database/schemaInterface/default/DefaultSchemaData.js";
import { ProcedureAuthority } from "../ProcedureAuthority.js";

export interface IRowProcedureParams<T = any> {
    user: User;
    entity: EntityClass;
    row: Row<T>;
    authority?: ProcedureAuthority;
    useTransaction?: Transaction;
};

export interface IRowProcedure {
    name: string;
    run: <T extends DefaultSchemaData = any>(params: IRowProcedureParams<T>) => any | Promise<any>;
}