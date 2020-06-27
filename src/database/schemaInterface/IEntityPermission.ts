import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IEntityPermission extends DefaultSchemaData {
    user_id: string;
    role_id: string;
    entity_id: string;
    data_procedure: string;
    data_access : string;
}