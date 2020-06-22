import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IResourceReference extends DefaultSchemaData {
    name: string;
    resource_id: string;
    resource_table_name: string;
    resource_column_name: string;
    reference_table_name: string;
    reference_column_name: string;
}