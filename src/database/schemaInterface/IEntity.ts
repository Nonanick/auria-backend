import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IEntity extends DefaultSchemaData {
    name: string;
    table_name: string;
    connection_id: number;
    title: string;
    description: string;
    is_system_entity: boolean;
}