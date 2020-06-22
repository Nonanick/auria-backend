import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IModulePagePermission extends DefaultSchemaData {
    page_id: string;
    user_id: string;
    role_id: string;
}