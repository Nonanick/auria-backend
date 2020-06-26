import { EventEmitter } from "events";
import { Bootable } from "../boot/Bootable.js";
import * as SystemEntities from "./../entity/system";
import { System } from "../System.js";
import { EntityClass } from "../entity/EntityClass.js";
import { EntityCatalog } from "./schema/EntityCatalog.js";

export class EntityManager extends EventEmitter implements Bootable {

    private entities: { [entityName: string]: EntityClass } = {};

    private system: System;

    constructor(system: System) {
        super();
        this.system = system;

        this.entities = {

            // SQL Structure, do NOT modify the order of this thing...
            [EntityCatalog.Connection.name]: new SystemEntities.Connection(),
            [EntityCatalog.Entity.name]: new SystemEntities.EntityInstance(),
            [EntityCatalog.Column.name]: new SystemEntities.ColumnInstance(),
           // [EntityCatalog.Reference.name]: new SystemEntities.ReferenceInstance(),

            // Free zone, go on be happy!
            [EntityCatalog.ApiAccess.name]: new SystemEntities.ApiAccess(),
            [EntityCatalog.Module.name]: new SystemEntities.Module(),
            [EntityCatalog.ModuleMenu.name]: new SystemEntities.ModuleMenu(),
            [EntityCatalog.ModulePage.name]: new SystemEntities.ModulePage(),

           // [EntityCatalog.EntityAccessPolicy.name]: new SystemEntities.EntityAccessPolicy(),
            [EntityCatalog.EntityRowAccessShare.name]: new SystemEntities.EntityAccessShare(),
            [EntityCatalog.EntityProcedureHistory.name]: new SystemEntities.EntityPrecedureHistory(),
           // [EntityCatalog.EntityPagePermission.name]: new EntityPagePermission(),
            [EntityCatalog.Role.name]: new SystemEntities.Role(),

            [EntityCatalog.User.name]: new SystemEntities.User(),
            [EntityCatalog.UserInfo.name]: new SystemEntities.UserInfo(),
            [EntityCatalog.UserRole.name]: new SystemEntities.UserRole(),

            [EntityCatalog.PersistentLogin.name]: new SystemEntities.PersistentLogin()
        }

        for (let name in this.entities) {
            this.entities[name].setConnection(this.system.getConnection());
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

    public getEntity(name: string): EntityClass {

        if (this.entities[name] != null) {
            return this.entities[name];
        }

        throw new Error("[EntityManager] Entity with name " + name + " does NOT exists!");
    }

}