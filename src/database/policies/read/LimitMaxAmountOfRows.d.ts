import { ResourcePolicy } from "../ResourcePolicy.js";
import { ReadQuery } from "../../query/ReadQuery.js";
export declare class LimitMaxAmountOfRows extends ResourcePolicy {
    constructor();
    apply(query: ReadQuery, value: any): ReadQuery;
}
