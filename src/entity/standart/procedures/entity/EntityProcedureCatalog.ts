import { ReadFetchProcedure } from "../read/ReadFetchProcedure.js";
import { IEntityProcedure } from './IEntityProcedure.js';

export const EntityProcedureCatalog = asEntityProcedure({
    "READ_FETCH": ReadFetchProcedure,
    // "READ_COUNT": "READ-COUNT",
    // "BATCH_UPDATE" ?,
    // "BATCH_DELETE" ?,
    // "BATCH_RESTORE" ?,
});

function asEntityProcedure<T extends { [name: string]: IEntityProcedure }>(arg: T): T {
    return arg;
};
