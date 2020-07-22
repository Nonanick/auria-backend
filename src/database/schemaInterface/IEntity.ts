import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IEntity  {
    name: string;
    table_name: string;
    connection_id: string;
    title: string;
    description: string;
    is_system_entity: boolean;
    status : 'active' | 'inactive';
}