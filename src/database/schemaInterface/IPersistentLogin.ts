import { RowStatus } from "../RowStatus.js";
import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IPersistentLogin extends DefaultSchemaData {
    _id: string;
    username: string;
    token: string;
    referer_identification: string;
    login_time: Date;
    status: RowStatus;
}