import { ResourcePolicy } from "../ResourcePolicy.js";
import { ReadProcedureCode } from "../../procedures/ReadProcedure.js";
import { ReadQuery } from "../../query/ReadQuery.js";

export class LimitMaxAmountOfRows extends ResourcePolicy {

    constructor() {
        super({
            name: "LimitMaxAmountOfRows",
            title: "@{Auria.ResourcePolicy.LimitMaxAmountOfRows.Title}",
            description: "@{Auria.ResourcePolicy.LimitMaxAmountOfRows.Description}",
            procedure: ReadProcedureCode
        });

    }

    public apply(query: ReadQuery, value: any): ReadQuery {

        return query;
    }
}