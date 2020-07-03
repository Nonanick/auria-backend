export interface IAuriaEntityReference { 
    _id:  string;
    entity:  string;
    column:  string;
    referenced_entity?:  string;
    referenced_table:  string;
    referenced_Column:  string;
    status:  string;
}