import { DefaultSchemaData } from '../../schemaInterface/default/DefaultSchemaData.js';
import { Row } from '../../Row.js';
import { nanoid } from 'nanoid';
import { RowStatus } from '../../RowStatus.js';

export class DefaultSchema<T = any> extends Row<T & DefaultSchemaData> {

    constructor(data? : Partial<T&DefaultSchemaData>) {
        super(data);

        // By default generate a new nanoid each time _id is queried and is not defined!
        this.replaceGetterFunction("_id", (value) => {
            
            if (value == null) {
                let nId = nanoid();
                this.set("_id", nId);
                return nId;
            }
            return value;
        });

        this.setPrimaryFieldName("_id");

        this.replaceGetterFunction("status", (value: RowStatus) => {
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