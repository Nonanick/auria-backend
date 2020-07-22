import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IConnection extends DefaultSchemaData {
    name: string;
    title: string;
    host: string;
    driver: string;
    database: string;
    username: string;
    password: string;
    port : number;
}