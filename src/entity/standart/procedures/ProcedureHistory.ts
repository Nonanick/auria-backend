import { EntityProcedureHistory } from "../../system/index.js";
import { User } from "../../../user/User.js";
import { ProcedureAuthority } from "./ProcedureAuthority.js";
import { Transaction } from "knex";

export interface SaveProcedureHistoryParams {
    historyEntity: EntityProcedureHistory;
    procedure: string;
    user: User;
    authority: ProcedureAuthority;
    useTransaction?: Transaction;
}

export class ProcedureHistoryClass {

    public saveProcedureHistory(
        {
            historyEntity,
            procedure,
            user,
            authority,
            useTransaction
        }: SaveProcedureHistoryParams
    ) {

    }
}

export const ProcedureHistory = new ProcedureHistoryClass();