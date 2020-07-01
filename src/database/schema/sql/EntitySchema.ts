import Knex, { CreateTableBuilder } from "knex";
import { ColumnSchema } from "./ColumnSchema.js";
import { ReferenceSchema } from './ReferenceSchema.js';
import { IEntity } from "../../schemaInterface/IEntity.js";
import { IEntitySchema } from "../../schemaInterface/IEntitySchema.js";
import { Row } from "../../Row.js";

export class EntitySchema extends Row<IEntity> {

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

    }

    public addColumns(...columns: ColumnSchema[]) {
        columns.forEach((column) => {
            const columnName = column.get("column_name");
            if (this.columns[columnName] != null)
                throw new Error(`[EntitySchema] Duplicate column on entity! Column with name ${columnName} already exists in ${this.get("name")}`);

            column.setEntity(this);
            column.setConnection(this.connection);

            // Auto update Primary field!
            if (column.get("column_keys").includes("PRI")) {
                this.setPrimaryFieldName(column.get("column_name"));
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

        if (allColumnNames.includes(name)) {
            return name;
        }

        return undefined;
    }

    public async install(connection: Knex) {

        if (this.connection == null)
            this.connection = connection;

        return this.tableExistsInDatabase(connection)
            .then((tableExists) => {

                if (tableExists) return this;

                return this.createTableInDatabase(connection);
            })
            //Table created for sure!
            .then(() => this.installColumns(connection));
    }

    public async tableExistsInDatabase(connection: Knex): Promise<boolean> {
        return connection.schema.hasTable(this.get("table_name"));
    }

    protected async createTableInDatabase(connection: Knex) {
        let tableCreation = connection.schema.createTable(
            this.get("table_name"),
            (builder) => {
                // Install columns!
                for (let colName in this.columns) {
                    const column = this.columns[colName];
                    this.createColumnInDatabase(column, builder);
                    // Prevent "ALTER TABLE"
                    column.markAsAlreadyInstalled();
                }
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

    protected createColumnInDatabase(column: ColumnSchema, builder: CreateTableBuilder) {
        let columnBuilder = column.buildColumnWithBuilder(builder);

        if (column.get('column_keys').length > 0) {
            let keys: string[] = column.get('column_keys');
            if (keys.indexOf("IND") >= 0) columnBuilder.index();
            if (keys.indexOf("UNI") >= 0) columnBuilder.unique();
            if (keys.indexOf("PRI") >= 0) columnBuilder.primary();
        }
    }

    protected async installColumns(connection: Knex) {
        let ans = [];
        for (let colName in this.columns) {
            if (this.columns.hasOwnProperty(colName)) {

                // Only install columns previously not marked as installed ones by CREATE TABLE
                if (!this.columns[colName].isMarkedAsInstalled())
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

