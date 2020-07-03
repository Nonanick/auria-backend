export interface IAuriaColumn { 
    _id:  string;
    entity_name:  string;
    name:  string;
    column_name:  string;
    title:  string;
    description?:  string;
    sql_type:  string;
    length?:  number;
    data_type:  string;
    default_value?:  string;
    column_keys?:  string;
    status:  string;
}