import { ResourcePolicy } from "../ResourcePolicy.js";
import { ReadProcedureCode } from "../../procedures/ReadProcedure.js";
export class LimitMaxAmountOfRows extends ResourcePolicy {
    constructor() {
        super({
            name: "LimitMaxAmountOfRows",
            title: "@{Auria.ResourcePolicy.LimitMaxAmountOfRows.Title}",
            description: "@{Auria.ResourcePolicy.LimitMaxAmountOfRows.Description}",
            procedure: ReadProcedureCode
        });
    }
    apply(query, value) {
        return query;
    }
}
//# sourceMappingURL=LimitMaxAmountOfRows.js.map