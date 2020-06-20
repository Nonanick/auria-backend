import { DefaultRowData } from "./default/DefaultRowData.js";

export interface IResourceActivity extends DefaultRowData {
    resource_id: string;
    resource_row_id: string;
    user_id: string;
    user_authority: string;
    role_authority: string;
    data_procedure: string;
    extra_information: string;
}