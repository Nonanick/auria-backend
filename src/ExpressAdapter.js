var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { SystemRequest } from './http/SystemRequest.js';
import { SystemCatalog } from '../SystemCatalog.js';
import { AuriaException } from 'auria-lib';
export class ExpressAdapter {
    constructor(app) {
        this.systems = [];
        this.app = app;
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.disable("x-powered-by");
        this.systems = Array.from(Object.values(SystemCatalog));
        for (let system of this.systems) {
            this.registerSystemInExpress(system, this.app);
        }
    }
    registerSystemInExpress(system, app) {
        const exposedApiEndpoints = system.exposedApiRoutes();
        const baseUrl = system.baseUrl();
        for (let apiUrl in exposedApiEndpoints) {
            if (exposedApiEndpoints.hasOwnProperty(apiUrl)) {
                const systemPayload = "/" + baseUrl + "/";
                app.all(systemPayload + apiUrl, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                    req.url = req.url.slice(systemPayload.length);
                    const systemReq = this.generateSystemRequest(req, res, next);
                    let expressResponse = system.answerRequest(systemReq)
                        .then((ans) => {
                        return this.sendSystemResponse(res, ans);
                    });
                    // System SHOULD handle its errors, anyway...
                    expressResponse.catch((exc) => {
                        if (exc instanceof AuriaException) {
                            return this.sendSystemResponse(res, {
                                exitCode: exc.getCode(),
                                httpStatus: 400,
                                data: { error: true, },
                                message: exc.message
                            });
                        }
                        console.error(`[ExpressAdapter] ERROR! Requisition to API ${apiUrl} failed with an internal error!`, exc);
                        return this.sendSystemResponse(res, {
                            exitCode: "ERROR",
                            httpStatus: 500,
                            data: { error: true, },
                            message: "Failed to proccess request! Internal Server Error!"
                        });
                    });
                    yield expressResponse;
                    next();
                }));
            }
        }
    }
    sendSystemResponse(response, systemResponse) {
        // Set HTTP Response status
        response.status(systemResponse.httpStatus || 200);
        // Set Response Header
        if (systemResponse.headers != null) {
            for (let name in systemResponse.headers) {
                if (systemResponse.headers.hasOwnProperty(name)) {
                    response.header(name, systemResponse.headers[name]);
                }
            }
        }
        // Set Cookies
        if (systemResponse.cookies != null) {
            for (let name in systemResponse.cookies) {
                if (systemResponse.cookies.hasOwnProperty(name)) {
                    response.cookie(name, systemResponse.cookies[name].value, systemResponse.cookies[name].options ||
                        {
                            secure: true,
                            sameSite: "strict"
                        });
                }
            }
        }
        // Set response data
        response.setHeader('Content-Type', 'application/json');
        response.send({
            exitCode: systemResponse.exitCode,
            message: systemResponse.message,
            response: systemResponse.data
        });
    }
    generateSystemRequest(request, response, next) {
        const parameters = Object.assign(Object.assign(Object.assign({}, request.body), request.query), request.params);
        const headers = request.headers || {};
        const cookies = request.cookies || {};
        const req = new SystemRequest({
            parameters: parameters,
            url: request.url,
            headers: headers,
            cookies: cookies,
            referer: `IP: [${(request.ip || "IP_NOT_PROVIDED")}] - UA: [${(request.headers['user-agent'] || "USER_AGENT_NOT_PROVIDED")}] - ENTRY: "Express"`,
        });
        return req;
    }
}
//# sourceMappingURL=ExpressAdapter.js.map