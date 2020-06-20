import { DefaultRowData } from '../../rowData/default/DefaultRowData.js';
import { Row } from '../../Row.js';
import { nanoid } from 'nanoid';
import { RowStatus } from '../../RowStatus.js';

export class DefaultRow<T = any> extends Row<T & DefaultRowData> {

    constructor(data? : Partial<T&DefaultRowData>) {
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

        this.defineGetter("status", (value: RowStatus) => {
            if (value == null) {
                return "active";
            }
            return value;
        });
    }

    public destroy() {
        return super.destroy();
    }

    

}