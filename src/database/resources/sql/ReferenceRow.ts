import { DefaultRow } from "../default/DefaultRow.js";
import Knex from "knex";
import { ResourceRow } from "./ResourceRow.js";
import { ResourceCatalog } from "../ResourceCatalog.js";
import { IResourceReference } from "../../rowData/IResourceReference.js";

export class ReferenceRow extends DefaultRow<IResourceReference> {

    protected resource: ResourceRow;

    constructor(resource: ResourceRow, data: Omit<Required<IResourceReference>, "_id" | "status">) {
        super(data);
        this.get("_id");
        this.resource = resource;
    }


    public install(connection: Knex) {

        if (this.connection == null)
            this.connection = connection;
            
        // Update Resource ID (Might have changed if resource was synced with DB definition!)
        this.set("resource_id", this.resource.get("_id"));

        return this.keyExistsOnInformationSchema(connection)
            .then(async (exists) => {
                if (!exists) {
                    await this.createForeignKeyConstraint(connection);
                }
                return this;
            })
            .then(() => this.keyExistsOnAuriaReference(connection))
            .then(async (exists) => {
                const data = await this.asJSON();
                if (!exists) {
                    await connection
                        .insert(data)
                        .into(ResourceCatalog.Reference.table_name)
                        .then((inserted) => {
                            console.log("[ReferenceRow] Key inserted into Auria Reference!", inserted);
                        });
                } else {
                    delete data._id;
                    await connection.table(ResourceCatalog.Reference.table_name)
                        .update(data)
                        .where("_id", this.get("_id"))
                        .then((updated) => {
                            console.log("[ReferenceRow] Key updated into Auria Reference!", updated);
                        });
                }
                await connection.table(ResourceCatalog.Column.table_name)
                    .update({
                        reference_id: this.get("_id")
                    })
                    .where("resource_id", this.resource.get("_id"))
                    .where("column_name", this.get("resource_column_name"))
                    .then((updated) => {
                        console.log("[ReferenceRow] Reference ID updated into Auria Column!", updated);
                    });
                return this;
            });
    }

    protected keyExistsOnInformationSchema(connection: Knex): Promise<boolean> {

        return this.connection.withSchema("information_schema")
            // Check for key in Information  Schema
            .select('*')
            .from('key_column_usage')
            .where('table_name', this.get("resource_table_name"))
            .where('column_name', this.get("resource_column_name"))
            .where('referenced_table_schema', this.connection.client.database())
            .where('referenced_table_name', this.get("reference_table_name"))
            .where('referenced_column_name', this.get('reference_column_name'))
            .then(async (sqlReference) => {
                return sqlReference.length > 0;
            });
    }

    protected keyExistsOnAuriaReference(connection: Knex): Promise<boolean> {
        return this.connection.withSchema(connection.client.database())
            // Check for key in Information  Schema
            .select('*')
            .from(ResourceCatalog.Reference.table_name)
            .where('resource_id', this.resource.get("_id"))
            .where('resource_table_name', this.get("resource_table_name"))
            .where('resource_column_name', this.get("resource_column_name"))
            .where('reference_table_name', this.get("reference_table_name"))
            .where('reference_column_name', this.get('reference_column_name'))
            .then(async (auriaReferences) => {
                if (auriaReferences.length == 1)
                    this.set("_id", auriaReferences[0]._id);
                else
                    console.error("[ReferenceRow] Failed to find reference on Auria Table!");

                return auriaReferences.length > 0;
            });
    }

    protected async createForeignKeyConstraint(connection: Knex): Promise<ReferenceRow> {
        try {
            await connection.schema
                .raw(`
                    ALTER TABLE ${this.resource.get("table_name")} 
                    ADD CONSTRAINT ${this.get("name")}
                    FOREIGN KEY (${this.get("resource_column_name")})
                    REFERENCES ${this.get('reference_table_name')}(${this.get("reference_column_name")})
                    `)
        } catch (err) {
            console.error("[ReferenceRow] Failed to generate key constraint on database!", err);
        }

        return this;
    }
}