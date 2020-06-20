import { RowStatus } from "../RowStatus.js";
import { DefaultRowData } from "./default/DefaultRowData.js";
export interface IPersistentLogin extends DefaultRowData {
    _id: string;
    username: string;
    token: string;
    referer_identification: string;
    login_time: Date;
    status: RowStatus;
}
