import { System } from "../../System.js";
import Knex from "knex";
import { ConnectionDefinition } from "../../database/connection/ConnectionDefinition.js";

export class Architect extends System {

    protected connection!: Knex;

    protected systemBaseURL = "architect";

    public getConnectionDefinition(): ConnectionDefinition {
        return {
            client: 'mysql2',
            host: "localhost",
            port: 3306,
            database: "auria",
            user: "auria",
            password: "auria"
        };
    }

}