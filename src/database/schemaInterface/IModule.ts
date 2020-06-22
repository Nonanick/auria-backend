import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IModule extends DefaultSchemaData{
    name: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    behaviour: string;
}