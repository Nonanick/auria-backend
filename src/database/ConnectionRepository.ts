import { System } from "../System.js";
import Knex from "knex";
import { IConnection } from "./schemaInterface/IConnection.js";

export class ConnectionRepository {

    private systemConnection : Knex;

    protected system : System;

    protected connections : {
        [name : string ] : IConnection
    } = {};

    constructor(system : System) {
        
        this.system = system;   
        this.systemConnection = this.system.getConnection();

    }
}