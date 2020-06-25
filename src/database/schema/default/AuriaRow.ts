import { DefaultSchema } from "./DefaultRow.js";
import { EntitySchema } from "../sql/EntitySchema.js";
import { DefaultSchemaData } from "../../schemaInterface/default/DefaultSchemaData.js";

export class AuriaRow<T extends DefaultSchemaData> extends DefaultSchema<T> {

    private entity: EntitySchema;

    constructor(entity: EntitySchema, data?: Partial<T>) {
        super(data);
        this.entity = entity;
        this.setTableName(entity.get("table_name"));
        this.setRowState("NOT_ON_DATABASE");
    }

    public async byId(id: string, column?: keyof T): Promise<AuriaRow<T>> {
        const searchColumn = column ?? this.getRowPrimaryField();

        return this.connection
            .select<T[]>('*')
            .from(this.entity.get("table_name"))
            .where(searchColumn as string, id)
            .then((res) => {
                if (res.length === 1) {
                    this.set(res[0]);
                    this.setRowState("SYNCED");
                }
                else {
                    console.error("[AuriaRow] Failed to pinpoint row with id ", id, ' in Table ', this.entity.get("table_name"), ' searched in column', column);
                }

                return this;
            });
    }
}