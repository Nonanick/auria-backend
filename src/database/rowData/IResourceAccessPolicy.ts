import { DefaultRowData } from "./default/DefaultRowData.js";

export interface IResourceAccessPolicy extends DefaultRowData {
    resource_id: string;
    user_id: string;
    role_id: string;
    resource_row_id: string;
    data_procedure: string;
}