export interface IAuriaEntityProcedurePermission { 
    _id:  string;
    entity_name:  string;
    user_id:  string;
    role_id?:  string;
    procedure:  string;
    status:  string;
}