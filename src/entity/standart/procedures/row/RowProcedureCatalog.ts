import { IRowProcedure } from "./IRowProcedure.js";
import { CreateProcedure } from "../write/CreateProcedure.js";

export const RowProcedureCatalog = asRowProcedure({
    "CREATE" : CreateProcedure
});

function asRowProcedure<T extends { [name: string]: IRowProcedure }>(arg: T): T {
    return arg;
};
