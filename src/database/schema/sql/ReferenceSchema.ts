import Knex from "knex";
import { IEntityReference } from "../../schemaInterface/IEntityReference.js";
import { Row } from "../../Row.js";

export class ReferenceSchema extends Row<IEntityReference> {

    constructor(data?: Omit<IEntityReference, "_id" | "status">) {
        super(data);
        this.get("_id");
    }

    public install(connection: Knex) {

        if (this.connection == null)
            this.connection = connection;

        return this.keyExistsOnInformationSchema(connection)
            .then(async (exists) => {
                if (!exists) {
                    await this.createForeignKeyConstraint(connection);
                }
                return this;
            });

    }

    protected keyExistsOnInformationSchema(connection: Knex): Promise<boolean> {
        console.log("Reference Source:", this.get("table"), this.get("column"), connection.client.database(), this.get("referenced_table"), this.get('referenced_column'));

        return connection.withSchema("information_schema")
            // Check for key in Information  Schema
            .select('*')
            .from('key_column_usage')
            .where('table_name', this.get("table"))
            .where('column_name', this.get("column"))
            .where('referenced_table_schema', connection.client.database())
            .where('referenced_table_name', this.get("referenced_table"))
            .where('referenced_column_name', this.get('referenced_column'))
            .then(async (sqlReference) => {
                return sqlReference.length > 0;
            });
    }

    protected async createForeignKeyConstraint(connection: Knex): Promise<ReferenceSchema> {
        try {
            await connection.schema
                .raw(`ALTER TABLE \`${this.get("table")}\` 
                    ADD CONSTRAINT \`${this.get("name")}\`
                    FOREIGN KEY (\`${this.get("column")}\`)
                    REFERENCES \`${this.get('referenced_table')}\`(\`${this.get("referenced_column")}\`)`)
        } catch (err) {
            console.error("[ReferenceSchema] Failed to generate key constraint on database!", err);
        }

        return this;
    }
}