import { DefaultRow } from "../default/DefaultRow.js";
import Knex from "knex";
import { ResourceRow } from "./ResourceRow.js";
import { IResourceReference } from "../../rowData/IResourceReference.js";
export declare class ReferenceRow extends DefaultRow<IResourceReference> {
    protected resource: ResourceRow;
    constructor(resource: ResourceRow, data: Omit<Required<IResourceReference>, "_id" | "status">);
    install(connection: Knex): Promise<this>;
    protected keyExistsOnInformationSchema(connection: Knex): Promise<boolean>;
    protected keyExistsOnAuriaReference(connection: Knex): Promise<boolean>;
    protected createForeignKeyConstraint(connection: Knex): Promise<ReferenceRow>;
}
