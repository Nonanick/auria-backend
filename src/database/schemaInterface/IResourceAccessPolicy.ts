import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IResourceAccessPolicy extends DefaultSchemaData {
    resource_id: string;
    user_id: string;
    role_id: string;
    resource_row_id: string;
    data_procedure: string;
}