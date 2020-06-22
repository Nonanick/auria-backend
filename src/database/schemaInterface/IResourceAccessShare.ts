import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IResourceAccessShare extends DefaultSchemaData {
    resource_id: string;
    resource_row_id: string;
    user_authority: string;
    role_authority: string;
    shared_with_user_id: string;
    shared_with_role_id: string;
    data_procedure: string;
}