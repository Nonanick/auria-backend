import { User } from "../../user/User.js";
import { ResourceRow } from "../resources/sql/ResourceRow.js";
export interface IDataFilterContext {
    user: User;
    procedure: string;
    resource: ResourceRow;
    roles: string[];
    avaliableColumns: string[];
}
