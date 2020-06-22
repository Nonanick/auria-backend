import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IApiAccess extends DefaultSchemaData {
    url : string;
    user_id : string;
    role_id : string;
    description : string;
}