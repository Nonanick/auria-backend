import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IEntityReference extends DefaultSchemaData {
    name: string;
    column: string;
    referenced_column: string;
    referenced_entity?: string;
    referenced_table?: string;
    referenced_schema?: string;
}