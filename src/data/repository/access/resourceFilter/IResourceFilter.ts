import { DefaultSchemaData } from "../../../../database/schemaInterface/default/DefaultSchemaData.js";
import { User } from "../../../../user/User.js";

export interface IEntityFilter<T extends DefaultSchemaData> {
    getFilter(user : User) : string;
}