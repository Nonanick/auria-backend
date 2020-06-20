import { System } from "../../System.js";
import Knex from "knex";
export declare class Architect extends System {
    protected connection: Knex;
    protected systemBaseURL: string;
    getConnection(): Knex;
}
