export interface IEntitySchema {
    table_name: string;
    connection?: string;
    is_system_entity? : boolean;
}