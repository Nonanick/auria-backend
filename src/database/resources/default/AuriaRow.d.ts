import { DefaultRowData } from "../../rowData/default/DefaultRowData.js";
import { ResourceRow } from "../sql/ResourceRow.js";
import { DefaultRow } from "./DefaultRow.js";
export declare class AuriaRow<T extends DefaultRowData> extends DefaultRow<T> {
    private resource;
    constructor(resource: ResourceRow, data?: Partial<T>);
    byId(id: string, column?: keyof T): Promise<AuriaRow<T>>;
}
