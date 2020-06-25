import { DefaultSchema } from "../default/DefaultRow.js";
import Knex, { Transaction } from "knex";
import { EntityCatalog } from "../EntityCatalog.js";
import { AuriaRow } from "../default/AuriaRow.js";
import { IDataFilterProvider } from "../../query/IDataFilterProvider.js";
import { ColumnSchema } from "./ColumnSchema.js";
import { ReferenceSchema } from './ReferenceSchema.js';
import { DefaultSchemaData } from "../../schemaInterface/default/DefaultSchemaData.js";
import { IEntity } from "../../schemaInterface/IEntity.js";
import { IEntitySchema } from "../../schemaInterface/IEntitySchema.js";

export class EntitySchema extends DefaultSchema<IEntity> {

    protected _primaryField: string = "_id";

    protected _columnKeys: {
        "IND": ColumnSchema[],
        "PRI": ColumnSchema[],
        "UNI": ColumnSchema[]
    } = {
            "IND": [],
            "PRI": [],
            "UNI": []
        };

    protected columns: {
        [columnName: string]: ColumnSchema
    } = {};

    protected references: {
        [referenceName: string]: ReferenceSchema
    } = {};

    constructor(data: Partial<IEntitySchema>) {
        super({
            ... {
                _id: undefined,
                connection_id: undefined,
                status: 'active',
                is_system_entity: false,
            },
            ...data
        });

        const idColumn = new ColumnSchema({
            name: "Id",
            column_name: "_id",
            column_keys: ["PRI"],
            sql_type: "CHAR",
            length: 22,
            data_type: "nanoid",
            nullable: false,
        });

        const statusColumn = new ColumnSchema({
            name: "Status",
            column_name: "status",
            sql_type: "VARCHAR",
            length: 20,
            nullable: false,
            default_value: "active",
            title: "Entry Status",
            description: "Row current state"
        });

        const createdAtColumn = new ColumnSchema({
            name: "Created At",
            column_name: "created_at",
            sql_type: "TIMESTAMP",
            default_value: "CURRENT_TIMESTAMP",
            title: "Row Creation data",
            description: "Row creation data"
        });

        this.addColumns(idColumn, statusColumn, createdAtColumn);

    }

    public async createRow<T extends DefaultSchemaData>(id?: string, col?: keyof T): Promise<AuriaRow<T>> {

        let nRow = new AuriaRow<T>(this);
        nRow.setConnection(this.connection);

        if (id != null) {
            await nRow.byId(id, col);
        }

        return nRow;

    }

    public async getRow<T extends DefaultSchemaData>(id: string, column?: keyof T): Promise<AuriaRow<T>> {
        return this.createRow<T>(id, column);
    }

    public async save(transaction?: Transaction<any, unknown[]>): Promise<boolean> {

        return (transaction || this.connection)
            .table(EntityCatalog.Entity.table_name)
            .where("name", this.get("name"))
            .where("table_name", this.get("table_name"))
            .select('*')
            .then(async (res) => {
                let data = await this.asJSON();
                if (res.length == 0) {
                    return (transaction || this.connection)
                        .insert(data)
                        .into(EntityCatalog.Entity.table_name)
                        .then((insertRes) => {
                            this.setRowState("SYNCED");
                            return true;
                        })
                } else {
                    this.set("_id", res[0]._id);
                    // Data ID not necessary on Update!
                    delete data._id;

                    return (transaction || this.connection)
                        .table(EntityCatalog.Entity.table_name)
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

    public addColumns(...columns: ColumnSchema[]) {
        columns.forEach((column) => {
            const columnName = column.get("name");
            if (this.columns[columnName] != null)
                throw new Error(`[EntitySchema] Duplicate column on entity! Column with name ${columnName} already exists in ${this.get("name")}`);

            column.setEntity(this);
            column.setConnection(this.connection);

            // Auto update Primary field!
            if (column.get("column_keys").includes("PRI")) {
                this.setRowPrimaryField(column.get("column_name"));
            }

            this.columns[columnName] = column;
        });
    }

    public addReferences(...references: ReferenceSchema[]) {
        references.forEach((reference) => {
            const referenceName = reference.get('name');
            if (this.references[referenceName] != null)
                throw new Error(`[EntitySchema] Duplicate reference on entity! Reference with name ${referenceName} already exists in ${this.get("name")}`);

            reference.setConnection(this.connection);
            this.references[referenceName] = reference;
        });
    }

    public getColumns(): ColumnSchema[] {
        const allColumns: ColumnSchema[] = [];

        for (let columnName in this.columns) {
            if (this.columns.hasOwnProperty(columnName)) {
                allColumns.push(this.columns[columnName]);
            }
        }

        return allColumns;
    }

    public getConnection() {
        return this.connection;
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
                            console.log("[EntitySchema] Table creation > ", created);
                            return this;
                        });

                    tableCreation.catch((err) => {
                        console.error("[EntitySchema] SQL Error!", err);
                        throw new Error("[EntitySchema] Failed to create table! SQL Error");
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

}

