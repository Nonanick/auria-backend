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
import { ResourceManager } from "./database/ResourceManager.js";
import { DupplicatedURI } from "./exception/system/DupplicatedURI.js";
import { ModuleManager } from "./module/ModuleManager.js";
import { AuriaException } from "auria-lib";
import { UserManager } from "./user/UserManager.js";
import { ApiEndpointNotFound } from "./exception/system/request/ApiEndpointNotFound.js";
import { ApiAccessPolicyEnforcer } from "./security/apiAccess/ApiAccessPolicyEnforcer.js";
import { PrivilegedUserCanAccessAll } from "./security/apiAccess/globals/PrivilegedUserCanAccessAll.js";
import { AuthListener } from "./api/system/auth/AuthListener.js";
import { SystemResponse } from './http/SystemResponse.js';
import { UserListener } from "./api/system/user/UserListener.js";
import { Authenticator } from "./security/authentication/Authenticator.js";
import { UserAccessNotAuthorized } from './exception/system/security/UserAccessNotAuthorized.js';
import { ExplicitPermissionFactory } from "./security/ExplicityPermissionFactory.js";
import { BootSequence } from "./boot/BootSequence.js";
import { DataListener } from "./api/system/data/DataListener.js";
import { DataRepository } from './data/repository/DataRepository.js';
export class System extends EventEmitter {
    constructor(configuration) {
        super();
        /**
        * System Base URL
        * ----------------
        *
        * Unique base url that identifies this system inside its input adapter
        *
        */
        this.systemBaseURL = "";
        /**
         * Api Listeners
         * --------------
         * All Api Listener associated to this system!
         * Notice that ApiListener cannot set multiple layers of
         * URL depth but the API can handle the rest of the URL
         * depth logic inside its 'answerRequest'
         */
        this.apiListeners = {};
        this.getBootDependencies = () => {
            return [];
        };
        this.getBootableName = () => {
            return `BootOfSystem(${this.name})`;
        };
        this.getBootFunction = () => {
            return () => __awaiter(this, void 0, void 0, function* () {
                this.addApiListener(new AuthListener(this));
                this.addApiListener(new UserListener(this));
                this.addApiListener(new DataListener(this));
                return true;
            });
        };
        this._configuration = configuration;
        this._name = configuration.name;
        this._boot = new BootSequence();
        this._boot.addBootable(this.getBootableName(), this, {
            triggerEvent: SystemEvents.BOOT
        });
        this._resourceManager = new ResourceManager(this);
        this._moduleManager = new ModuleManager(this);
        this._users = new UserManager(this);
        this._authenticator = new Authenticator(this);
        this._data = new DataRepository(this);
        this.apiAccessPolicyEnforcer = new ApiAccessPolicyEnforcer(this);
        //if (process.env.NODE_ENV === "development")
        this.apiAccessPolicyEnforcer.setGlobalPolicy(/.*/g, PrivilegedUserCanAccessAll);
        this.explicitPermissionFactory = new ExplicitPermissionFactory(this);
    }
    get name() {
        return this._name;
    }
    set name(name) {
        throw new Error("[System] System name can only be modified internally!");
    }
    start() {
        return this._boot.initialize();
    }
    baseUrl() {
        return this.systemBaseURL;
    }
    /**
     * Exposed API Routes
     * ---------------------
     *
     * Return ALL routes that are avaliable in this system!
     */
    exposedApiRoutes() {
        if (this.apiEndpointCache == null) {
            let endpoints = {};
            Array.from(Object.keys(this.apiListeners)).forEach((url) => {
                if (!this.apiListeners.hasOwnProperty(url))
                    return;
                let listenerEndpoints = this.apiListeners[url].exposedApiRoutes();
                Array.from(Object.keys(listenerEndpoints)).forEach((listenerUrl) => {
                    if (!listenerEndpoints.hasOwnProperty(listenerUrl))
                        return;
                    endpoints[`${url}/${listenerUrl}`] = listenerEndpoints[listenerUrl];
                });
            });
            console.log("[System] Exposed endpoints: ", Object.keys(endpoints));
            this.apiEndpointCache = endpoints;
        }
        return this.apiEndpointCache;
    }
    /**
     * Sanitizer for base URL's
     * --- Only accepts:
     * > As first char: [A-z]
     * > Any other: [A-z] OR [0-9] OR [-_.]
     * Any other character is removed!
     *
     * @param url
     */
    sanitizeApiURI(url) {
        return url.replace(/(^[^A-z])|([^A-z-_\.0-9])*/g, '');
    }
    /**
     * Adds an API Listener to this system
     * ------------------------------------
     *
     * Adding an API Listener means:
     * > The exposed routes will also be exposed by the system
     * > Access Policy Enforcer will check and proccess Access Rules
     * when a request is made to the exposed route
     *
     * @param listener
     */
    addApiListener(listener) {
        const apiBaseURI = this.sanitizeApiURI(listener.baseUrl());
        if (this.apiListeners[apiBaseURI])
            throw new DupplicatedURI(`Listener could not be assigned to system! The baseURI ${apiBaseURI} is already taken!`);
        this.apiListeners[apiBaseURI] = listener;
        const routes = listener.exposedApiRoutes();
        for (let url in routes) {
            if (routes.hasOwnProperty(url)) {
                const route = routes[url];
                let rules = [];
                if (route.accessRules != null) {
                    const routeAccessRules = route.accessRules;
                    if (Array.isArray(routeAccessRules))
                        rules = [...routeAccessRules];
                    else
                        rules.push(routeAccessRules);
                }
                if (route.requiresExplicitPermission !== false) {
                    rules = [...rules, this.explicitPermissionFactory.getAccessRule()];
                }
                else {
                    console.log(`[APE] URL "${url}" opted out of explicit permissions!`);
                }
                this.apiAccessPolicyEnforcer.addRouteAccessRules(`${apiBaseURI}/${url}`, rules);
            }
        }
    }
    resourceManager() {
        return this._resourceManager;
    }
    authenticator() {
        return this._authenticator;
    }
    users() {
        return this._users;
    }
    data() {
        return this._data;
    }
    install(filterResource) {
        return __awaiter(this, void 0, void 0, function* () {
            return () => __awaiter(this, void 0, void 0, function* () {
                const filter = filterResource || "";
                const matchFilter = (name) => {
                    return filter == ""
                        || String(name.get("name")).toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0;
                };
                const allResources = this.resourceManager().getAllResources();
                // Build Schema
                for (let a = 0; a < allResources.length; a++) {
                    const resourceRow = allResources[a];
                    if (matchFilter(resourceRow))
                        yield resourceRow.install(this.getConnection());
                }
                // Register as Rows
                for (let b = 0; b < allResources.length; b++) {
                    const resourceRow = allResources[b];
                    if (matchFilter(resourceRow)) {
                        yield resourceRow.save();
                        let cols = resourceRow.getColumns();
                        for (let c = 0; c < cols.length; c++) {
                            yield cols[c].save();
                        }
                    }
                }
                // Build References
                for (let a = 0; a < allResources.length; a++) {
                    const resourceRow = allResources[a];
                    if (matchFilter(resourceRow)) {
                        yield resourceRow.installReferences(this.getConnection());
                    }
                }
                return allResources.map(r => r.get("name"));
            });
        });
    }
    answerRequest(systemRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[System] INFO! Request receiveid for api endpoint: ${systemRequest.url}\nReferer: ${systemRequest.referer}`);
            let urlPieces = systemRequest.url.split('/');
            const user = yield this._authenticator.authenticateRequest(systemRequest);
            systemRequest.getUser = () => user;
            if (!(yield this.apiAccessPolicyEnforcer.userCanAccessApi(user, systemRequest))) {
                return this.prepareErrorResponse(new UserAccessNotAuthorized("The current url is unavaliable for this user!"), systemRequest, 403);
            }
            if (this.apiListeners[urlPieces[0]] != null) {
                // Remove "payload"
                systemRequest.url = systemRequest.url.slice(urlPieces[0].length + 1);
                try {
                    const listenerAnswer = this.apiListeners[urlPieces[0]].answerRequest(systemRequest);
                    return this.generateSystemResponse(systemRequest, listenerAnswer);
                }
                catch (err) {
                    if (err instanceof AuriaException)
                        return this.prepareErrorResponse(err, systemRequest, 400);
                    else
                        return this.prepareErrorResponse(err, systemRequest);
                }
            }
            else {
                console.error("[System] ERROR Request Failed! System does not know an API Listener to the baseURL ", urlPieces[0]);
                return this.prepareErrorResponse(new ApiEndpointNotFound(`The requested path ${systemRequest.url} does not match a valid exposed API!`), systemRequest, 404);
            }
        });
    }
    generateSystemResponse(request, ans) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ans instanceof Promise) {
                ans.catch((err) => {
                    return this.prepareErrorResponse(err, request);
                });
                return ans.then((promisedResponse) => {
                    if (promisedResponse instanceof SystemResponse) {
                        return promisedResponse;
                    }
                    else {
                        return this.prepareResponse(promisedResponse, request);
                    }
                });
            }
            else {
                if (ans instanceof SystemResponse) {
                    return ans;
                }
                else {
                    return this.prepareResponse(ans, request);
                }
            }
        });
    }
    prepareResponse(data, request) {
        let response = new SystemResponse(`API call to ${request.url} resolved successfully!`);
        response.data = data;
        return response;
    }
    prepareErrorResponse(exc, request, code) {
        let response = new SystemResponse(exc.message);
        if (exc instanceof AuriaException) {
            response.data = exc.getReponseData();
            response.setExitCode(exc.getCode());
            response.httpStatus = code || 500;
        }
        else {
            response.setExitCode(exc.name);
        }
        return response;
    }
}
export var SystemEvents;
(function (SystemEvents) {
    SystemEvents["BOOT"] = "boot";
    SystemEvents["API_ROUTE_ADDED"] = "routeAdded";
})(SystemEvents || (SystemEvents = {}));
//# sourceMappingURL=System.js.map