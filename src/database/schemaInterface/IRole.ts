import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IRole extends DefaultSchemaData{
    name: string;
    title: string;
    icon: string;
    description: string;
}