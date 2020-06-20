var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DefaultRow } from "./DefaultRow.js";
export class AuriaRow extends DefaultRow {
    constructor(resource, data) {
        super(data);
        this.resource = resource;
        this.setTableName(resource.get("table_name"));
        this.setRowState("NOT_ON_DATABASE");
    }
    byId(id, column) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchColumn = column !== null && column !== void 0 ? column : this.getRowPrimaryField();
            return this.connection
                .select('*')
                .from(this.resource.get("table_name"))
                .where(searchColumn, id)
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
        });
    }
}
//# sourceMappingURL=AuriaRow.js.map