import { DefaultRowData } from '../../rowData/default/DefaultRowData.js';
import { Row } from '../../Row.js';
export declare class DefaultRow<T = any> extends Row<T & DefaultRowData> {
    constructor(data?: Partial<T & DefaultRowData>);
    destroy(): this;
}
