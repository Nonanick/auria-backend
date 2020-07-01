import { User } from "../User.js";
import { System } from "../../System.js";
import { DataRepository } from "../../data/repository/DataRepository.js";
import { IReadRequest, IReadResponse } from "auria-lib";

export class UserDataRepository {
    

    protected user : User;
    protected system : System;

    protected _data : DataRepository;

    constructor(user : User, system : System) {
        this.system = system;
        this.user = user;
        this._data = system.data();
    }

    public async read(request : IReadRequest)// : Promise<IReadResponse> 
    {
        return this._data.read(this.user, request);
    }
}