import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IEntityAccessPolicy extends DefaultSchemaData {
    entity_id: string;
    user_id: string;
    role_id: string;
    entity_row_id: string;
    data_procedure: string;
}