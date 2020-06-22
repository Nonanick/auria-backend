import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IUserRole extends DefaultSchemaData {
    user_id: string;
    role_id: string;
    name: string;
    description: string;
}