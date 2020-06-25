import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IEntityReference extends DefaultSchemaData {
    name: string;
    entity_id: string;
    entity_table_name: string;
    entity_column_name: string;
    reference_table_name: string;
    reference_column_name: string;
}