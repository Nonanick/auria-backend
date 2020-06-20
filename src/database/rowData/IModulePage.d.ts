import { DefaultRowData } from "./default/DefaultRowData.js";
export interface IModulePage extends DefaultRowData {
    module_id: string;
    parent_menu_id: string;
    name: string;
    title: string;
    description: string;
    engine: string;
    icon: string;
    url: string;
    data_requirements: string;
    api_requirements: string;
    bind_resource: string;
    bind_model: string;
}
