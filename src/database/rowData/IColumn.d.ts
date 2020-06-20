import { SQLTypes } from "../resources/sql/SQLTypes.js";
import { DefaultRowData } from "./default/DefaultRowData.js";
export interface IColumn extends DefaultRowData {
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
    reference_id?: string;
}
