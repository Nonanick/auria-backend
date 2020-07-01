import { AuriaRow } from "../../../../database/schema/default/AuriaRow.js";
import { DefaultSchemaData } from "../../../../database/schemaInterface/default/DefaultSchemaData.js";

export interface CreateProcedureParams<T extends DefaultSchemaData> {
    row: AuriaRow<T>;
    authority?: {
        user?: string;
        role?: string | string[];
    };
}