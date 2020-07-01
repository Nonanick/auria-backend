import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IEntityProcedurePermission extends DefaultSchemaData {
    entity_name: string;
    user_id: string;
    role_id: string;
    procedure: string;
}