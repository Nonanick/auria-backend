export interface IAuriaEntityRowAccessShare { 
    _id:  string;
    entity_name:  string;
    entity_row_id:  string;
    user_authority?:  string;
    role_authority?:  string;
    shared_with_user_id?:  string;
    shared_with_role_id?:  string;
    data_procedure:  string;
    status:  string;
}