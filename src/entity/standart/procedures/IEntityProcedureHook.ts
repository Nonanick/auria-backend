import { ProcedureHookContext } from "./ProcedureHookContext.js";

export type IEntityProcedureHook = (context : ProcedureHookContext) => Promise<void> | void;