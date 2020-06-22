import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IUser extends DefaultSchemaData {
    username: string;
    password: string;
    user_privilege: number;
}