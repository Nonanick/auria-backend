import { System } from "../../System.js";
import Knex from "knex";

export class Architect extends System {

    protected connection! : Knex;

    protected systemBaseURL = "architect";
    
    public getConnection(): Knex {
        if(this.connection == null) {
            this.connection = Knex({
                client : 'mysql',
                connection : {
                    host : "localhost",
                    port : 3306,
                    database : "auria",
                    user : "auria",
                    password : "auria"
                }
            })
        }

        return this.connection;
    }

}