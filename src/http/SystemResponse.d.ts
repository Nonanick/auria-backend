import { ISystemResponse } from "auria-lib";
import { CookieOptions } from "express";
export declare class SystemResponse implements ISystemResponse {
    protected _exitCode: string;
    get exitCode(): string;
    message: string;
    errors: string[];
    data: any;
    httpStatus: number;
    headers: {
        [name: string]: string;
    };
    cookies: {
        [name: string]: {
            value: string;
            options: CookieOptions;
        };
    };
    constructor(message: string);
    setExitCode(code: string): void;
}
