import { DefaultRowData } from "./default/DefaultRowData.js";
export interface IApiAccess extends DefaultRowData {
    url: string;
    user_id: string;
    role_id: string;
    description: string;
}
