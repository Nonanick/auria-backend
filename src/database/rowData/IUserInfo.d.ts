import { DefaultRowData } from "./default/DefaultRowData.js";
export interface IUserInfo extends DefaultRowData {
    user_id: string;
    name: string;
    surname: string;
    email: string;
    photo: string;
}
