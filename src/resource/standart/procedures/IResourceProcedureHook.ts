import { ProcedureHookContext } from "./ProcedureHookContext.js";

export type IResourceProcedureHook = (context : ProcedureHookContext) => Promise<void> | void;