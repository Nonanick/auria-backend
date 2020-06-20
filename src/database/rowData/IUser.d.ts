import { DefaultRowData } from "./default/DefaultRowData.js";
export interface IUser extends DefaultRowData {
    username: string;
    password: string;
    user_privilege: number;
}
