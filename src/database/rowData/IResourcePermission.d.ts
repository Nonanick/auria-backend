import { DefaultRowData } from "./default/DefaultRowData.js";
export interface IResourcePermission extends DefaultRowData {
    user_id: string;
    role_id: string;
    resource_id: string;
    data_procedure: string;
    data_access: string;
}
