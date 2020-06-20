import { DefaultRowData } from "./default/DefaultRowData.js";
export interface IRole extends DefaultRowData {
    name: string;
    title: string;
    icon: string;
    description: string;
}
