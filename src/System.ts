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
import { IApiListener } from "./api/IApiListener.js";
import { SystemConfiguration } from "./SystemConfiguration.js";
import { ApiRouteMetadata } from "./api/ExposedApiEnpointsMetadata.js";
import { ApiAccessRule } from "./security/apiAccess/AccessRule.js";
import { ResourceRow } from "./database/resources/sql/ResourceRow.js";
import { ISystemRequest } from "./http/ISystemRequest.js";
import Knex from "knex";

export abstract class System extends EventEmitter implements IApiListener {

    /**
    * System Base URL
    * ----------------
    *
    * Unique base url that identifies this system inside its input adapter
    *
    */
    protected systemBaseURL = "";
    /**
     * Api Listeners
     * --------------
     * All Api Listener associated to this system!
     * Notice that ApiListener cannot set multiple layers of
     * URL depth but the API can handle the rest of the URL
     * depth logic inside its 'answerRequest'
     */
    protected apiListeners: {
        [name: string]: IApiListener
    } = {};

    protected _name: string;

    protected _boot!: Promise<boolean>;

    public getBootDependencies = () => {
        return [];
    };

    public getBootableName = () => {
        return `BootOfSystem(${this.name})`;
    };

    public getBootFunction = () => {
        return async () => {
            this.addApiListener(new AuthListener(this));
            this.addApiListener(new UserListener(this));
            return true;
        };
    };

    protected configuration: SystemConfiguration;
    protected _resourceManager: ResourceManager;
    protected _moduleManager: ModuleManager;
    protected _users: UserManager;
    protected _authenticator: Authenticator;
    protected apiAccessPolicyEnforcer: ApiAccessPolicyEnforcer;
    //if (process.env.NODE_ENV === "development")

    protected explicitPermissionFactory: ExplicitPermissionFactory;

    protected apiEndpointCache!: {
        [routeURL: string]: ApiRouteMetadata
    };

    constructor(configuration: SystemConfiguration) {
        super();

        this.configuration = configuration;

        this._name = configuration.name;
        this._resourceManager = new ResourceManager(this);
        this._moduleManager = new ModuleManager(this);
        this._users = new UserManager(this);
        this._authenticator = new Authenticator(this);

        this.apiAccessPolicyEnforcer = new ApiAccessPolicyEnforcer(this);

        //if (process.env.NODE_ENV === "development")
        this.apiAccessPolicyEnforcer.setGlobalPolicy(/.*/g, PrivilegedUserCanAccessAll);
        this.explicitPermissionFactory = new ExplicitPermissionFactory(this);

    }
    
    public abstract getConnection(): Knex;

    public get name(): string {
        return this._name;
    }

    public set name(name) {
        throw new Error("[System] System name can only be modified internally!");
    }

    public start(): Promise<boolean> {
        if (this._boot == null) {
            this._boot = this.getBootFunction()();
        }

        return this._boot;
    }

   

    public baseUrl(): string {
        return this.systemBaseURL;
    }
    /**
     * Exposed API Routes
     * ---------------------
     *
     * Return ALL routes that are avaliable in this system!
     */
    public exposedApiRoutes(): { [routeURL: string]: ApiRouteMetadata } {
        if (this.apiEndpointCache == null) {
            let endpoints: {
                [routeURL: string]: ApiRouteMetadata
            } = {};
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
    public sanitizeApiURI(url: string) {
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
    public addApiListener(listener: IApiListener) {
        const apiBaseURI = this.sanitizeApiURI(listener.baseUrl());

        if (this.apiListeners[apiBaseURI])
            throw new DupplicatedURI(`Listener could not be assigned to system! The baseURI ${apiBaseURI} is already taken!`);

        this.apiListeners[apiBaseURI] = listener;
        const routes = listener.exposedApiRoutes();
        for (let url in routes) {
            if (routes.hasOwnProperty(url)) {
                const route = routes[url];
                let rules: ApiAccessRule[] = [];

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

    public resourceManager() {
        return this._resourceManager;
    }

    public authenticator() {
        return this._authenticator;
    }

    public users() {
        return this._users;
    }

    public install(filterResource: string) {
        return async () => {
            const filter = filterResource || "";

            const matchFilter = (name: ResourceRow) => {
                return filter == ""
                    || String(name.get("name")).toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0;
            };

            const allResources = this.resourceManager().getAllResources();
            // Build Schema
            for (let a = 0; a < allResources.length; a++) {
                const resourceRow = allResources[a];
                if (matchFilter(resourceRow))
                    await resourceRow.install(this.getConnection());
            }
            // Register as Rows
            for (let b = 0; b < allResources.length; b++) {
                const resourceRow = allResources[b];
                if (matchFilter(resourceRow)) {
                    await resourceRow.save();
                    let cols = resourceRow.getColumns();
                    for (let c = 0; c < cols.length; c++) {
                        await cols[c].save();
                    }
                }
            }
            // Build References
            for (let a = 0; a < allResources.length; a++) {
                const resourceRow = allResources[a];
                if (matchFilter(resourceRow)) {
                    await resourceRow.installReferences(this.getConnection());
                }
            }
            return allResources.map(r => r.get("name"));
        };
    }

    public answerRequest(systemRequest: ISystemRequest) {
        return async () => {
            console.log(`[System] INFO! Request receiveid for api endpoint: ${systemRequest.url}\nReferer: ${systemRequest.referer}`);
            let urlPieces = systemRequest.url.split('/');
            const user = await this._authenticator.authenticateRequest(systemRequest);
            systemRequest.getUser = () => user;
            if (!(await this.apiAccessPolicyEnforcer.userCanAccessApi(user, systemRequest))) {
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
        };
    }

    public generateSystemResponse(request: ISystemRequest, ans: any) {
        return async () => {
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
        };
    }

    public prepareResponse(data: any, request: ISystemRequest) {
        let response = new SystemResponse(`API call to ${request.url} resolved successfully!`);
        response.data = data;
        return response;
    }

    public prepareErrorResponse(exc: Error, request: ISystemRequest, code?: number) {
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