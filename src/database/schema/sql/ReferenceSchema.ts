import { DefaultSchema } from "../default/DefaultRow.js";
import Knex from "knex";
import { EntityCatalog } from "../EntityCatalog.js";
import { IEntityReference } from "../../schemaInterface/IEntityReference.js";

export class ReferenceSchema extends DefaultSchema<IEntityReference> {


    constructor(data?: Omit<Required<IEntityReference>, "_id" | "status">) {
        super(data);
        this.get("_id");
    }


    public install(connection: Knex) {

        if (this.connection == null)
            this.connection = connection;
            
        // Update Entity ID (Might have changed if entity was synced with DB definition!)
        //this.set("entity_id", this.entity.get("_id"));

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
                        .into(EntityCatalog.Reference.table_name)
                        .then((inserted) => {
                            console.log("[ReferenceSchema] Key inserted into Auria Reference!", inserted);
                        });
                } else {
                    delete data._id;
                    await connection.table(EntityCatalog.Reference.table_name)
                        .update(data)
                        .where("_id", this.get("_id"))
                        .then((updated) => {
                            console.log("[ReferenceSchema] Key updated into Auria Reference!", updated);
                        });
                }
                await connection.table(EntityCatalog.Column.table_name)
                    .update({
                        reference_id: this.get("_id")
                    })
                    //.where("entity_id", this.entity.get("_id"))
                    .where("column_name", this.get("entity_column_name"))
                    .then((updated) => {
                        console.log("[ReferenceSchema] Reference ID updated into Auria Column!", updated);
                    });
                return this;
            });
    }

    protected keyExistsOnInformationSchema(connection: Knex): Promise<boolean> {

        return this.connection.withSchema("information_schema")
            // Check for key in Information  Schema
            .select('*')
            .from('key_column_usage')
            .where('table_name', this.get("entity_table_name"))
            .where('column_name', this.get("entity_column_name"))
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
            .from(EntityCatalog.Reference.table_name)
            //.where('entity_id', this.entity.get("_id"))
            .where('entity_table_name', this.get("entity_table_name"))
            .where('entity_column_name', this.get("entity_column_name"))
            .where('reference_table_name', this.get("reference_table_name"))
            .where('reference_column_name', this.get('reference_column_name'))
            .then(async (auriaReferences) => {
                if (auriaReferences.length == 1)
                    this.set("_id", auriaReferences[0]._id);
                else
                    console.error("[ReferenceSchema] Failed to find reference on Auria Table!");

                return auriaReferences.length > 0;
            });
    }

    protected async createForeignKeyConstraint(connection: Knex): Promise<ReferenceSchema> {
        try {
            await connection.schema
                .raw(`
                    ALTER TABLE ${this.get("entity_table_name")} 
                    ADD CONSTRAINT ${this.get("name")}
                    FOREIGN KEY (${this.get("entity_column_name")})
                    REFERENCES ${this.get('reference_table_name')}(${this.get("reference_column_name")})
                    `)
        } catch (err) {
            console.error("[ReferenceSchema] Failed to generate key constraint on database!", err);
        }

        return this;
    }
}