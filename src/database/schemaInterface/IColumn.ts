import { SQLTypes } from "../schema/sql/SQLTypes.js";
import { DefaultSchemaData } from "./default/DefaultSchemaData.js";

export interface IColumn extends DefaultSchemaData {
    _id: string;
    resource_id: string;
    name: string;
    column_name: string;
    title: string;
    description: string;
    sql_type: SQLTypes;
    length: number;
    data_type: string;
    default_value: any;
    nullable: boolean;
    column_keys: ("UNI" | "IND" | "PRI")[];
    readable? : boolean;
    required? : boolean;
    reference_id?: string;
}