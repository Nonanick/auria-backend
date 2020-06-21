import { DefaultRow } from "../default/DefaultRow.js";
import { ColumnRow } from "./ColumnRow.js";
import { ReferenceRow } from "./ReferenceRow.js";
import Knex, { Transaction } from "knex";
import { ResourceCatalog } from "../ResourceCatalog.js";
import { AuriaRow } from "../default/AuriaRow.js";
import { DefaultRowData } from "../../rowData/default/DefaultRowData.js";
import { IResource } from "../../rowData/IResource.js";
import { IDataFilterProvider } from "../../query/IDataFilterProvider.js";

export class ResourceRow extends DefaultRow<IResource> {

    protected _primaryField: string = "_id";

    protected columns: {
        [columnName: string]: ColumnRow
    } = {};

    protected references: {
        [referenceName: string]: ReferenceRow
    } = {};

    protected filterProviders: {
        [filterName: string]: IResourceFilterProviderConfiguration;
    } = {};

    constructor(data: Partial<IResource> & Required<Pick<IResource, "name" | "table_name">>) {
        super({
            ... {
                _id: undefined,
                connection_id: undefined,
                status: 'active',
                is_system_resource: false,
            },
            ...data
        });

        const idColumn = new ColumnRow({
            name: "Id",
            column_name: "_id",
            column_keys: ["PRI"],
            sql_type: "CHAR",
            length: 22,
            data_type: "nanoid",
            nullable: false,
        });

        const statusColumn = new ColumnRow({
            name: "Status",
            column_name: "status",
            sql_type: "VARCHAR",
            length: 20,
            nullable: false,
            default_value: "active",
            title: "Entry Status",
            description: "Row current state"
        });

        const createdAtColumn = new ColumnRow({
            name: "Created At",
            column_name: "created_at",
            sql_type: "TIMESTAMP",
            default_value: "CURRENT_TIMESTAMP",
            title: "Row Creation data",
            description: "Row creation data"
        });

        this.addColumns(idColumn, statusColumn, createdAtColumn);

    }

    public async createRow<T extends DefaultRowData>(id?: string, col?: keyof T): Promise<AuriaRow<T>> {

        let nRow = new AuriaRow<T>(this);
        nRow.setConnection(this.connection);

        if (id != null) {
            await nRow.byId(id, col);
        }

        return nRow;

    }

    public async getRow<T extends DefaultRowData>(id: string, column?: keyof T): Promise<AuriaRow<T>> {
        return this.createRow<T>(id, column);
    }

    public async save(transaction?: Transaction<any, unknown[]>): Promise<boolean> {

        return (transaction || this.connection)
            .table(ResourceCatalog.Resource.table_name)
            .where("name", this.get("name"))
            .where("table_name", this.get("table_name"))
            .select('*')
            .then(async (res) => {
                let data = await this.asJSON();
                if (res.length == 0) {
                    return (transaction || this.connection)
                        .insert(data)
                        .into(ResourceCatalog.Resource.table_name)
                        .then((insertRes) => {
                            this.setRowState("SYNCED");
                            return true;
                        })
                } else {
                    this.set("_id", res[0]._id);
                    // Data ID not necessary on Update!
                    delete data._id;

                    return (transaction || this.connection)
                        .table(ResourceCatalog.Resource.table_name)
                        .update(data)
                        .where("name", this.get("name"))
                        .where("table_name", this.get("table_name"))
                        .then((updateRes) => {
                            if (updateRes == 1) {
                                this.setRowState("SYNCED");
                            } else if (updateRes > 1) {
                                console.error("Multiple rows updated when tehre was supposed to be only one!");
                            } else {
                                console.error("Failed to find row?????? Select was fine tou");
                            }
                            return true;
                        })
                }
            });
    }

    public addColumns(...columns: ColumnRow[]) {
        columns.forEach((column) => {
            const columnName = column.get("name");
            if (this.columns[columnName] != null)
                throw new Error(`[ResourceRow] Duplicate column on resource! Column with name ${columnName} already exists in ${this.get("name")}`);

            column.setResource(this);
            column.setConnection(this.connection);

            // Auto update Primary field!
            if (column.get("column_keys").includes("PRI")) {
                this.setRowPrimaryField(column.get("column_name"));
            }

            this.columns[columnName] = column;
        });
    }

    public addReferences(...references: ReferenceRow[]) {
        references.forEach((reference) => {
            const referenceName = reference.get('name');
            if (this.references[referenceName] != null)
                throw new Error(`[ResourceRow] Duplicate reference on resource! Reference with name ${referenceName} already exists in ${this.get("name")}`);

            reference.setConnection(this.connection);
            this.references[referenceName] = reference;
        });
    }

    public getColumns(): ColumnRow[] {
        const allColumns: ColumnRow[] = [];

        for (let columnName in this.columns) {
            if (this.columns.hasOwnProperty(columnName)) {
                allColumns.push(this.columns[columnName]);
            }
        }

        return allColumns;
    }

    public hasColumn(name: string): boolean {
        return this.getColumnName(name) != null;
    }

    public getColumnName(name: string): string | undefined {
        const allColumnNames = this.getColumns().map(c => c.get("column_name"));
        const allNames = this.getColumns().map(c => c.get("name"));

        if (allColumnNames.includes(name)) {
            return name;
        }

        const ioName = allNames.indexOf(name);
        if (ioName >= 0) {
            return this.getColumns()[ioName].get("column_name");
        }

        return undefined;
    }

    public async install(connection: Knex) {
        if (this.connection == null)
            this.connection = connection;

        return connection.schema
            .hasTable(this.get("table_name"))
            .then((tableExists) => {
                if (tableExists) {
                    return this;
                } else {
                    let tableCreation = connection.schema
                        .createTable(this.get("table_name"), (builder) => {
                            builder.specificType("_id", 'CHAR(21)').notNullable().primary();
                        })
                        .then((created) => {
                            console.log("[ResourceRow] Table creation > ", created);
                            return this;
                        });

                    tableCreation.catch((err) => {
                        console.error("[ResourceRow] SQL Error!", err);
                        throw new Error("[ResourceRow] Failed to create table! SQL Error");
                    });

                    return tableCreation.then(_ => this);
                }
            })
            //Table created
            .then(() => this.installColumns(connection));
    }

    protected async installColumns(connection: Knex) {
        let ans = [];
        for (let colName in this.columns) {
            if (this.columns.hasOwnProperty(colName)) {
                ans.push(await this.columns[colName].install(connection));
            }
        }
        return ans;
    }

    public async installReferences(connection: Knex) {
        let ans = [];
        for (let refName in this.references) {
            if (this.references.hasOwnProperty(refName)) {
                ans.push(await this.references[refName].install(connection));
            }
        }
        return ans;
    }

    public addFilter(name: string, filter: IDataFilterProvider, options?: {
        allowOverride: boolean;
    }) {

        if (this.filterProviders[name] != null) {

            if (this.filterProviders[name].allowOverride === false) {
                throw new Error("ERROR! Filter proviter with name" + name + " DOES NOT ALLOW oveeride!");
            }

            console.warn("WARN! Filter provider with name ", name, " already exists in recource ", this.get("name"), "! Overriding it!");
        }

        this.filterProviders[name] = {
            filterProvider: filter,
            name: name,
            ...{
                allowOverride: true
            },
            ...options || {}
        };
    }

    public removeFilter(name: string) {
        if (this.filterProviders[name] == null) {
            console.info("INFO! Filter with name ", name, " is not avaliable on resource ", this.get("name"), " and therefore cannot be disabled!");
            return true;
        }

        if (this.filterProviders[name].allowOverride === false) {
            console.warn("WARN! Filter with name ", name, " CANNOT be disabled in ", this.get("name"), " because it was set with 'allowOverride' as false!");
            return;
        }

        delete this.filterProviders[name];
    }

    public getFilters(): IDataFilterProvider[] {
        return Array.from(Object.values(this.filterProviders)).map(f => f.filterProvider);
    }
}

export interface IResourceFilterProviderConfiguration {
    filterProvider: IDataFilterProvider;
    name: string;
    allowOverride: boolean;

}