import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IUserInfo extends DefaultSchemaData {
    user_id: string;
    name: string;
    surname: string;
    email: string;
    photo: string;
}