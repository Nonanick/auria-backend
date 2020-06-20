import { DefaultRowData } from "./default/DefaultRowData.js";
export interface IModulePagePermission extends DefaultRowData {
    page_id: string;
    user_id: string;
    role_id: string;
}
