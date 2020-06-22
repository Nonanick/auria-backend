import { RowStatus } from "../RowStatus.js";
import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IModuleMenu extends DefaultSchemaData {
    _id: string;
    module_id: string;
    parent_menu_id: string;
    name: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    url: string;
    status: RowStatus;
}