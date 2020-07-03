export interface IAuriaModuleMenu { 
    _id:  string;
    module_id:  string;
    parent_menu_id?:  string;
    name:  string;
    title:  string;
    description?:  string;
    icon?:  string;
    color?:  string;
    url?:  string;
    status:  string;
}