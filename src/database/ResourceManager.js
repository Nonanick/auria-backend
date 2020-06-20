var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EventEmitter } from "events";
import { Resource as ResourceInstance } from './resources/Resource.js';
import { ResourceReference as ReferenceInstance } from './resources/ResourceReference.js';
import { Column as ColumnInstance } from './resources/Column.js';
import { ResourceCatalog } from "./resources/ResourceCatalog.js";
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
import { PersistentLogin } from "./resources/PersistentLogin.js";
import { ApiAccess } from "./resources/ApiAccess.js";
export class ResourceManager extends EventEmitter {
    constructor(system) {
        super();
        this.resources = {};
        this.getBootDependencies = () => [];
        this.getBootableName = () => "ResourceManager";
        this.getBootFunction = () => {
            return () => __awaiter(this, void 0, void 0, function* () {
                return true;
            });
        };
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
        };
        for (let name in this.resources) {
            this.resources[name].setConnection(this.system.getConnection());
        }
    }
    getAllResources() {
        const allResources = [];
        for (let resourceName in this.resources) {
            if (this.resources.hasOwnProperty(resourceName)) {
                allResources.push(this.resources[resourceName]);
            }
        }
        return allResources;
    }
    getResource(name) {
        if (this.resources[name] != null) {
            return this.resources[name];
        }
        throw new Error("[ResourceManager] Resource with name " + name + " does NOT exists!");
    }
}
//# sourceMappingURL=ResourceManager.js.map