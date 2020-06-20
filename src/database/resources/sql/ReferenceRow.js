var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DefaultRow } from "../default/DefaultRow.js";
import { ResourceCatalog } from "../ResourceCatalog.js";
export class ReferenceRow extends DefaultRow {
    constructor(resource, data) {
        super(data);
        this.get("_id");
        this.resource = resource;
    }
    install(connection) {
        if (this.connection == null)
            this.connection = connection;
        // Update Resource ID (Might have changed if resource was synced with DB definition!)
        this.set("resource_id", this.resource.get("_id"));
        return this.keyExistsOnInformationSchema(connection)
            .then((exists) => __awaiter(this, void 0, void 0, function* () {
            if (!exists) {
                yield this.createForeignKeyConstraint(connection);
            }
            return this;
        }))
            .then(() => this.keyExistsOnAuriaReference(connection))
            .then((exists) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.asJSON();
            if (!exists) {
                yield connection
                    .insert(data)
                    .into(ResourceCatalog.Reference.table_name)
                    .then((inserted) => {
                    console.log("[ReferenceRow] Key inserted into Auria Reference!", inserted);
                });
            }
            else {
                delete data._id;
                yield connection.table(ResourceCatalog.Reference.table_name)
                    .update(data)
                    .where("_id", this.get("_id"))
                    .then((updated) => {
                    console.log("[ReferenceRow] Key updated into Auria Reference!", updated);
                });
            }
            yield connection.table(ResourceCatalog.Column.table_name)
                .update({
                reference_id: this.get("_id")
            })
                .where("resource_id", this.resource.get("_id"))
                .where("column_name", this.get("resource_column_name"))
                .then((updated) => {
                console.log("[ReferenceRow] Reference ID updated into Auria Column!", updated);
            });
            return this;
        }));
    }
    keyExistsOnInformationSchema(connection) {
        return this.connection.withSchema("information_schema")
            // Check for key in Information  Schema
            .select('*')
            .from('key_column_usage')
            .where('table_name', this.get("resource_table_name"))
            .where('column_name', this.get("resource_column_name"))
            .where('referenced_table_schema', this.connection.client.database())
            .where('referenced_table_name', this.get("reference_table_name"))
            .where('referenced_column_name', this.get('reference_column_name'))
            .then((sqlReference) => __awaiter(this, void 0, void 0, function* () {
            return sqlReference.length > 0;
        }));
    }
    keyExistsOnAuriaReference(connection) {
        return this.connection.withSchema(connection.client.database())
            // Check for key in Information  Schema
            .select('*')
            .from(ResourceCatalog.Reference.table_name)
            .where('resource_id', this.resource.get("_id"))
            .where('resource_table_name', this.get("resource_table_name"))
            .where('resource_column_name', this.get("resource_column_name"))
            .where('reference_table_name', this.get("reference_table_name"))
            .where('reference_column_name', this.get('reference_column_name'))
            .then((auriaReferences) => __awaiter(this, void 0, void 0, function* () {
            if (auriaReferences.length == 1)
                this.set("_id", auriaReferences[0]._id);
            else
                console.error("[ReferenceRow] Failed to find reference on Auria Table!");
            return auriaReferences.length > 0;
        }));
    }
    createForeignKeyConstraint(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection.schema
                    .raw(`
                    ALTER TABLE ${this.resource.get("table_name")} 
                    ADD CONSTRAINT ${this.get("name")}
                    FOREIGN KEY (${this.get("resource_column_name")})
                    REFERENCES ${this.get('reference_table_name')}(${this.get("reference_column_name")})
                    `);
            }
            catch (err) {
                console.error("[ReferenceRow] Failed to generate key constraint on database!", err);
            }
            return this;
        });
    }
}
//# sourceMappingURL=ReferenceRow.js.map