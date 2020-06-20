import { DefaultRowData } from "./default/DefaultRowData.js";
export interface IConnection extends DefaultRowData {
    name: string;
    title: string;
    host: string;
    driver: string;
    database: string;
    username: string;
    password: string;
}
