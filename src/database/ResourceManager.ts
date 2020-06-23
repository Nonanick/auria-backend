import { EventEmitter } from "events";
import { Bootable } from "../boot/Bootable.js";
import { Resource as ResourceInstance } from './schema/Resource.js';
import { ResourceReference as ReferenceInstance } from './schema/ResourceReference.js';
import { Column as ColumnInstance } from './schema/Column.js';
import { ResourceCatalog } from "./schema/ResourceCatalog.js";
import { Connection } from "./schema/Connection.js";
import { Module } from "./schema/Module.js";
import { ModuleMenuSchema } from "./schema/ModuleMenuSchema.js";
import { ModulePageSchema } from "./schema/ModulePage.js";
import { ResourceAccessPolicy } from "./schema/ResourceAccessPolicy.js";
import { ResourceAccessShare } from "./schema/ResourceAccessShare.js";
import { ResourceActivity } from "./schema/ResourceActivity.js";
import { ResourcePagePermission } from "./schema/ResourcePagePermission.js";
import { Role } from "./schema/Role.js";
import { User } from "./schema/User.js";
import { UserRole } from "./schema/UserRole.js";
import { UserInfo } from "./schema/UserInfo.js";
import { System } from "../System.js";
import { PersistentLoginSchema } from "./schema/PersistentLogin.js";
import { ApiAccess } from "./schema/ApiAccess.js";
import { ResourceSchema } from "./schema/sql/ResourceSchema.js";

export class ResourceManager extends EventEmitter implements Bootable {

    private resources: { [resourceName: string]: ResourceSchema } = {};

    private system: System;

    constructor(system: System) {
        super();
        this.system = system;

        this.resources = {

            // SQL Structure, do NOT modify the order of this thing...
            [ResourceCatalog.Connection.name]: new Connection(),
            [ResourceCatalog.Resource.name]: new ResourceInstance(),
            [ResourceCatalog.Column.name]: new ColumnInstance(),
            [ResourceCatalog.Reference.name]: new ReferenceInstance(),

            // Free zone, go on be happy!
            [ResourceCatalog.ApiAccess.name]: new ApiAccess(),
            [ResourceCatalog.Module.name]: new Module(),
            [ResourceCatalog.ModuleMenu.name]: new ModuleMenuSchema(),
            [ResourceCatalog.ModulePage.name]: new ModulePageSchema(),

            [ResourceCatalog.ResourceAccessPolicy.name]: new ResourceAccessPolicy(),
            [ResourceCatalog.ResourceAccessShare.name]: new ResourceAccessShare(),
            [ResourceCatalog.ResourceActivity.name]: new ResourceActivity(),
            [ResourceCatalog.ResourcePagePermission.name]: new ResourcePagePermission(),
            [ResourceCatalog.Role.name]: new Role(),

            [ResourceCatalog.User.name]: new User(),
            [ResourceCatalog.UserInfo.name]: new UserInfo(),
            [ResourceCatalog.UserRole.name]: new UserRole(),

            [ResourceCatalog.PersistentLogin.name]: new PersistentLoginSchema()
        }

        for (let name in this.resources) {
            this.resources[name].setConnection(this.system.getConnection());
        }
    }

    public getBootDependencies: () => string[] = () => [];

    getBootableName: () => string = () => "ResourceManager";

    getBootFunction: () => () => Promise<boolean> = () => {
        return async () => {
            return true;
        }
    };

    public getAllResources(): ResourceSchema[] {
        const allResources: ResourceSchema[] = [];

        for (let resourceName in this.resources) {
            if (this.resources.hasOwnProperty(resourceName)) {
                allResources.push(this.resources[resourceName]);
            }
        }
        return allResources;
    }

    public getResource(name: string): ResourceSchema {

        if (this.resources[name] != null) {
            return this.resources[name];
        }

        throw new Error("[ResourceManager] Resource with name " + name + " does NOT exists!");
    }

}