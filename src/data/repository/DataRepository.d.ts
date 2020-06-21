import { System } from "../../System.js";
import { User } from "../../user/User.js";
import { IReadRequest, IReadResponse } from "auria-lib";
import { ResourceRow } from "../../database/resources/sql/ResourceRow.js";
export declare class DataRepository {
    private system;
    constructor(system: System);
    read(user: User, request: IReadRequest): Promise<IReadResponse>;
    protected getValidColumns(resource: ResourceRow, columns: string[] | "*"): string[];
}
