import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IEntityActivity extends DefaultSchemaData {
    entity_id: string;
    entity_row_id: string;
    user_id: string;
    user_authority: string;
    role_authority: string;
    data_procedure: string;
    extra_information: string;
}