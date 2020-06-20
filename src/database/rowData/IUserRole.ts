import { DefaultRowData } from "./default/DefaultRowData.js";

export interface IUserRole extends DefaultRowData {
    user_id: string;
    role_id: string;
    name: string;
    description: string;
}