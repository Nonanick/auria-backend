import { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { ISystemRequest } from './http/ISystemRequest.js';
import { SystemRequest } from './http/SystemRequest.js';
import { System } from './System.js';
import { SystemCatalog } from '../SystemCatalog.js';
import { ISystemResponse, AuriaException } from 'auria-lib';

export class ExpressAdapter {

    protected app: Application;
    protected systems: System[] = [];

    constructor(app: Application) {
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

    private registerSystemInExpress(system: System, app: Application) {

        const exposedApiEndpoints = system.exposedApiRoutes();
        const baseUrl = system.baseUrl();

        for (let apiUrl in exposedApiEndpoints) {
            if (exposedApiEndpoints.hasOwnProperty(apiUrl)) {
                const systemPayload = "/" + baseUrl + "/";

                app.all(systemPayload + apiUrl,
                    async (req, res, next) => {
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

                        await expressResponse;

                        next();
                    });
            }
        }
    }

    private sendSystemResponse(response: Response, systemResponse: ISystemResponse) {
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
                    response.cookie(name,
                        systemResponse.cookies[name].value,
                        systemResponse.cookies[name].options ||
                        {
                            secure: true,
                            sameSite: "strict"
                        }
                    );
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

    private generateSystemRequest(request: Request, response: Response, next: NextFunction): ISystemRequest {
        const parameters = { ...request.body, ...request.query, ...request.params };
        const headers = request.headers || {};
        const cookies = request.cookies || {};

        const req: ISystemRequest = new SystemRequest({
            parameters: parameters,
            url: request.url,
            headers: headers as ({ [name: string]: string | string[] }),
            cookies: cookies,
            referer: `IP: [${(request.ip || "IP_NOT_PROVIDED")}] - UA: [${(request.headers['user-agent'] || "USER_AGENT_NOT_PROVIDED")}] - ENTRY: "Express"`,
        });

        return req;
    }
}