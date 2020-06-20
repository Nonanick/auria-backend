import { DefaultRowData } from "../../rowData/default/DefaultRowData.js";
import { ResourceRow } from "../sql/ResourceRow.js";
import { DefaultRow } from "./DefaultRow.js";

export class AuriaRow<T extends DefaultRowData> extends DefaultRow<T> {

    private resource: ResourceRow;

    constructor(resource: ResourceRow, data?: Partial<T>) {
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