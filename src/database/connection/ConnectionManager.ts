import { ConnectionDefinition } from "./ConnectionDefinition.js";
import Knex from "knex";

export class ConnectionManager {

    private static connections: Map<ConnectionDefinition, Knex> = new Map();

    public static fromDefinition(definition: ConnectionDefinition): Knex {
        if (ConnectionManager.connections.has(definition)) {
            return ConnectionManager.connections.get(definition)!;
        } else {
            const conn = Knex({
                client: definition.client,
                connection: {
                    host: definition.host,
                    port: definition.port,
                    user: definition.user,
                    password: definition.password,
                    database: definition.database
                }
            });

            ConnectionManager.connections.set(definition, conn);

            return conn;
        }

    }
}