import { EventEmitter } from "events";
import { Bootable } from "../boot/Bootable.js";
import { Resource as ResourceInstance } from './resources/Resource.js';
import { ResourceReference as ReferenceInstance } from './resources/ResourceReference.js';
import { Column as ColumnInstance } from './resources/Column.js';
import { ResourceCatalog } from "./resources/ResourceCatalog.js";
import { ResourceRow } from "./resources/sql/ResourceRow.js";
import { Connection } from "./resources/Connection.js";
import { Module } from "./resources/Module.js";
import { ModuleMenu } from "./resources/ModuleMenu.js";
import { ModulePage } from "./resources/ModulePage.js";
import { ResourceAccessPolicy } from "./resources/ResourceAccessPolicy.js";
import { ResourceAccessShare } from "./resources/ResourceAccessShare.js";
import { ResourceActivity } from "./resources/ResourceActivity.js";
import { ResourcePagePermission } from "./resources/ResourcePagePermission.js";
import { Role } from "./resources/Role.js";
import { User } from "./resources/User.js";
import { UserRole } from "./resources/UserRole.js";
import { UserInfo } from "./resources/UserInfo.js";
import { System } from "../System.js";
import { PersistentLogin } from "./resources/PersistentLogin.js";
import { ApiAccess } from "./resources/ApiAccess.js";

export class ResourceManager extends EventEmitter implements Bootable {

    private resources: { [resourceName: string]: ResourceRow } = {};

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
            [ResourceCatalog.ModuleMenu.name]: new ModuleMenu(),
            [ResourceCatalog.ModulePage.name]: new ModulePage(),

            [ResourceCatalog.ResourceAccessPolicy.name]: new ResourceAccessPolicy(),
            [ResourceCatalog.ResourceAccessShare.name]: new ResourceAccessShare(),
            [ResourceCatalog.ResourceActivity.name]: new ResourceActivity(),
            [ResourceCatalog.ResourcePagePermission.name]: new ResourcePagePermission(),
            [ResourceCatalog.Role.name]: new Role(),

            [ResourceCatalog.User.name]: new User(),
            [ResourceCatalog.UserInfo.name]: new UserInfo(),
            [ResourceCatalog.UserRole.name]: new UserRole(),

            [ResourceCatalog.PersistentLogin.name]: new PersistentLogin()
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

    public getAllResources(): ResourceRow[] {
        const allResources: ResourceRow[] = [];

        for (let resourceName in this.resources) {
            if (this.resources.hasOwnProperty(resourceName)) {
                allResources.push(this.resources[resourceName]);
            }
        }
        return allResources;
    }

    public getResource(name: string): ResourceRow {

        if (this.resources[name] != null) {
            return this.resources[name];
        }

        throw new Error("[ResourceManager] Resource with name " + name + " does NOT exists!");
    }

}