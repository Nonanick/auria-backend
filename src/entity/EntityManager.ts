import { EventEmitter } from "events";
import { Bootable } from "../boot/Bootable.js";
import * as SystemEntities from "./system/index.js";
import { System } from "../System.js";
import { EntityClass } from "./EntityClass.js";
import { SystemEntityCatalog } from "../database/schema/SystemEntityCatalog.js";

export class EntityManager extends EventEmitter implements Bootable {

    private _systemEntities: {
        [entityName: string]: EntityClass
    } = {};

    private entities: { [entityName: string]: EntityClass } = {};

    private system: System;

    constructor(system: System) {
        super();
        this.system = system;

        this._systemEntities = {

            // SQL Structure, do NOT modify the order of this thing...
            [SystemEntityCatalog.Connection.name]: new SystemEntities.Connection(),
            [SystemEntityCatalog.Entity.name]: new SystemEntities.EntityInstance(),
            [SystemEntityCatalog.Column.name]: new SystemEntities.ColumnEntityInstance(),
            [SystemEntityCatalog.Reference.name]: new SystemEntities.ReferenceInstance(),

            // Free zone, go on be happy!
            
            [SystemEntityCatalog.ApiAccess.name]: new SystemEntities.ApiAccess(),
            [SystemEntityCatalog.Module.name]: new SystemEntities.Module(),
            [SystemEntityCatalog.ModuleMenu.name]: new SystemEntities.ModuleMenu(),
            [SystemEntityCatalog.ModulePage.name]: new SystemEntities.ModulePage(),

            [SystemEntityCatalog.EntityProcedurePermission.name]: new SystemEntities.EntityProcedurePermission(),
            [SystemEntityCatalog.EntityRowAccessShare.name]: new SystemEntities.EntityRowAccessShare(),
            [SystemEntityCatalog.EntityProcedureHistory.name]: new SystemEntities.EntityProcedureHistory(),
            // [EntityCatalog.EntityPagePermission.name]: new EntityPagePermission(),
            [SystemEntityCatalog.Role.name]: new SystemEntities.Role(),

            [SystemEntityCatalog.User.name]: new SystemEntities.User(),
            [SystemEntityCatalog.UserInfo.name]: new SystemEntities.UserInfo(),
            [SystemEntityCatalog.UserRole.name]: new SystemEntities.UserRole(),

            [SystemEntityCatalog.PersistentLogin.name]: new SystemEntities.PersistentLogin()
        }

        for (let name in this._systemEntities) {
            this._systemEntities[name].setConnection(this.system.getConnection());
            this._systemEntities[name].systemConnection = this.system.getConnection();
        }
    }

    public getBootDependencies: () => string[] = () => [];

    getBootableName: () => string = () => "EntityManager";

    getBootFunction: () => () => Promise<boolean> = () => {
        return async () => {
            return true;
        }
    };

    public getAllEntities(): EntityClass[] {
        const allEntitys: EntityClass[] = [];

        for (let entityName in this.entities) {
            if (this.entities.hasOwnProperty(entityName)) {
                allEntitys.push(this.entities[entityName]);
            }
        }
        return allEntitys;
    }

    public getAllSystemEntities(): EntityClass[] {
        const allSystemEntities: EntityClass[] = [];

        for (let entityName in this._systemEntities) {
            if (this._systemEntities.hasOwnProperty(entityName)) {
                allSystemEntities.push(this._systemEntities[entityName]);
            }
        }
        return allSystemEntities;
    }

    public getEntity(name: string): EntityClass {

        if (this.entities[name] != null) {
            return this.entities[name];
        }

        throw new Error("[EntityManager] Entity with name " + name + " does NOT exists!");
    }

}