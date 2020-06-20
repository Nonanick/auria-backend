import { RowStatus } from "../RowStatus.js";
import { DefaultRowData } from "./default/DefaultRowData.js";

export interface IModuleMenu extends DefaultRowData {
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