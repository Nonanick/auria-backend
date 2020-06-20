/// <reference types="node" />
import { EventEmitter } from "events";
import { ResourceManager } from "./database/ResourceManager.js";
import { ModuleManager } from "./module/ModuleManager.js";
import { UserManager } from "./user/UserManager.js";
import { ApiAccessPolicyEnforcer } from "./security/apiAccess/ApiAccessPolicyEnforcer.js";
import { SystemResponse } from './http/SystemResponse.js';
import { Authenticator } from "./security/authentication/Authenticator.js";
import { ExplicitPermissionFactory } from "./security/ExplicityPermissionFactory.js";
import { IApiListener } from "./api/IApiListener.js";
import { SystemConfiguration } from "./SystemConfiguration.js";
import { ApiRouteMetadata } from "./api/ExposedApiEnpointsMetadata.js";
import { ISystemRequest } from "./http/ISystemRequest.js";
import Knex from "knex";
export declare abstract class System extends EventEmitter implements IApiListener {
    /**
    * System Base URL
    * ----------------
    *
    * Unique base url that identifies this system inside its input adapter
    *
    */
    protected systemBaseURL: string;
    /**
     * Api Listeners
     * --------------
     * All Api Listener associated to this system!
     * Notice that ApiListener cannot set multiple layers of
     * URL depth but the API can handle the rest of the URL
     * depth logic inside its 'answerRequest'
     */
    protected apiListeners: {
        [name: string]: IApiListener;
    };
    protected _name: string;
    protected _boot: Promise<boolean>;
    getBootDependencies: () => never[];
    getBootableName: () => string;
    getBootFunction: () => () => Promise<boolean>;
    protected configuration: SystemConfiguration;
    protected _resourceManager: ResourceManager;
    protected _moduleManager: ModuleManager;
    protected _users: UserManager;
    protected _authenticator: Authenticator;
    protected apiAccessPolicyEnforcer: ApiAccessPolicyEnforcer;
    protected explicitPermissionFactory: ExplicitPermissionFactory;
    protected apiEndpointCache: {
        [routeURL: string]: ApiRouteMetadata;
    };
    constructor(configuration: SystemConfiguration);
    abstract getConnection(): Knex;
    get name(): string;
    set name(name: string);
    start(): Promise<boolean>;
    baseUrl(): string;
    /**
     * Exposed API Routes
     * ---------------------
     *
     * Return ALL routes that are avaliable in this system!
     */
    exposedApiRoutes(): {
        [routeURL: string]: ApiRouteMetadata;
    };
    /**
     * Sanitizer for base URL's
     * --- Only accepts:
     * > As first char: [A-z]
     * > Any other: [A-z] OR [0-9] OR [-_.]
     * Any other character is removed!
     *
     * @param url
     */
    sanitizeApiURI(url: string): string;
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
    addApiListener(listener: IApiListener): void;
    resourceManager(): ResourceManager;
    authenticator(): Authenticator;
    users(): UserManager;
    install(filterResource: string): () => Promise<any[]>;
    answerRequest(systemRequest: ISystemRequest): () => Promise<SystemResponse | (() => Promise<SystemResponse>)>;
    generateSystemResponse(request: ISystemRequest, ans: any): () => Promise<SystemResponse>;
    prepareResponse(data: any, request: ISystemRequest): SystemResponse;
    prepareErrorResponse(exc: Error, request: ISystemRequest, code?: number): SystemResponse;
}
