var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ApiAccessPolicyEnforcer {
    constructor(system) {
        this.system = system;
        this.globalAccessRules = new Map();
        this.apiEndpointAccessRules = new Map();
    }
    addRouteAccessRules(url, accessRules) {
        if (Array.isArray(accessRules)) {
            if (accessRules.length === 0)
                return this;
        }
        if (this.apiEndpointAccessRules.has(url)) {
            const previousRules = this.apiEndpointAccessRules.get(url);
            if (Array.isArray(previousRules)) {
                if (Array.isArray(accessRules)) {
                    this.apiEndpointAccessRules.set(url, [...previousRules, ...accessRules]);
                }
                else {
                    previousRules.push(accessRules);
                }
            }
            else {
                if (Array.isArray(accessRules)) {
                    this.apiEndpointAccessRules.set(url, [previousRules, ...accessRules]);
                }
                else {
                    this.apiEndpointAccessRules.set(url, [previousRules, accessRules]);
                }
            }
        }
        else {
            this.apiEndpointAccessRules.set(url, accessRules);
        }
        console.log("[APE] Added Access Rules to endpoint: ", url);
        return this;
    }
    setGlobalPolicy(searchFor, policy) {
        if (this.globalAccessRules.has(searchFor)) {
            console.error("[ApiAccessPolicyEnforcer] Duplicated Global policy! Older one will be invalidated?");
        }
        this.globalAccessRules.set(searchFor, policy);
        return this;
    }
    userCanAccessApi(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            // Global Access Rules
            const globalRules = this.getGlobalsFromApiURL(request.url);
            let accessResolution;
            const grantAccessFn = () => accessResolution = "granted";
            const globalContext = {
                accessGranted: grantAccessFn,
                url: request.url,
                user: user,
                request: request
            };
            try {
                for (let accessRule of globalRules) {
                    let resolution = accessRule(globalContext);
                    if (resolution instanceof Promise)
                        resolution = yield resolution;
                    // Access Granted Fn called within the Global Access Rule?
                    if (accessResolution === "granted") {
                        console.log("[APE] Global policy granted immediate access to user! Skipping further verifications!");
                        return true;
                    }
                    // Access Rule resolution "failed"
                    if (resolution === false)
                        return false;
                }
            }
            catch (err) {
                console.error("[ApiAccessPolicyEnforcer] Global Access Rule raised an Exception!", err, "\nEnforcer will deny access!");
                return false;
            }
            if (this.apiEndpointAccessRules.has(request.url)) {
                const accessRules = this.apiEndpointAccessRules.get(request.url);
                const apiContext = {
                    user: user,
                    url: request.url,
                    request
                };
                // Resolve local Api Resource Rules
                if (Array.isArray(accessRules)) {
                    let promiseMap = accessRules.map(rule => rule(apiContext));
                    return Promise.all(promiseMap)
                        .then((allResolved) => {
                        // Any false return?
                        const ioFalse = allResolved.indexOf(false) < 0;
                        console.log("[APE] All promises resolved!", allResolved, ioFalse);
                        return ioFalse;
                    });
                }
                else {
                    return yield accessRules(apiContext);
                }
            }
            else {
                //console.info("Failed to find api access rule belonging to ", request.url, " make sure that the desired endpoint is being exposed by an ApiListener and this ApiListener is registered in the system!");
                return true;
            }
        });
    }
    getGlobalsFromApiURL(apiUrl) {
        const matchedGlobals = [];
        Array.from(this.globalAccessRules.keys()).forEach((matchKey) => {
            // RegExp need at least 1 match!
            if (matchKey instanceof RegExp) {
                if (apiUrl.match(matchKey) != null) {
                    matchedGlobals.push(this.globalAccessRules.get(matchKey));
                }
            }
            // String need to be exactly equal
            else {
                if (apiUrl === matchKey) {
                    matchedGlobals.push(this.globalAccessRules.get(matchKey));
                }
            }
        });
        console.log("Matched Global Access Rules!", matchedGlobals);
        return matchedGlobals;
    }
}
//# sourceMappingURL=ApiAccessPolicyEnforcer.js.map