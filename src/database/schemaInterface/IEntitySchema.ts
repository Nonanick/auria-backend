export interface IEntitySchema<T = any> {
    table_name: string;
    connection?: string;
    is_system_entity? : boolean;
}