import { DefaultSchema } from "./DefaultRow.js";
import { ResourceSchema } from "../sql/ResourceSchema.js";
import { DefaultSchemaData } from "../../schemaInterface/default/DefaultSchemaData.js";

export class AuriaRow<T extends DefaultSchemaData> extends DefaultSchema<T> {

    private resource: ResourceSchema;

    constructor(resource: ResourceSchema, data?: Partial<T>) {
        super(data);
        this.resource = resource;
        this.setTableName(resource.get("table_name"));
        this.setRowState("NOT_ON_DATABASE");
    }

    public async byId(id: string, column?: keyof T): Promise<AuriaRow<T>> {
        const searchColumn = column ?? this.getRowPrimaryField();

        return this.connection
            .select<T[]>('*')
            .from(this.resource.get("table_name"))
            .where(searchColumn as string, id)
            .then((res) => {
                if (res.length === 1) {
                    this.set(res[0]);
                    this.setRowState("SYNCED");
                }
                else {
                    console.error("[AuriaRow] Failed to pinpoint row with id ", id, ' in Table ', this.resource.get("table_name"), ' searched in column', column);
                }

                return this;
            });
    }
}