import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IResourcePermission extends DefaultSchemaData {
    user_id: string;
    role_id: string;
    resource_id: string;
    data_procedure: string;
    data_access : string;
}