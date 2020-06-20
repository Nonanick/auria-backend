import { DefaultRowData } from "./default/DefaultRowData.js";
export interface IResource extends DefaultRowData {
    name: string;
    table_name: string;
    connection_id: number;
    title: string;
    description: string;
    is_system_resource: boolean;
}
