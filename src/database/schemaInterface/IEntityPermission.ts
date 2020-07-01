import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IEntityPermission extends DefaultSchemaData {
    user_id: string;
    role_id: string;
    entity_name: string;
    data_procedure: string;
    data_access : string;
}