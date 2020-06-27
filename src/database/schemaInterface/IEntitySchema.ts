import { ConnectionDefinition } from "../connection/ConnectionDefinition.js";

export interface IEntitySchema {
    table_name: string;
    connection?: number | ConnectionDefinition;
    is_system_entity? : boolean;
}