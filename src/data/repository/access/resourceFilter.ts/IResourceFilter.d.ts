import { DefaultRowData } from "../../../../database/rowData/default/DefaultRowData.js";
import { User } from "../../../../user/User.js";
export interface IResourceFilter<T extends DefaultRowData> {
    getFilter(user: User): any;
}
