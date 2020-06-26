import { ReadFetchProcedure } from "./read/ReadFetchProcedure.js";

export const ProcedureCatalog = {
    "CREATE": "CREATE",
    "READ_FETCH": ReadFetchProcedure,
    "READ_COUNT": "READ-COUNT",
    "READ_PERMISSION": "READ-PERMISSION",
    "UPDATE": "UPDATE",
    "DELETE": "DELETE",
    "RESTORE": "RESTORE"
};
