import { DefaultRow } from "../default/DefaultRow.js";
import Knex, { AlterTableBuilder, ColumnBuilder, Transaction } from "knex";
import { ResourceRow } from "./ResourceRow.js";
import { IColumn } from "../../rowData/IColumn.js";
export declare class ColumnRow extends DefaultRow<IColumn> {
    protected resource: ResourceRow;
    constructor(data?: Partial<IColumn> & Required<Pick<IColumn, RequiredColumnParameters>>);
    setResource(resource: ResourceRow): void;
    install(connection?: Knex): Promise<this>;
    save(transaction?: Transaction): Promise<boolean>;
    protected installAlterInTable(): Promise<void>;
    protected installAddToTable(): Promise<void>;
    protected buildColumnWithBuilder(builder: AlterTableBuilder): ColumnBuilder;
}
declare type RequiredColumnParameters = "column_name" | "name" | "sql_type";
export {};
