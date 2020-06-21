import { DefaultRow } from "../default/DefaultRow.js";
import { ColumnRow } from "./ColumnRow.js";
import { ReferenceRow } from "./ReferenceRow.js";
import Knex, { Transaction } from "knex";
import { AuriaRow } from "../default/AuriaRow.js";
import { DefaultRowData } from "../../rowData/default/DefaultRowData.js";
import { IResource } from "../../rowData/IResource.js";
import { IDataFilterProvider } from "../../query/IDataFilterProvider.js";
export declare class ResourceRow extends DefaultRow<IResource> {
    protected _primaryField: string;
    protected columns: {
        [columnName: string]: ColumnRow;
    };
    protected references: {
        [referenceName: string]: ReferenceRow;
    };
    protected filterProviders: {
        [filterName: string]: IResourceFilterProviderConfiguration;
    };
    constructor(data: Partial<IResource> & Required<Pick<IResource, "name" | "table_name">>);
    createRow<T extends DefaultRowData>(id?: string, col?: keyof T): Promise<AuriaRow<T>>;
    getRow<T extends DefaultRowData>(id: string, column?: keyof T): Promise<AuriaRow<T>>;
    save(transaction?: Transaction<any, unknown[]>): Promise<boolean>;
    addColumns(...columns: ColumnRow[]): void;
    addReferences(...references: ReferenceRow[]): void;
    getColumns(): ColumnRow[];
    install(connection: Knex): Promise<ColumnRow[]>;
    protected installColumns(connection: Knex): Promise<ColumnRow[]>;
    installReferences(connection: Knex): Promise<ReferenceRow[]>;
    addFilter(name: string, filter: IDataFilterProvider, options?: {
        allowOverride: boolean;
    }): void;
    removeFilter(name: string): true | undefined;
    getFilters(): IDataFilterProvider[];
}
export interface IResourceFilterProviderConfiguration {
    filterProvider: IDataFilterProvider;
    name: string;
    allowOverride: boolean;
}
