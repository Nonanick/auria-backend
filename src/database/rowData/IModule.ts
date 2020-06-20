import { DefaultRowData } from "./default/DefaultRowData.js";

export interface IModule extends DefaultRowData{
    name: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    behaviour: string;
}