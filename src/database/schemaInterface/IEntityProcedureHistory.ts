import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IEntityProcedureHistory extends DefaultSchemaData {
    entity_name: string;
    entity_row_id: string;
    user_id: string;
    user_authority: string;
    role_authority: string;
    data_procedure: string;
    extra_information: string;
}