import { Row } from '../../Row.js';
import { nanoid } from 'nanoid';
export class DefaultRow extends Row {
    constructor(data) {
        super(data);
        // By default generate a new nanoid each time _id is queried and is not defined!
        this.defineGetter("_id", (value) => {
            if (value == null) {
                let nId = nanoid();
                this.set("_id", nId);
                return nId;
            }
            return value;
        });
        this.setRowPrimaryField("_id");
        this.defineGetter("status", (value) => {
            if (value == null) {
                return "active";
            }
            return value;
        });
    }
    destroy() {
        return super.destroy();
    }
}
//# sourceMappingURL=DefaultRow.js.map