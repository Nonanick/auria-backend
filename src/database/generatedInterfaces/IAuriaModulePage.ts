export interface IAuriaModulePage { 
    _id:  string;
    module_id:  string;
    parent_menu_id?:  string;
    name:  string;
    title:  string;
    description?:  string;
    engine:  string;
    icon?:  string;
    url:  string;
    bind_entity?:  string;
    bind_model:  string;
    status:  string;
}